from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import generics
from .serializer import ProductSerializer
from .models import Product
from rest_framework.permissions import IsAuthenticated, AllowAny

class GetProductView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        return self.get_queryset().get(pk=self.kwargs["pk"])
  
class ListProductView(generics.ListAPIView):
  serializer_class = ProductSerializer
  #permission_classes = [IsAuthenticated]
  permission_classes = [AllowAny]
  
  def get_queryset(self):
    return Product.objects.all()

class CreateProductView(generics.CreateAPIView):
  serializer_class = ProductSerializer
  #permission_classes = [IsAuthenticated]
  permission_classes = [AllowAny]

  def get_queryset(self):
    return Product.objects.all()
  
class UpdateProductView(generics.UpdateAPIView):
  serializer_class = ProductSerializer
  #permission_classes = [IsAuthenticated]
  permission_classes = [AllowAny]
  
  def get_queryset(self):
    return Product.objects.all()
  
class DeleteProductView(generics.DestroyAPIView):
  serializer_class = ProductSerializer
  #permission_classes = [IsAuthenticated]
  permission_classes = [AllowAny]
  
  def get_queryset(self):
    return Product.objects.all()
  
  def get_object(self):
    return self.get_queryset().get(pk=self.kwargs["pk"])
  