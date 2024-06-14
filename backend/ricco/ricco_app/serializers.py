from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser
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


class UsuarioSerializers(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True)
    password = serializers.CharField(
        min_length=8)

    class Meta:
        model = get_user_model()
        fields = ('email', 'password')


class LocalidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Localidad
        fields = '__all__'


class BarrioSerializer(serializers.ModelSerializer):
    localidad = LocalidadSerializer(required=True)

    class Meta:
        model = Barrio
        fields = ('nombre_barrio', 'localidad')


class DireccionSerializer(serializers.ModelSerializer):
    barrio = BarrioSerializer(required=True)

    class Meta:
        model = Direccion
        fields = ('calle', 'numero', 'barrio')

    def create(self, validated_data):
        barrio_data = validated_data.pop('barrio')
        localidad_data = barrio_data.pop('localidad')

        localidad_instance = Localidad.objects.create(**localidad_data)
        barrio_instance = Barrio.objects.create(
            localidad=localidad_instance, **barrio_data)
        direccion_instance = Direccion.objects.create(
            barrio=barrio_instance, **validated_data)

        return direccion_instance


class RegistroSerializers(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=CustomUser.objects.all())]
    )
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    direccion = DireccionSerializer(required=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'password', 'password2', 'email',
                  'first_name', 'last_name', 'telefono', 'direccion', 'is_staff')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Los campos de contraseña no coinciden."})
        return attrs

    def create(self, validated_data):
        direccion_data = validated_data.pop('direccion')
        barrio_data = direccion_data.pop('barrio')
        localidad_data = barrio_data.pop('localidad')

        localidad_instance = Localidad.objects.create(**localidad_data)
        barrio_instance = Barrio.objects.create(
            localidad=localidad_instance, **barrio_data)
        direccion_instance = Direccion.objects.create(
            barrio=barrio_instance, **direccion_data)

        user = CustomUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            telefono=validated_data['telefono'],
            direccion=direccion_instance,
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = '__all__'


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'


class CompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compra
        fields = '__all__'


class DetalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detalle
        fields = '__all__'


class PermisoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permiso
        fields = '__all__'


class Rol_PermisoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol_Permiso
        fields = '__all__'


class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = '__all__'
