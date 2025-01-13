from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from ..models import Product
from rest_framework.reverse import reverse
from rest_framework_simplejwt.tokens import AccessToken

class ProductViewTests(APITestCase):

    def setUp(self):
        # Cria o usuário e gera o token
        self.user = User.objects.create_user(username="testuser", password="testpassword")
        token = AccessToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {str(token)}")
        self.product = Product.objects.create(name="Produto", price=25.99)

    # Testa get de produtos
    def test_list_products(self):
        url = reverse("product-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        
    # Testa criação de produtos
    def test_create_product(self):
        url = reverse("product-create")
        data = {"name": "Novo produto", "price": 19.99}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Product.objects.count(), 2)
    
    # Testa update de produtos
    def test_update_product(self):
        url = reverse("product-update", args=[self.product.pk])
        data = {"name": "Produto Atualizado", "price": 29.99}
        response = self.client.put(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.product.refresh_from_db()
        self.assertEqual(self.product.name, "Produto Atualizado")
        self.assertEqual(self.product.price, 29.99)

    # Testa delete de produtos
    def test_delete_product(self):
        url = reverse("product-delete", args=[self.product.pk])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Product.objects.count(), 0)
