from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .serializer import LocalidadSerializer
from .serializer import BarrioSerializer
from .serializer import RolSerializer
from .serializer import ProductoSerializer
from .serializer import DireccionSerializer
from .serializer import RegisterSerializer 
#from .serializer import UsuarioSerializer
from .models import Localidad
from .models import Barrio
from .models import Rol
from .models import Producto
from .models import Direccion
#from .models import Usuario

#----------user
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from knox.models import AuthToken
from .serializer import UserSerializer, RegisterSerializer
from django.contrib.auth import login
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView

#-------------------fin_user

class RegisterAPI(generics.GenericAPIView):
 serializer_class = RegisterSerializer
 permission_classes = [AllowAny]
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

 def post(self, request,  *args, **kwargs): #cambie format
  serializer = AuthTokenSerializer(data=request.data)
  serializer.is_valid(raise_exception=True)
  user = serializer.validated_data['user']
  login(request, user)
  return super(LoginAPI, self).post(request,  *args, **kwargs) #cambie esto




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

# class UsuarioViewSet(viewsets.ModelViewSet):
#  queryset=Usuario.objects.all()
#  serializer_class= UsuarioSerializer