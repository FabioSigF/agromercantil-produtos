from django.test import TestCase
from django.core.exceptions import ValidationError
from ..models import Product

class ProductTestCase(TestCase):
  
  # Cria produto
  def setUp(self):
    self.product = Product.objects.create(name="Produto1", price=25.99)
  
  # Testa se o produto é criado corretamente
  def test_product_creation(self):
    product = self.product
    self.assertEqual(product.name, "Produto1")
    self.assertEqual(product.price, 25.99)
  
  # Testa se name é obrigatório
  def test_product_name_required(self):
    product = Product(name="", price=10.00)
    with self.assertRaises(ValidationError):
      product.full_clean()
  
  # Testa se price é obrigatório
  def test_product_price_required(self):
    product = Product(name="Produto1", price=None)
    with self.assertRaises(ValidationError):
      product.full_clean()
