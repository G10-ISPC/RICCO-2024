from rest_framework import serializers
from .models import Localidad
from.models import Barrio
from.models import Rol
from.models import Producto
from.models import Direccion
from.models import Usuario

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
  fields='__all__'