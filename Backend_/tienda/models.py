from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import MinValueValidator

# modelo usuario


class User(AbstractUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    address = models.CharField(max_length=255)
    neighborhood = models.CharField(max_length=50)  # barrio
    locality = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=15)
    postal_code = models.CharField(max_length=10)
    profile_picture = models.ImageField(
        upload_to='profile_pictures/', blank=True, null=True)
    purchases = models.ManyToManyField(
        'Purchase', related_name='purchased_by', blank=True)
    is_seller = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name', 'address',
                       'neighborhood', 'locality', 'phone_number', 'postal_code']


# modelo producto
class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    image = models.ImageField(
        upload_to='product_images/', blank=True, null=True)
    seller = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='products')

    def __str__(self):
        return self.name


# modelo compra
class Purchase(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    final_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'Purchase #{self.id} - {self.user}'

    def get_products(self):
        return [item.product for item in self.items.all()]


# Detalle de productos comprados
class PurchaseItem(models.Model):
    purchase = models.ForeignKey(
        Purchase, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'{self.product_name} - {self.price}'


# modelo carro de compra
class ShoppingCart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(
        default=1, validators=[MinValueValidator(1)])
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'product')
        verbose_name = 'Shopping Cart'
        verbose_name_plural = 'Shopping Carts'

    def __str__(self):
        return f"{self.user.username}'s {self.product.name} Cart"
