from django.contrib import admin

from .models import Localidad
from .models import Direccion
from .models import Rol
from .models import Producto 

class LocalidadAdmin(admin.ModelAdmin):
     ('id_localidad', 'nombre_localidad')
class DireccionAdmin(admin.ModelAdmin):
    list_display = ('calle', 'numero')
class RolAdmin(admin.ModelAdmin):
    ('id_rol','nombre')
class ProductoAdmin(admin.ModelAdmin):
    ('id_producto', 'nombre_producto')
    
admin.site.register(Localidad, LocalidadAdmin )
admin.site.register(Direccion, DireccionAdmin)
admin.site.register(Producto, ProductoAdmin)
admin.site.register(Rol, RolAdmin)




