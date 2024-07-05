from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework import viewsets
from django.contrib.auth import get_user_model

from .serializers import UsuarioSerializers
from .serializers import RegistroSerializers
from .serializers import LocalidadSerializer
from .serializers import BarrioSerializer
from .serializers import RolSerializer
from .serializers import ProductoSerializer
from .serializers import DireccionSerializer 
from .serializers import PermisoSerializer
from .serializers import CompraSerializer
from .serializers import DetalleSerializer
from .serializers import Rol_PermisoSerializer
from .serializers import PedidoSerializer

from .models import Localidad
from .models import Barrio
from .models import Rol
from .models import Producto
from .models import Direccion
from .models import Compra
from .models import Detalle
from .models import Permiso
from .models import Rol_Permiso
from .models import Pedido


class LoginView(APIView):
    @method_decorator(csrf_exempt)
    def post(self, request):
        email = request.data.get('email', None)
        password = request.data.get('password', None)
        usuario = authenticate(request, username=email, password=password)
        isAdmin = request.user.is_staff if request.user.is_authenticated else False
        if usuario:
            login(request, usuario)
            isAdmin = usuario.is_staff
            token, created = Token.objects.get_or_create(user=usuario)
            return Response({'token': token.key, 'user': UsuarioSerializers(usuario).data, 'is_staff': isAdmin}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Credenciales de inicio de sesión incorrectas'}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        return Response(data={'message': 'GET request processed successfully'})

class LogoutView(APIView):
    @method_decorator(csrf_exempt)
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)
    

class RegistroView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = RegistroSerializers
    permission_classes = [AllowAny]

    @csrf_exempt
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    @csrf_exempt
    def get(self, request, *args, **kwargs):
        return Response(data={'message': 'GET request processed successfully'}, status=status.HTTP_200_OK)
    
class LocalidadViewSet(viewsets.ModelViewSet):
    queryset=Localidad.objects.all()
    serializer_class= LocalidadSerializer
 
class BarrioViewSet(viewsets.ModelViewSet):
    queryset=Barrio.objects.all()
    serializer_class= BarrioSerializer
 
class RolViewSet(viewsets.ModelViewSet):
    queryset=Rol.objects.all()
    serializer_class= RolSerializer
 
class ProductoViewSet(viewsets.ModelViewSet):
    queryset=Producto.objects.all()
    serializer_class= ProductoSerializer
 
class DireccionViewSet(viewsets.ModelViewSet):
    queryset=Direccion.objects.all()
    serializer_class= DireccionSerializer

class CompraViewSet(viewsets.ModelViewSet):
    queryset=Compra.objects.all()
    serializer_class= CompraSerializer                
    
class DetalleViewSet(viewsets.ModelViewSet):
    queryset=Detalle.objects.all()
    serializer_class= DetalleSerializer  
 
class PermisoViewSet(viewsets.ModelViewSet):
    queryset=Permiso.objects.all()
    serializer_class= PermisoSerializer                
    
class Rol_PermisoViewSet(viewsets.ModelViewSet):
    queryset=Rol_Permiso.objects.all()
    serializer_class= Rol_PermisoSerializer        
       
class PedidoViewSet(viewsets.ModelViewSet):
    queryset=Pedido.objects.all()
    serializer_class= PedidoSerializer        