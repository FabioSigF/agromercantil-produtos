from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
  class Meta:
    model = Product
    fields = ["id", "name", "price"]
    extra_kwargs = {"price": {"required": True},
                    "name": {"required": True}}
    
  def update(self, instance, validated_data):
    instance.name = validated_data.get("name", instance.name)
    instance.price = validated_data.get("price", instance.price)
    instance.save()
    return instance