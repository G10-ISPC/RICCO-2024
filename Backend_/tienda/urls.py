from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import ProductViewSet, PurchaseView, SellerDashboardView, ShoppingCartView, UserChangePasswordView, UserLoginView, UserLogoutView, UserRegisterView
from tienda import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')

urlpatterns = [

    path('register/', UserRegisterView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
    path('change-password/', UserChangePasswordView.as_view(),
         name='change-password'),
    path('purchase/', PurchaseView.as_view(), name='purchase'),
    path('seller-dashboard/', SellerDashboardView.as_view(),
         name='seller-dashboard'),
    path('shopping-cart/', ShoppingCartView.as_view(), name='shopping-cart'),
    # Token authentication endpoint
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('', include(router.urls)),
]
