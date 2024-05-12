from django.db import models

class Localidad(models.Model):
    id_localidad = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
class Meta:
    db_table = 'localidad'
    verbose_name = ('Localidad')
    verbose_name_plural = 'Localidades'

    def __str__(self):
        return self.nombre
    
class Producto (models.Model):  
 id_producto=models.AutoField(primary_key=True)
nombre_producto= models.CharField(max_length=100, blank=False)
descripcion=models.TextField(max_length=1000, blank=False)
precio= models.DecimalField(max_digits=10, decimal_places=2, blank=False)

class Meta:
    db_table = 'producto'
    verbose_name = ('Producto')
    verbose_name_plural = 'Productos'
def __str__(self):
    return self.id_producto
def __str__(self):
    return self.nombre_producto

class Rol(models.Model): 
 id_rol= models.AutoField(primary_key=True)
nombre = models.CharField(max_length=100)
class Meta:
    db_table = 'rol'
    verbose_name = ('Rol')
    verbose_name_plural = 'Roles'
    def __str__(self):
        return self.nombre
    
class Direccion(models.Model):
    id_direccion = models.AutoField(primary_key=True)
    calle = models.CharField(max_length=50)
    numero = models.CharField(max_length=10)
    id_barrio = models.IntegerField()
    id_usuario = models.IntegerField()
class Meta:
    db_table = 'direccion'
    verbose_name = ('Direccion')
    verbose_name_plural = 'Direcciones'
    def __str__(self):
        return f"{self.calle}, {self.numero}"

        
   