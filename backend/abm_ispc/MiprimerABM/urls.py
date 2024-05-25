from django.urls import path, include
from rest_framework import routers
#from Aula.views import AulaViewSet
from MiprimerABM import views

router= routers.DefaultRouter()
router.register(r'localidad',views.LocalidadViewSet)
router.register(r'barrio',views.BarrioViewSet)
router.register(r'rol',views.RolViewSet)
router.register(r'producto',views.ProductoViewSet)
router.register(r'direccion',views.DireccionViewSet)
router.register(r'usuario',views.UsuarioViewSet)
#----
urlpatterns = [
     path('', include(router.urls)),
]