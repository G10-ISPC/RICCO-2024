from contextvars import Token
import datetime
from django.db import transaction
from django.db.models import Sum
from django.forms import ValidationError
from django.utils import timezone
from django.shortcuts import render
from rest_framework import viewsets, generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser, BasePermission
from .models import PurchaseItem, ShoppingCart, User, Purchase, Product
from .serializers import ShoppingCartSerializer, UserSerializer, UserLoginSerializer, UserChangePasswordSerializer, PurchaseSerializer, ProductSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from django.contrib.auth import authenticate, update_session_auth_hash
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework.exceptions import NotFound
from django.contrib.auth.forms import PasswordChangeForm
from django.urls import reverse_lazy


# Registro


class UserRegisterView(APIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():

            """  # verifica que las contraseñas coincidan
             password = serializer.validated_data['password']
             confirm_password = serializer.validated_data.get(
                 'confirm_password')
             if password != confirm_password:
                 return Response({"error": "Las contraseñas no coinciden"}, status=status.HTTP_400_BAD_REQUEST) """

            # Crea el usuario
            user = serializer.save()
            # Genera el token
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# inicio Sesion
class UserLoginView(APIView):
    permission_classes = []

    def post(self, request, *args, **kwargs):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(email=email, password=password)
            if user is not None:
                token, created = Token.objects.get_or_create(user=user)
                data = {
                    "user_id": user.id,
                    "email": user.email,
                    "token": token.key,
                    "is_seller": user.is_seller
                }
                return Response(data, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# cierre de Sesion
class UserLogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            request.user.auth_token.delete()
            request.session.flush()
            return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": "Something went wrong", "error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# modificar contraseña
class UserChangePasswordView(generics.UpdateAPIView):
    serializer_class = UserChangePasswordSerializer
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = request.user
        old_password = serializer.data.get("old_password")
        new_password = serializer.data.get("new_password")

        if not user.check_password(old_password):
            return Response({"error": "La contraseña anterior es incorrecta."}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        # Importante para mantener la sesión autenticada
        update_session_auth_hash(request, user)

        return Response({"message": "Contraseña modificada exitosamente."}, status=status.HTTP_200_OK)


# Compras
class PurchaseView(generics.CreateAPIView):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            # Verificar disponibilidad del producto y actualizar el stock
            products_data = serializer.validated_data['products']
            for product_data in products_data:
                product = product_data['product']
                quantity = product_data['quantity']
                if product.stock < quantity:
                    raise ValidationError(
                        "Producto no disponible en suficiente cantidad.")
                product.stock -= quantity
                product.save()

            # Calcular el precio total de la compra
            total_price = sum(
                product_data['product'].price * product_data['quantity'] for product_data in products_data)

            # Crear la compra
            instance = serializer.save(
                user=request.user, total_price=total_price)

            # Registrar los detalles de la compra
            for product_data in products_data:
                product = product_data['product']
                quantity = product_data['quantity']
                price = product.price * quantity
                PurchaseItem.objects.create(
                    purchase=instance, product=product, quantity=quantity, price=price)

            return Response(self.get_serializer(instance).data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# Permiso para verificar si el usuario es un vendedor.
class IsSeller(BasePermission):

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_seller


# Creacion y gestion de productos
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):  # permisos para admin

        if self.action in ['create', 'update', 'partial_update', 'destroy']:

            # Aqui se usa la class IsSeller
            self.permission_classes = [IsSeller]
        return super().get_permissions()

    # Lista todos los productos disponibles.
    def list(self, request, *args, **kwargs):

        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):  # Obtiene un producto específico por su ID

        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):    # Crea un nuevo producto

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # Actualiza un producto existente.
    def update(self, request, *args, **kwargs):

        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):   # Elimina un producto existente

        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


# Dashboard vendedor
class SellerDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request, *args, **kwargs):
        user = request.user

        # Filtrar las ventas del vendedor por productos vendidos
        sold_products = PurchaseItem.objects.filter(product__seller=user)

        # Calcular el total de ventas y el dinero recaudado
        total_sales = sold_products.aggregate(total_sales=Sum('price'))

        # Obtener detalles de los productos vendidos
        products_data = []
        for product in sold_products.values('product__id', 'product__name').annotate(total_sold=Sum('quantity')).order_by('-total_sold'):
            product_data = {
                'product_id': product['product__id'],
                'product_name': product['product__name'],
                'total_sold': product['total_sold']
            }
            products_data.append(product_data)

        # Filtrar las ventas por un período de tiempo específico (opcional)
        today = datetime.date.today()
        # Filtrar ventas del último mes
        start_date = today - datetime.timedelta(days=30)
        monthly_sales = sold_products.filter(
            purchase__date__gte=start_date).aggregate(total_sales_monthly=Sum('price'))

        # Crear un diccionario de respuesta con los datos recopilados
        response_data = {
            'total_sales': total_sales['total_sales'] if total_sales['total_sales'] else 0,
            'monthly_sales': monthly_sales['total_sales_monthly'] if monthly_sales['total_sales_monthly'] else 0,
            'products': products_data
        }

        return Response(response_data, status=status.HTTP_200_OK)


# carrito
class ShoppingCartView(generics.ListCreateAPIView):
    queryset = ShoppingCart.objects.all()
    serializer_class = ShoppingCartSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Verificar si el producto ya está en el carrito del usuario
        user = self.request.user
        product = serializer.validated_data['product']

        try:
            existing_cart_item = ShoppingCart.objects.select_related(
                'product').filter(user=user, product=product).first()

            if existing_cart_item:
                # Si el producto ya está en el carrito, actualizar la cantidad
                existing_cart_item.quantity += serializer.validated_data.get(
                    'quantity', 1)
                existing_cart_item.save()
                return Response(self.get_serializer(existing_cart_item).data, status=status.HTTP_200_OK)
            else:
                # Si es un nuevo producto en el carrito, crear un nuevo elemento
                serializer.save(user=user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
