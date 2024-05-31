from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .serializer import LocalidadSerializer
from .serializer import BarrioSerializer
from .serializer import RolSerializer
from .serializer import ProductoSerializer
from .serializer import DireccionSerializer
from .serializer import UsuarioSerializer
from .serializer import CompraSerializer
from .serializer import DetalleSerializer
from .serializer import PedidoSerializer
from .serializer import PermisoSerializer
from .serializer import Rol_PermisoSerializer

from .models import Localidad
from .models import Barrio
from .models import Rol
from .models import Producto
from .models import Direccion
from .models import Usuario
from .models import Compra
from .models import Detalle
from .models import Permiso
from .models import Pedido
from .models import Rol_Permiso


#----------user
from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializer import UserSerializer, RegisterSerializer
from django.contrib.auth import login
from rest_framework import permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
#-------------------fin_user

class RegisterAPI(generics.GenericAPIView):
 serializer_class = RegisterSerializer

 def post(self, request, *args, **kwargs):
  serializer = self.get_serializer(data=request.data)
  serializer.is_valid(raise_exception=True)
  user = serializer.save()
  return Response({
  "user": UserSerializer(user, context=self.get_serializer_context()).data,
  "token": AuthToken.objects.create(user)[1]
})

class LoginAPI(KnoxLoginView):
 permission_classes = (permissions.AllowAny,)

 def post(self, request, format=None):
  serializer = AuthTokenSerializer(data=request.data)
  serializer.is_valid(raise_exception=True)
  user = serializer.validated_data['user']
  login(request, user)
  return super(LoginAPI, self).post(request, format=None)




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