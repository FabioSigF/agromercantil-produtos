from rest_framework import generics
from .serializer import ProductSerializer
from .models import Product
from rest_framework.permissions import IsAuthenticated

from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from .cache_utils import invalidate_product_cache

class ListProductView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    @method_decorator(cache_page(60 * 10, key_prefix="product-list", cache="default"))
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
    
    def get_queryset(self):
        return Product.objects.all()

class GetProductView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    @method_decorator(cache_page(60 * 10, key_prefix="product-detail", cache="default"))
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

class CreateProductView(generics.CreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Product.objects.all()
    
    def perform_create(self, serializer):
        serializer.save()
        invalidate_product_cache()

class UpdateProductView(generics.UpdateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Product.objects.all()
    
    def perform_update(self, serializer):
        serializer.save()
        invalidate_product_cache()

class DeleteProductView(generics.DestroyAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Product.objects.all()
    
    def perform_destroy(self, instance):
        instance.delete()
        invalidate_product_cache()
