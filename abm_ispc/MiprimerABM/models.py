from django.db import models

class Localidad(models.Model):
    id_localidad = models.AutoField(primary_key=True)
    nombre_localidad = models.CharField(max_length=50, blank=False)
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
    nombre_barrio = models.CharField(max_length=50, blank=False)
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
    nombre_rol = models.CharField(max_length=50, blank=False)
   
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
    nombre_producto = models.CharField(max_length=100, blank=False)
    descripcion = models.TextField(max_length=1000, blank=False)
    precio = models.DecimalField(max_digits=10, decimal_places=2, blank=False)

    class Meta:
        db_table = 'producto'
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'

    def __str__(self):
        return str(self.nombre_producto)

class Direccion(models.Model):  
    id_direccion = models.AutoField(primary_key=True)
    calle = models.CharField(max_length=100, blank=False)
    numero = models.DecimalField(max_digits=10, decimal_places=2, blank=False)
    id_barrio = models.ForeignKey(Barrio, to_field='id_barrio', on_delete=models.CASCADE)

    class Meta:
        db_table = 'direccion'
        verbose_name = 'Direccion'
        verbose_name_plural = 'Direcciones'

    def __str__(self):
        return f"{self.calle}, {self.numero}"


    
class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)    
    apellido = models.CharField(max_length=50)
    nombre = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    telefono = models.CharField(max_length=50) 
    clave_usuario = models.CharField(max_length=50)  
    direccion = models.ForeignKey(Direccion, to_field='id_direccion', on_delete=models.CASCADE)
    id_rol = models.ForeignKey(Rol, to_field='id_rol', on_delete=models.CASCADE) 

    class Meta:
        db_table = 'usuario'
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'

    def __str__(self):
        return str(self.id_usuario) 

class Compra(models.Model):  
    id_compra = models.AutoField(primary_key=True)
    fecha = models.DateField()
    descripcion = models.TextField(max_length=1000, blank=False)
    precio_total = models.DecimalField(max_digits=10, decimal_places=2, blank=False)
    id_usuario = models.ForeignKey(Usuario, to_field='id_usuario', on_delete=models.CASCADE)

    class Meta:
        db_table = 'compra'
        verbose_name = 'Compra'
        verbose_name_plural = 'Compras'

    def __str__(self):
        return str(self.id_compra)

class Detalle(models.Model):  
    id_detalle = models.AutoField(primary_key=True)
    cantidad = models.IntegerField()
    precio_calculado = models.DecimalField(max_digits=10, decimal_places=2, blank=False)
    id_producto = models.ForeignKey(Producto, to_field='id_producto', on_delete=models.CASCADE)
    id_compra = models.ForeignKey(Compra, to_field='id_compra', on_delete=models.CASCADE)
    
    class Meta:
        db_table = 'detalle'
        verbose_name = 'Detalle'
        verbose_name_plural = 'Detalles'

    def __str__(self):
        return f"{self.cantidad}, {self.precio_calculado}"
