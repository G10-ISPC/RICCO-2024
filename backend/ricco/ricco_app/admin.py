from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

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

# Register your models here.
@admin.register(get_user_model())
class CustomUserAdmin(UserAdmin):
    pass

class LocalidadAdmin(admin.ModelAdmin):
    list_display =  ('id_localidad', 'nombre_localidad', 'cod_postal')
    
class BarrioAdmin(admin.ModelAdmin):
    list_display = ('id_barrio', 'nombre_barrio')
    
class RolAdmin(admin.ModelAdmin):
    list_display = ('id_rol','nombre_rol')

class ProductoAdmin(admin.ModelAdmin):
    list_display = ('id_producto', 'nombre_producto', 'descripcion', 'precio')

class DireccionAdmin(admin.ModelAdmin):
    list_display = ('id_direccion', 'calle', 'numero')       
    
class CompraAdmin(admin.ModelAdmin):
    list_display = ('id_compra', 'fecha', 'precio_total') 
    
class DetalleAdmin(admin.ModelAdmin):
    list_display = ('id_detalle', 'cantidad', 'precio_calculado')  

class PermisoAdmin(admin.ModelAdmin):
    list_display = ('id_permiso', 'nombre_permiso', 'descripcion') 
     
class Rol_PermisoAdmin(admin.ModelAdmin):
    list_display = ('id_rol_permiso', 'permiso', 'rol')  

class PedidoAdmin(admin.ModelAdmin):
    list_display = ('id_pedido', 'fecha_pedido', 'estado')     
    
    
            
admin.site.register(Localidad, LocalidadAdmin )
admin.site.register(Barrio, BarrioAdmin)
admin.site.register(Direccion, DireccionAdmin)
admin.site.register(Producto, ProductoAdmin)
admin.site.register(Rol, RolAdmin)
admin.site.register(Compra, CompraAdmin)
admin.site.register(Detalle, DetalleAdmin)
admin.site.register(Permiso, PermisoAdmin)
admin.site.register(Rol_Permiso, Rol_PermisoAdmin)
admin.site.register(Pedido, PedidoAdmin)         