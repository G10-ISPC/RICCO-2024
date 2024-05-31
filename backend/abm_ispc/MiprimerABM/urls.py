from django.urls import path, include
from rest_framework import routers
#from Aula.views import AulaViewSet
from MiprimerABM import views
#-------------------user
from knox import views as knox_views
from .views import LoginAPI
from .views import RegisterAPI
#-------------------fin_user

router= routers.DefaultRouter()
router.register(r'localidad',views.LocalidadViewSet)
router.register(r'barrio',views.BarrioViewSet)
router.register(r'rol',views.RolViewSet)
router.register(r'producto',views.ProductoViewSet)
router.register(r'direccion',views.DireccionViewSet)
router.register(r'usuario',views.UsuarioViewSet)
router.register(r'compra',views.CompraViewSet)
router.register(r'detalle',views.DetalleViewSet)
router.register(r'permiso',views.PermisoViewSet)
router.register(r'rol_permiso',views.Rol_PermisoViewSet)
router.register(r'pedido',views.PedidoViewSet)
#----
urlpatterns = [
      #-------------------user

     path('registro', RegisterAPI.as_view(), name='register'),
     path('login', LoginAPI.as_view(), name='login'),
     path('logout', knox_views.LogoutView.as_view(), name='logout'),
     path('logoutall', knox_views.LogoutAllView.as_view(), name='logoutall'),

     path('', include(router.urls)),

]