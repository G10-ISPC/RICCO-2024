from rest_framework import serializers
from .models import PurchaseItem, ShoppingCart, User, Purchase, Product
from django.contrib.auth import authenticate
from tienda import models

# Creacion, actualizacion, manejo compra de usuarios


class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)
    purchases = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'confirm_password',  'username', 'first_name', 'last_name', 'address',
                  'neighborhood', 'locality', 'phone_number', 'postal_code', 'profile_picture', 'purchases', 'is_seller']
        extra_kwargs = {
            'password': {'write_only': True},
            'profile_picture': {'required': False},
        }

    def create(self, validated_data):

        if 'profile_picture' in validated_data:
            profile_picture = validated_data.pop('profile_picture')
        else:
            profile_picture = None

        confirm_password = validated_data.get('confirm_password')

        # Check if passwords match
        if 'password' in validated_data and 'confirm_password' in validated_data and validated_data['password'] != confirm_password:
            raise serializers.ValidationError("Las contraseñas no coinciden")

        # Remove confirm_password from validated data
        validated_data.pop('confirm_password', None)

        user = User.objects.create_user(**validated_data)

        if profile_picture:
            user.profile_picture = profile_picture
            user.save()

        return user


# manejo de inicio de sesion
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            user = authenticate(email=email, password=password)

            if not user:
                raise serializers.ValidationError(
                    "Incorrect email or password")

            if not user.is_active:
                raise serializers.ValidationError("User account is disabled")

        else:
            raise serializers.ValidationError(
                "Must include 'email' and 'password'")

        data['user'] = user
        return data


# maneja validacion datos para cambio de contraseña
class UserChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)
    new_password = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)
    confirm_password = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)

    def validate(self, data):
        new_password = data.get("new_password")
        confirm_password = data.get("confirm_password")
        if new_password != confirm_password:
            raise serializers.ValidationError(
                "Las nuevas contraseñas no coinciden.")
        return data


# maneja que los datos de la compra cumplan los criterios necesarios
class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = '__all__'

    def validate(self, data):
        quantity = data.get('quantity')
        if quantity <= 0:
            raise serializers.ValidationError(
                "La cantidad debe ser mayor que cero.")

        return data


# maneja productos
class ProductSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    class Meta:
        model = Product
        fields = '__all__'
        extra_kwargs = {
            'description': {'required': True},  # descripción obligatoria
        }

    def get_total_sold(self, obj):
        return PurchaseItem.objects.filter(product=obj).aggregate(total_sold=models.Sum('quantity'))['total_sold'] or 0

    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError(
                "El precio debe ser mayor o igual a cero.")
        return value

    def validate(self, data):

        # valida que el nombre no esté vacío.
        if 'name' in data and not data['name'].strip():
            raise serializers.ValidationError(
                "El nombre del producto no puede estar vacío.")
        return data


class ShoppingCartSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = ShoppingCart
        fields = ['id', 'user', 'product', 'quantity', 'date_added']
        read_only_fields = ['user', 'date_added']

    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "La cantidad debe ser mayor que cero.")
        return value
