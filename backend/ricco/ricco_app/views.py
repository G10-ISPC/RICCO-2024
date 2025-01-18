from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework import viewsets
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import UsuarioSerializers
from .serializers import RegistroSerializers
from .serializers import LocalidadSerializer
from .serializers import BarrioSerializer
from .serializers import RolSerializer
from .serializers import ProductoSerializer
from .serializers import DireccionSerializer 
from .serializers import PermisoSerializer
from .serializers import CompraSerializer
from .serializers import DetalleSerializer
from .serializers import Rol_PermisoSerializer
from .serializers import PedidoSerializer

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

from django.http import HttpResponse

def bienvenida (request): #15/01/25
    message = """
    <h1>Bienvenido a RICCO BURGUER</h1>
    <p>Gracias por visitar nuestra aplicación. Aquí puedes acceder a las siguientes secciones:</p>
    
    <h2>1. Acceso al Panel de Administración:</h2>
    <p>Para acceder al panel de administración de Django, ve a <a href="/admin/">/admin/</a>.</p>
    
    
    <h2>2. Acceso a las API:</h2>
    <p>Para interactuar con las API, puedes acceder a las siguientes rutas:</p>
    <ul>
        <li><a href="/api/localidad/">/api/localidad/</a></li>
        <li><a href="/api/barrio/">/api/barrio/</a></li>
        <li><a href="/api/rol/">/api/rol/</a></li>
        <li><a href="/api/producto/">/api/producto/</a></li>
        <li><a href="/api/direccion/">/api/direccion/</a></li>
    </ul>
    <p>Recuerda que estas rutas corresponden a la API de nuestra aplicación.</p>
    """
    return HttpResponse(message)

class LoginView(APIView):
    @method_decorator(csrf_exempt)
    def post(self, request):
        email = request.data.get('email', None)
        password = request.data.get('password', None)
        usuario = authenticate(request, username=email, password=password)

        if usuario:
            login(request, usuario)
            isAdmin = usuario.is_staff
            tokens = self.get_tokens_for_user(usuario)
            user_data = UsuarioSerializers(usuario).data
            return Response({
                'token': tokens['access'],
                'refresh': tokens['refresh'],
                'user': user_data,
                'is_staff': isAdmin
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Credenciales de inicio de sesión incorrectas'}, status=status.HTTP_400_BAD_REQUEST)

    def get_tokens_for_user(self, user):
        refresh = RefreshToken.for_user(user)
        refresh['first_name'] = user.first_name #16/01/25
        refresh['last_name'] = user.last_name
        access = refresh.access_token 
        access['first_name'] = user.first_name # Asegura que estos campos se añadan 
        access['last_name'] = user.last_name
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

    def get(self, request):
        return Response(data={'message': 'GET request processed successfully'})
class LogoutView(APIView):
    @method_decorator(csrf_exempt)
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)
    

class RegistroView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = RegistroSerializers
    permission_classes = [AllowAny]

    @csrf_exempt
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    @csrf_exempt
    def get(self, request, *args, **kwargs):
        return Response(data={'message': 'GET request processed successfully'}, status=status.HTTP_200_OK)
    
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
    
    
          