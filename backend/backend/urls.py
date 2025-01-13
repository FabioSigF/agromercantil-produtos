from django.contrib import admin
from django.urls import path, include
from django.urls import path

def trigger_error(request):
    division_by_zero = 1 / 0

urlpatterns = [
    path('sentry-debug/', trigger_error),
    path('admin/', admin.site.urls),
    path('api/products/', include('product.urls')),
    path('api/user/', include('user.urls')),
]
