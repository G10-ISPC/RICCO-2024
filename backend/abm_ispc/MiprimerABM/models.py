from django.db import models
#from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.conf import settings
 

class Localidad(models.Model):
    id_localidad = models.AutoField(primary_key=True)
    nombre_localidad = models.CharField(max_length=50, blank=False, default='Desconocido')
    cod_postal = models.IntegerField(blank=False, default=2000)

    class Meta:
        db_table = 'localidad'
        verbose_name = 'Localidad'
        verbose_name_plural = 'Localidades'

    def __unicode__(self):
        return self.nombre_localidad

    def __str__(self):
        return str(self.nombre_localidad)
    
class Barrio(models.Model):
    id_barrio = models.AutoField(primary_key=True)
    nombre_barrio = models.CharField(max_length=50, blank=False, default='Desconocido')
    id_localidad = models.ForeignKey(Localidad, to_field='id_localidad', on_delete=models.CASCADE) 

    class Meta:
        db_table = 'barrio'
        verbose_name = 'Barrio'
        verbose_name_plural = 'Barrios'

    def __unicode__(self):
        return self.nombre_barrio

    def __str__(self):
        return str(self.nombre_barrio)  
    
class Rol(models.Model):
    id_rol = models.AutoField(primary_key=True)
    nombre_rol = models.CharField(max_length=50, blank=False, default='Desconocido')
   
    class Meta:
        db_table = 'rol'
        verbose_name = 'Rol'
        verbose_name_plural = 'Roles'
    
    def __unicode__(self):
        return self.nombre_rol

    def __str__(self):
        return str(self.nombre_rol)    
    
class Producto(models.Model):  
    id_producto = models.AutoField(primary_key=True)
    nombre_producto = models.CharField(max_length=100, blank=False, default='nombre por defecto')
    descripcion = models.TextField(blank=False, max_length=255, default='valor por defecto')
    precio = models.DecimalField(max_digits=10, decimal_places=2, blank=False, default=0.0)

    class Meta:
        db_table = 'producto'
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'

    def __str__(self):
        return str(self.nombre_producto)

class Direccion(models.Model):  
    id_direccion = models.AutoField(primary_key=True)
    calle = models.CharField(max_length=100, blank=False, default='Desconocido')
    numero = models.DecimalField(max_digits=10, decimal_places=2, blank=False, default=0.0)
    id_barrio = models.ForeignKey(Barrio, to_field='id_barrio', on_delete=models.CASCADE)

    class Meta:
        db_table = 'direccion'
        verbose_name = 'Direccion'
        verbose_name_plural = 'Direcciones'

    def __str__(self):
        return f"{self.calle}, {self.numero}"


    
class Compra(models.Model):  
    id_compra = models.AutoField(primary_key=True)
    fecha = models.DateField(blank=False, default='2024-01-01')
    descripcion = models.TextField(max_length=1000, blank=False, default='Descripción de la compra')
    precio_total = models.DecimalField(max_digits=10, decimal_places=2, blank=False, default=0.0)
    id_usuario = models.ForeignKey(settings.AUTH_USER_MODEL, to_field='id', on_delete=models.CASCADE)

    class Meta:
        db_table = 'compra'
        verbose_name = 'Compra'
        verbose_name_plural = 'Compras'

    def __str__(self):
        return str(self.id_compra)

class Detalle(models.Model):  
    id_detalle = models.AutoField(primary_key=True)
    cantidad = models.IntegerField(blank=False, default=1)
    precio_calculado = models.DecimalField(max_digits=10, decimal_places=2, blank=False, default=0.0)
    id_producto = models.ForeignKey(Producto, to_field='id_producto', on_delete=models.CASCADE)
    id_compra = models.ForeignKey(Compra, to_field='id_compra', on_delete=models.CASCADE)
    
    class Meta:
        db_table = 'detalle'
        verbose_name = 'Detalle'
        verbose_name_plural = 'Detalles'

    def __str__(self):
        return f"{self.cantidad}, {self.precio_calculado}"
    
class Permiso(models.Model):
    id_permiso = models.AutoField(primary_key=True)
    nombre_permiso = models.CharField(max_length=100, blank=False, default='Permiso')
    descripcion = models.CharField(max_length=1000, blank=False, default='Descripción del permiso')
   
    class Meta:
        db_table = 'Permiso'
        verbose_name = 'Permiso'
        verbose_name_plural = 'Permisos'
        
    def __str__(self):
        return str(self.nombre_permiso)


class Rol_Permiso(models.Model):
    id_rol_permiso = models.AutoField(primary_key=True)
    id_permiso = models.ForeignKey(Permiso, to_field='id_permiso', on_delete=models.CASCADE)
    id_rol = models.ForeignKey(Rol, to_field='id_rol', on_delete=models.CASCADE)

    

    class Meta:
        db_table = 'Rol_Permiso'
        verbose_name = 'Rol_Permiso'
        verbose_name_plural = 'Rol_Permisos'
        
    def __str__(self):
        return str(self.id_rol_permiso)
    

class Pedido(models.Model):
    id_pedido = models.AutoField(primary_key=True)
    fecha_pedido = models.DateField(blank=False, default='2024-01-01')
    estado = models.CharField(max_length=50, blank=False, default='Pendiente')
    id_usuario = models.ForeignKey(settings.AUTH_USER_MODEL, to_field='id', on_delete=models.CASCADE)

     
    class Meta:
        db_table = 'Pedido'
        verbose_name = 'Pedido'
        verbose_name_plural = 'Pedidos'
        
    def __str__(self):
        return str(self.id_pedido)

class CustomUser(AbstractUser):
    #apellido = models.CharField(max_length=50, blank=False)  
    #nombre = models.CharField(max_length=50, blank=False)  
    email=  models.EmailField(max_length=150, unique=True)
    telefono = models.CharField(max_length=50, blank=False)  
    direccion = models.ForeignKey(Direccion,  related_name='usuarios', to_field='id_direccion', on_delete=models.CASCADE, blank=True, null=True)
    id_rol = models.ForeignKey(Rol,  related_name='roles', to_field='id_rol', on_delete=models.CASCADE, blank=True, null=True)
   
    class Meta:
        verbose_name = 'CustomUser'
        verbose_name_plural = 'CustomUsers'
    
        def __str__(self):
         return f"{self.email}"