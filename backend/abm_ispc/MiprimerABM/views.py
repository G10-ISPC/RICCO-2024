from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .serializer import LocalidadSerializer
from .serializer import BarrioSerializer
from .serializer import RolSerializer
from .serializer import ProductoSerializer
from .serializer import DireccionSerializer
from .serializer import UsuarioSerializer
from .models import Localidad
from .models import Barrio
from .models import Rol
from .models import Producto
from .models import Direccion
from .models import Usuario


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

class UsuarioViewSet(viewsets.ModelViewSet):
 queryset=Usuario.objects.all()
 serializer_class= UsuarioSerializer