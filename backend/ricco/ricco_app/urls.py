from django.urls import path, include
from rest_framework import routers
from .views import LoginView, LogoutView, RegistroView
from ricco_app import views


router= routers.DefaultRouter()
router.register(r'localidad',views.LocalidadViewSet)
router.register(r'barrio',views.BarrioViewSet)
router.register(r'rol',views.RolViewSet)
router.register(r'producto',views.ProductoViewSet)
router.register(r'direccion',views.DireccionViewSet)
router.register(r'permiso',views.PermisoViewSet)
router.register(r'rol_permiso',views.Rol_PermisoViewSet)
router.register(r'pedido',views.PedidoViewSet)
router.register(r'compra',views.CompraViewSet)
router.register(r'detalle',views.DetalleViewSet)

# router = DefaultRouter()

urlpatterns = [
    path('login/',
         LoginView.as_view(), name='login'),
    path('logout/',
         LogoutView.as_view(), name='logout'),
    path('registro/',
         RegistroView.as_view(), name='registro'),
    
    path('', include(router.urls)),
]
