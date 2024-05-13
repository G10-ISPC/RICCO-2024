from django.contrib import admin

from .models import Localidad
from .models import Barrio
from .models import Direccion
from .models import Rol
from .models import Producto 
from .models import Usuario
from .models import Compra
from .models import Detalle

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
    
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('id_usuario', 'apellido', 'nombre', 'email', 'telefono', 'clave_usuario')
    
class CompraAdmin(admin.ModelAdmin):
    list_display = ('id_compra', 'fecha', 'precio_total') 
    
class DetalleAdmin(admin.ModelAdmin):
    list_display = ('id_detalle', 'cantidad', 'precio_calculado')   
            
admin.site.register(Localidad, LocalidadAdmin )
admin.site.register(Barrio, BarrioAdmin)
admin.site.register(Direccion, DireccionAdmin)
admin.site.register(Producto, ProductoAdmin)
admin.site.register(Rol, RolAdmin)
admin.site.register(Usuario, UsuarioAdmin)
admin.site.register(Compra, CompraAdmin)
admin.site.register(Detalle, DetalleAdmin)





