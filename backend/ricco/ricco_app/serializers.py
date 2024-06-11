from rest_framework import serializers

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

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
        
class RegistroSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name', 'telefono')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            telefono=validated_data.get('telefono', '')
        )
        return user

    def validate_password(self, value):
        return make_password(value)       
    
class LocalidadSerializer(serializers.ModelSerializer):
    class Meta:
        model= Localidad
        fields='__all__'

class BarrioSerializer(serializers.ModelSerializer):
    class Meta:
        model= Barrio
        fields='__all__'
  
class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model= Rol
        fields='__all__'
  
class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model= Producto
        fields='__all__'

class DireccionSerializer(serializers.ModelSerializer):
    class Meta:
        model= Direccion
        fields=('calle', 'numero', 'id_barrio')

class CompraSerializer(serializers.ModelSerializer):
    class Meta:
        model= Compra
        fields='__all__'
                
    
class DetalleSerializer(serializers.ModelSerializer):
    class Meta:
        model= Detalle
        fields='__all__' 


class PermisoSerializer(serializers.ModelSerializer):
    class Meta:
        model= Permiso
        fields='__all__'
                
    
class Rol_PermisoSerializer(serializers.ModelSerializer):
    class Meta:
        model= Rol_Permiso
        fields='__all__' 
       
       

class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model= Pedido
        fields='__all__'                               