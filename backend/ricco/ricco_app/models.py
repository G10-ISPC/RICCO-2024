from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser, BaseUserManager

# Create your models here.    
class Localidad(models.Model):
    id_localidad = models.AutoField(primary_key=True)
    nombre_localidad = models.CharField(max_length=50, blank=False, default='')
    cod_postal = models.IntegerField(blank=False, default=2000)

    class Meta:
        db_table = 'localidad'
        verbose_name = 'Localidad'
        verbose_name_plural = 'Localidades'

    def __str__(self):
        return str(self.nombre_localidad)
    

class Barrio(models.Model):
    id_barrio = models.AutoField(primary_key=True)
    nombre_barrio = models.CharField(max_length=50, blank=False, default='')
    localidad = models.ForeignKey(Localidad, to_field='id_localidad', on_delete=models.CASCADE, related_name="barrio", default="") 

    class Meta:
        db_table = 'barrio'
        verbose_name = 'Barrio'
        verbose_name_plural = 'Barrios'

    def __str__(self):
        return str(self.nombre_barrio) 
    
    
class Rol(models.Model):
    id_rol = models.AutoField(primary_key=True)
    nombre_rol = models.CharField(max_length=50, blank=False, default='rol')
   
    class Meta:
        db_table = 'rol'
        verbose_name = 'Rol'
        verbose_name_plural = 'Roles'

    def __str__(self):
        return str(self.nombre_rol) 
    
    
class Producto(models.Model):  
    id_producto = models.AutoField(primary_key=True)
    nombre_producto = models.CharField(max_length=100, blank=False, default='')
    descripcion = models.TextField(blank=False, max_length=255, default='')
    precio = models.DecimalField(max_digits=10, decimal_places=2, blank=False, default=0.0)

    class Meta:
        db_table = 'producto'
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'

    def __str__(self):
        return str(self.nombre_producto)
    
    
class Direccion(models.Model):  
    id_direccion = models.AutoField(primary_key=True)
    calle = models.CharField(max_length=100, blank=False, default='')
    numero = models.DecimalField(max_digits=10, decimal_places=2, blank=False, default=0.0)
    barrio = models.ForeignKey(Barrio, to_field='id_barrio', on_delete=models.CASCADE, related_name="direccion", default="")

    class Meta:
        db_table = 'direccion'
        verbose_name = 'Direccion'
        verbose_name_plural = 'Direcciones'

    def __str__(self):
        return f"{self.calle}, {self.numero}"
    

class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, username, password, **extra_fields)

class CustomUser(AbstractUser):
    email = models.EmailField(max_length=150, unique=True)
    telefono = models.CharField(max_length=50, blank=False, null=True)  
    direccion = models.ForeignKey(Direccion, to_field='id_direccion', on_delete=models.CASCADE, blank=True, null=True, related_name="usuario", default="")
    rol = models.ForeignKey(Rol, to_field='id_rol', on_delete=models.CASCADE, blank=True, null=True, related_name="usuario", default="")

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    class Meta:
        db_table = 'usuario'
        verbose_name = 'usuario'
        verbose_name_plural = 'usuarios'

    def __str__(self):
        return self.email
    


class Compra(models.Model):  
    id_compra = models.AutoField(primary_key=True)
    fecha = models.DateField(auto_now_add=True)
    descripcion = models.TextField(max_length=1000, blank=False, default='')
    precio_total = models.DecimalField(max_digits=10, decimal_places=2, blank=False, default=0.0)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True, related_name="compra", default="")

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
    producto = models.ForeignKey(Producto, to_field='id_producto', on_delete=models.CASCADE, related_name="detalle", default="")
    compra = models.ForeignKey(Compra, to_field='id_compra', on_delete=models.CASCADE, related_name="detalle", default="")
    
    class Meta:
        db_table = 'detalle'
        verbose_name = 'Detalle'
        verbose_name_plural = 'Detalles'

    def __str__(self):
        return f"{self.cantidad}, {self.precio_calculado}"
    
    
    
class Permiso(models.Model):
    id_permiso = models.AutoField(primary_key=True)
    nombre_permiso = models.CharField(max_length=100, blank=False, default='')
    descripcion = models.CharField(max_length=1000, blank=False, default='')
   
    class Meta:
        db_table = 'Permiso'
        verbose_name = 'Permiso'
        verbose_name_plural = 'Permisos'
        
    def __str__(self):
        return str(self.nombre_permiso)
    
    
class Rol_Permiso(models.Model):
    id_rol_permiso = models.AutoField(primary_key=True)
    permiso = models.ForeignKey(Permiso, to_field='id_permiso', on_delete=models.CASCADE, related_name="rol_permiso", default="")
    rol = models.ForeignKey(Rol, to_field='id_rol', on_delete=models.CASCADE, related_name="rol_permiso", default="")

    

    class Meta:
        db_table = 'Rol_Permiso'
        verbose_name = 'Rol_Permiso'
        verbose_name_plural = 'Rol_Permisos'
        
    def __str__(self):
        return str(self.id_rol_permiso)
    
    
    
class Pedido(models.Model):
    id_pedido = models.AutoField(primary_key=True)
    fecha_pedido = models.DateField(auto_now_add=True)
    estado = models.CharField(max_length=50, blank=False, default='')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True, related_name="pedido", default="")

     
    class Meta:
        db_table = 'Pedido'
        verbose_name = 'Pedido'
        verbose_name_plural = 'Pedidos'
        
    def __str__(self):
        return str(self.id_pedido)                                     