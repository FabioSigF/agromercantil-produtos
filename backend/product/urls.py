from django.urls import path, include
from .import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
  path('', views.ListProductView.as_view(), name ="product-list"),
  path('<int:pk>/', views.GetProductView.as_view(), name ="product-get"),
  path('create/', views.CreateProductView.as_view(), name ="product-create"),
  path('update/<int:pk>/', views.UpdateProductView.as_view(), name ="product-update"),
  path('delete/<int:pk>/', views.DeleteProductView.as_view(), name ="product-delete"),
]