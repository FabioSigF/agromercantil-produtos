from django.urls import path, include
from .views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
  path('create/', CreateUserView.as_view(), name ="create_user"),
  path('login/', TokenObtainPairView.as_view(), name='get_token'),
  path('token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
  path("auth/", include("rest_framework.urls")),
]