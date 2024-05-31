from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Localidad
from.models import Barrio
from.models import Rol
from.models import Producto
from.models import Direccion
from.models import Usuario
from.models import Compra
from.models import Detalle
from.models import Pedido
from.models import Permiso
from.models import Rol_Permiso

class LocalidadSerializer(serializers.ModelSerializer):
 class Meta:
  model= Localidad
  fields='__all__'
  #fields=('nombre','observacion')

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
    #fields=('nombre','observacion')
    
class UsuarioSerializer(serializers.ModelSerializer):
 class Meta:
  model= Usuario
  fields=('id_usuario', 'nombre', 'email')
  #fields='__all__'
  
#----------user

class UserSerializer(serializers.ModelSerializer):
 class Meta:
  model = User
  fields = ('id', 'username', 'email')


class RegisterSerializer(serializers.ModelSerializer):
 class Meta:
  model = User
  fields = ('id', 'username', 'email', 'password')
 extra_kwargs = {'password': {'write_only': True}}

def create(self, validated_data):
 User = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

 return User


#-------------------fin_user
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
        