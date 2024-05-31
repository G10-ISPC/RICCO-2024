from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Localidad
from.models import Barrio
from.models import Rol
from.models import Producto
from.models import Direccion
from .models import *


#from.models import Usuario

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
    

#----------user

class UserSerializer(serializers.ModelSerializer):
 class Meta:
  model = CustomUser
  fields = ('id', 'username', 'email',  'first_name','last_name', 'password', 'telefono')


class RegisterSerializer(serializers.ModelSerializer):
 class Meta:
  #model = User
  model= CustomUser
  fields = ('id', 'username', 'email', 'password','first_name','last_name', 'telefono')
 extra_kwargs = {'password': {'write_only': True}}

def create(self, validated_data):
 #User = User.objects.create_user(
 User = CustomUser.objects.create_user(
   validated_data['username'], 
   validated_data['email'], 
   validated_data['password'],
   validated_data['first_name'],
   validated_data['last_name'],
   validated_data['password'],
   validated_data['telefono']
   )

 return User
 

#-------------------fin_user
