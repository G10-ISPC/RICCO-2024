from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, status
from .serializer import LocalidadSerializer
from .serializer import BarrioSerializer
from .serializer import RolSerializer
from .serializer import ProductoSerializer
from .serializer import DireccionSerializer
from .serializer import RegisterSerializer 
from .serializer import UserSerializer
from .serializer import PermisoSerializer
from .serializer import CompraSerializer
from .serializer import DetalleSerializer
from .serializer import Rol_PermisoSerializer
from .serializer import PedidoSerializer

from .models import Localidad
from .models import Barrio
from .models import Rol
from .models import Producto
from .models import Direccion
#from .models import Usuario
from .models import Compra
from .models import Detalle
from .models import Permiso
from .models import Rol_Permiso
from .models import Pedido
from MiprimerABM.models import *

#----------user
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from knox.models import AuthToken
from knox.views import LoginView as KnoxLoginView
from knox.views import LogoutView as KnoxLogoutView
from .serializer import UserSerializer, RegisterSerializer
from django.contrib.auth import login
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAdminOrReadOnly
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
 def get(self, request, *args, **kwargs):
        # Puedes implementar lógica adicional para manejar solicitudes GET si es necesario
        # Por ejemplo, si deseas mostrar información sobre la API en la solicitud GET
        return Response({"message": "GET request received"})    

class LoginAPI(KnoxLoginView):
 permission_classes = (permissions.AllowAny,)

 def post(self, request,  *args, **kwargs): #cambie format
  serializer = AuthTokenSerializer(data=request.data)
  serializer.is_valid(raise_exception=True)
  user = serializer.validated_data['user']
  login(request, user)
  #return super(LoginAPI, self).post(request,  *args, **kwargs) #cambie esto
 def get(self, request):
        # Lógica de la vista para GET
  return Response(data={'message': 'GET request processed successfully'})

class LogoutView(KnoxLogoutView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        response = super().post(request, format=None)
        return Response({"success": "Logged out"}, status=response.status_code)
    

class LogoutAllView(APIView):
    permission_classes = [IsAdminOrReadOnly]

    def post(self, request, format=None):
        AuthToken.objects.all().delete()
        return Response({"success": "All users are logged out"})
    


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