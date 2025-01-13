
# AgroMercantil Produtos - Avaliação Técnica

## Introdução

Projeto desenvolvido para avaliação técnica. É uma plataforma que exibe uma tabela de produtos, que podem ser editados ou excluídos. Também é possível adicionar novos produtos. As principas tecnologias utilizadas foram ReactJS para o frontend e Django Rest Framework para o backend.

## Tecnologias Utilizadas

Front-End:
- React JS : framework para desenvolvimento;
- TypeScript;
- Tailwind: estilos;
- Redux Toolkit: gerenciamento de estados;
- Axios: manipulação de API;
- Jest e Testing Library: testes;
BackEnd:
- Django Rest Framework: construção da API;
- JWT: geração e validação de tokens de sessão do usuário;

## Tarefas - Passo a passo

### Tarefa 1 - Construção de Interface em React

Crie uma aplicação em React que consuma uma API REST fictícia e exiba uma lista de produtos. A API
responde no seguinte formato: 
`GET /api/products [ { id : 1, name : Produto 1", price : 100.0 }, { id : 2, name : Produto 2", price : 200.0 } ]`

**Tarefas:**
- Exiba os produtos em uma tabela, com colunas para Nome, Preço e Ações
- Implemente uma funcionalidade para excluir produtos da lista
- Adicione um botão para adicionar novos produtos (não é necessário conectar com a API)
- Use hooks (useState, useEffect) para gerenciar o estado da aplicação.

**Conclusão:**
![scrnli_NiCkHyqbCB6Yet](https://github.com/user-attachments/assets/fce69286-b571-455f-ad11-41b4e8b42553)
![scrnli_irpUlCwSAB4LG5](https://github.com/user-attachments/assets/8d4667af-f828-4219-83c1-b3cd967050a0)

Na parte inicial, o **useState** foi usado para armazenar estados da aplicação e o **useEffect** para gerenciá-los conforme necessário. Os itens foram divididos nos seguintes componentes:
- ProductsTable.tsx
- CreateProductForm.tsx
- EditProductForm.tsx

O Hook useState foi usado em `CreateProductForm.tsx` para guardar valores do formulário, assim como no `EditProductForm.tsx`:
```.tsx
const CreateProductForm: React.FC<CreateProductFormProps> = ({
  onProductCreated,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | string>("");
...
```

O Hook useEffect foi usado para inicializar e reinicializar o state de `products` quando houvessem alterações nos produtos da `Home.tsx`. Posteriormente, modificado para se adequar à conexão com a API:
```.tsx
function Home() {
  const [products, setProducts] = useState([]);
  const { editProductModalOpen } =
  useSelector((state: RootState) => state.modal);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    api
      .get("/products/")
      .then((response) => response.data)
      .then((data) => setProducts(data))
      .catch((error) => alert(error));
  };
```

### Tarefa 2 - Integração Front-End e Back-End

Implemente uma API em Django que atenda ao front end da questão anterior. A API deve:
- Retornar a lista de produtos
- Permitir a exclusão de um produto
- Permitir a adição de um novo produto.

**Tarefas:**

- Crie o modelo Product no Django com campos name e price
- Implemente as rotas da API usando o Django REST Framework (DRF)
- Adicione validações para impedir que produtos sem nome ou preço sejam criados
- Escreva testes para garantir o funcionamento correto da API.

**Conclusão:**

Estrutura de pastas do backend:<br><br>
|-> backend<br>
|   |-> backend  (configurações gerais)<br>
|   |-> product  (configurações de produtos)<br>
|   |-> user  (configurações de usuários)<br>


Criação do **Product model** no Django em backend>product>models.py:
```python
class Product(models.Model):
  name = models.CharField(max_length=100)
  price = models.FloatField()
  
  def __str__(self):
    return self.name
```
Serializer de Product para **garantir que ele não seja criado sem name ou price**:
```python
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
```
**Configuração de urls** em backend>product>urls.py:
```python
urlpatterns = [
  path('', views.ListProductView.as_view(), name ="product-list"),
  path('<int:pk>/', views.GetProductView.as_view(), name ="product-get"),
  path('create/', views.CreateProductView.as_view(), name ="product-create"),
  path('update/<int:pk>/', views.UpdateProductView.as_view(), name ="product-update"),
  path('delete/<int:pk>/', views.DeleteProductView.as_view(), name ="product-delete"),
]
```
**Configuração das urls gerais** em backend>backend>urls.py:
```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/products/', include('product.urls')),
    path('api/user/', include('user.urls')),
]
```
**Testes unitários** sobre o Product model:
```python
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
```
**Testes unitários** sobre a view do Product:
```python
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
```
### Tarefa 3 - Teste de Componentes em React

Escreva testes unitários para os componentes da aplicação React criada na Questão 1.
Tarefas:
- Utilize Jest e Testing Library para garantir
- A tabela exibe corretamente os produtos
- O botão de excluir remove o produto da lista
- Novos produtos podem ser adicionados corretamente.

**Conclusão:** <br>
Os testes requisitados ficaram divididos em dois arquivos. <br>
ProductsTable.spec.tsx, testa a **Tabela de Produtos** e a **Remoção de Produtos**:
```.tsx
// Mock react-redux
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

// Mock react-window
jest.mock("react-window", () => ({
  FixedSizeList: jest.fn(({ children, itemCount, itemSize, width, height }) => (
    <div data-testid="FixedSizeList" style={{ width, height }}>
      {Array.from({ length: itemCount }).map((_, index) => (
        <div key={index} style={{ height: itemSize }}>
          {children({ index, style: {} })}
        </div>
      ))}
    </div>
  )),
}));

describe("ProductsTable", () => {
  const products = [
    { id: 1, name: "Produto 1", price: 10.0 },
    { id: 2, name: "Produto 2", price: 20.0 },
  ];

  let dispatch: jest.Mock;

  beforeEach(() => {
    dispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
    
    // Mocka delete api
    jest.spyOn(api, "delete").mockResolvedValueOnce({});
  });

  it("deve renderizar a tabela e exibir os produtos corretamente", async () => {
    render(<ProductsTable products={products} />);

    await waitFor(() =>
      expect(screen.getByText("Produto 1")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText("R$ 10.00")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText("Produto 2")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText("R$ 20.00")).toBeInTheDocument()
    );
  });

  it("deve remover um produto da lista ao clicar no botão de remover", async () => {

    render(<ProductsTable products={products} />);

    expect(screen.getByText("Produto 1")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("remove-button-1"));

    await waitFor(() => {
      expect(api.delete).toHaveBeenCalledWith("/products/delete/1/");
    });

    expect(screen.queryByText("Produto 1")).not.toBeInTheDocument();
    expect(screen.getByText("Produto 2")).toBeInTheDocument();
  });
});
```
CreateProductForm.spec.tsx testa a **criação de produtos**:
```.tsx
jest.mock("../api");

describe("CreateProductForm", () => {

  it("não deve permitir a criação sem nome e preço", async () => {
    render(<CreateProductForm />);

    const submitButton = screen.getByRole("button", { name: /criar produto/i });

    fireEvent.click(submitButton);

    // Verifica se a API não foi chamada
    expect(api.post).not.toHaveBeenCalled();
  });

  it("deve chamar a função de criação de produto com dados válidos", async () => {
    const responseData = { data: { id: 1, name: "Produto Teste", price: 100 } };

    (api.post as jest.Mock).mockResolvedValueOnce(responseData);

    render(<CreateProductForm />);

    // Preenche os campos
    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: "Produto Teste" } });
    fireEvent.change(screen.getByLabelText(/preço/i), { target: { value: "100" } });

    const submitButton = screen.getByRole("button", { name: /criar produto/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      // Verifica se a API foi chamada com os dados corretos
      expect(api.post).toHaveBeenCalledWith("products/create/", {
        name: "Produto Teste",
        price: 100,
      });

      // Verifica se os campos foram limpos
      expect((screen.getByLabelText(/nome/i) as HTMLInputElement).value).toBe("");
      expect((screen.getByLabelText(/preço/i) as HTMLInputElement).value).toBe("");
    });
  });

});
```

### Tarefa 4 - Autenticação e Autorização

Implemente um sistema de autenticação para a API Django, utilizando JWT (JSON Web Tokens).

Tarefas:
- Configure o Django REST Framework para usar JWT na autenticação.
- Modifique as rotas para que apenas usuários autenticados possam acessar ou modificar os produtos.
- Crie um endpoint para login, que retorne um token JWT válido.

**Conclusão:** <br>
Criei um módulo `user` na API. Ele é responsável pela autenticação e autorização do projeto, que utiliza o JWTokens. O Model de usuário é o User do auth.models. O arquivo `serializer.py` valida a criação de usuários sem nome ou senha.
```python
from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {
            "password": {"write_only": True, "required": True},
            "name": {"required": True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
```
No arquivo de view, temos a classe `CreateUserView`:
```python
class CreateUserView(generics.CreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [AllowAny]

  def create(self, request):
    serializer = UserSerializer(data = request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```
Na parte de `urls.py`, usamos alguns métodos do rest_framework_simplejwt.view para gerar token (TokenObtainPairView) para login e refresh (TokenRefreshView):
```python
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
  path('create/', CreateUserView.as_view(), name ="create_user"),
  path('login/', TokenObtainPairView.as_view(), name='get_token'),
  path('token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
  path("auth/", include("rest_framework.urls")),
]
```
As rotas de produtos precisam de autenticação. Como cada rota implementa uma classe de `view.py`, a permissão foi incluída da seguinte forma:
```python
class GetProductView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
...
class ListProductView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
...
class CreateProductView(generics.CreateAPIView):
  serializer_class = ProductSerializer
  permission_classes = [IsAuthenticated]
...
class UpdateProductView(generics.UpdateAPIView):
  serializer_class = ProductSerializer
  permission_classes = [IsAuthenticated]
...
class DeleteProductView(generics.DestroyAPIView):
  serializer_class = ProductSerializer
  permission_classes = [IsAuthenticated]
...
```


### Tarefa 5 - Estilização Responsiva

Adicione estilos à aplicação React para torná-la responsiva.
Tarefas:

- Utilize CSS ou uma biblioteca como TailwindCSS ou Bootstrap
- Certifique se de que a tabela seja exibida corretamente em diferentes tamanhos de tela (desktop, tablet, celular).

**Conclusão:** <br>
A biblioteca escolhida foi o Tailwind. Todos os componentes foram construídos para se adaptarem aos vários tamanhos de tela, sendo necessário alterações específicas apenas na ProductsTable:
```.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  openCreateProductModal,
  openEditProductModal,
  openRemoveProductModal,
} from "../redux/modal/slice";

// React Window - Performance optimization
import { FixedSizeList} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

const ProductsTable = ({ products }) => {
  ...
const renderRow = ({ index, style }) => {
    const product = products[index];
    return (
      <div
        style={style}
        className="flex flex-row items-center justify-between border px-4 py-2 min-w-full"
      >
        <div className="w-full sm:w-1/3 py-1 text-left break-words">
          {product.name}
        </div>
        <div className="w-full sm:w-1/3 py-1 text-left">
          R$ {product.price.toFixed(2)}
        </div>
        <div className="w-full sm:w-1/3 flex gap-2 justify-center">
          <button
            onClick={() => handleEdit(product.id)}
            className="mb-2 sm:mb-0 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
          >
            Editar
          </button>
          <button
            onClick={() => handleRemove(product.id)}
            className="mb-2 sm:mb-0 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Remover
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Lista de Produtos - Commodities Agrícolas
      </h1>
      <button
        onClick={handleAddProduct}
        className="mb-4 px-4 py-2 bg-primary text-white rounded shadow hover:bg-primary-dark green transition"
      >
        Adicionar Produto
      </button>
      <div className="overflow-x-auto">
        <div className="min-w-[540px] border border-gray-300 rounded-lg">
          <div className="bg-gray-100 flex">
            <div className="w-1/3 border px-4 py-2 text-left">Nome</div>
            <div className="w-1/3 border px-4 py-2 text-left">Preço</div>
            <div className="w-1/3 border px-4 py-2 text-center">Ações</div>
          </div>
          <div className="w-full h-[50vh]">
            <AutoSizer>
              {({ height, width }) => (
                <FixedSizeList
                  height={height}
                  itemCount={products.length}
                  itemSize={56}
                  width={width}
                >
                  {renderRow}
                </FixedSizeList>
              )}
            </AutoSizer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;
```

### Tarefa 6 - Gerenciamento de Estado Global

A aplicação React cresceu e agora precisa de um gerenciamento de estado mais eficiente.

Tarefas:

- Refaça a aplicação da Questão 1, utilizando Redux Toolkit para gerenciar o estado global
- Mantenha as funcionalidades de exibir, excluir e adicionar produtos.

**Conclusão:** <br>
O Redux Tollkit foi utilizado, principalmente, para gerenciamento de estados globais do `Modal` de edição de produtos.

```.tsx
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  editProductModalOpen: boolean;
  editProductId: number | null;
}

const initialState: ModalState = {
  editProductModalOpen: false,
  editProductId: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openEditProductModal(state, action: PayloadAction<number>) {
      state.editProductModalOpen = true;
      state.editProductId = action.payload;
    },
    closeEditProductModal(state) {
      state.editProductModalOpen = false;
      state.editProductId = null;
    },
  },
});

export const {
  openEditProductModal,
  closeEditProductModal,
} = modalSlice.actions;

export default modalSlice.reducer;

```
Para organização, existe uma pasta `redux` em `src` que contem as configurações da store em `store.ts`:
```.tsx
import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal/slice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
```
Na prática, o estado global vai guardar se o modal está aberto ou fechado, e qual será o seu conteúdo exibido. Ele guarda o id do produto que é buscado no API quando o modal é aberto.

### Tarefa 7 - Implementação de Cache no Back-End

A API Django está sofrendo com alta carga de requisições ao endpoint /api/products.

Tarefas:

- Implemente caching para o endpoint, garantindo que os resultados sejam armazenados por 10
minutosT
- Explique como invalidar o cache se os produtos forem atualizados.

**Conclusão:** <br>
O Redis foi escolhido como banco em memória para armazenar o cache. A estratégia utilizada foi implementar o caching em `/api/products`, que faz a requisição da lista de produtos e, caso ocorra alguma atualização (POST, PUT ou DELETE) na lista, o cache seja invalidado e a lista atualizada novamente. Caso não ocorra
nenhuma atualização, os dados requisitados estarão cacheados por 10 minutos.

```python
#Classe da rota /api/products
class ListProductView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    @method_decorator(cache_page(60 * 10, key_prefix="product-list", cache="default"))
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
    
    def get_queryset(self):
        return Product.objects.all()
```
Função para invalidar cache:
```python
#product>cache_utils.py
def invalidate_product_cache():
    redis_conn = get_redis_connection("default")
    prefix = "myapp"
    detail_pattern = f"{prefix}:views.decorators.cache.cache*product-detail*"
    list_pattern = f"{prefix}:views.decorators.cache.cache*product-list*"

    keys_to_invalidate = list(redis_conn.scan_iter(detail_pattern)) + list(redis_conn.scan_iter(list_pattern))

    if keys_to_invalidate:
        redis_conn.delete(*keys_to_invalidate)
        print(f"Chaves deletadas: {keys_to_invalidate}")
    else:
        print("Nenhuma chave encontrada para exclusão.")
```
Aplicação da função `invalidate_product_cache`:
```python
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
```

### Tarefa 8 - Otimização de Performance no Front-End

A aplicação React apresenta lentidão ao renderizar listas com mais de 500 produtos.

Tarefas:

- Explique e implemente uma solução para melhorar a performance da renderização (ex.: virtualização de lista)
- Utilize uma biblioteca como React-Window ou React-Virtualized.

**Conclusão:** <br>
O React-Window tem o papel de, basicamente, renderizar uma quantidade de itens na tabela Products para não gerar sobrecarga no sistema quando tem listas grandes.

```.tsx
// React Window - Performance optimization
import { FixedSizeList} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

const ProductsTable = ({ products }) => {
...
          <div className="w-full h-[50vh]">
            <FixedSizeList
              height={400}
              itemCount={products.length}
              itemSize={56}
              width="100%"
            >
              {renderRow}
            </FixedSizeList>
          </div>
        </div>
      </div>
    </div>
  );
};
...
```
O FixedSizeList implementa uma lista de itens absolutos, exibindo em geral 9 itens por vez no HTML. Ou seja, se lista for maior que isso, ela os substitui conforme necessário.
### Tarefa 9 - Monitoramento e Logs
Sua aplicação em Django precisa de um sistema de monitoramento e geração de logs para rastrear erros em produção.

Tarefas:

- Configure o Django para enviar logs detalhados para um sistema externo (ex.: Sentry ou ELK Stack)
- Explique como monitorar falhas críticas e criar alertas para notificá-las.

**Conclusão:** <br>
Optei pela utilização do Sentry pela simplicidade de configuração. <br>
Instalação:
```bash
pip install --upgrade 'sentry-sdk[django]'
```
Configuração em settings.py: 
```python
import sentry_sdk
sentry_sdk.init(
    dsn="https://df858272f91be469e6e326c8c91242b4@o4508636365914112.ingest.us.sentry.io/4508636367945728",
    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for tracing.
    traces_sample_rate=1.0,
    _experiments={
        # Set continuous_profiling_auto_start to True
        # to automatically start the profiler on when
        # possible.
        "continuous_profiling_auto_start": True,
    },
)
```
Para testar as configurações, usei o exemplo padrão do Sentry para forçar um erro de rotas e analisar os logs:
```python
#urls.py
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
```
Erro na rota:
![image](https://github.com/user-attachments/assets/aeecd2ae-b116-4759-b147-70990667772f)

Erro detectado no dashboard do Sentry:
![scrnli_FPOI3u9a91b91J](https://github.com/user-attachments/assets/4eee13bf-1c4c-41a2-9d55-10067455c60c)

### Tarefa 10 - Desafio Extra: Deploy em Produção
Prepare o deploy da aplicação completa (front end e back-end).

Tarefas:

- Use Docker para criar imagens separadas para o front end e o back-endT
- Configure o docker compose para orquestrar os containers
- Escreva uma documentação explicando como rodar o projeto localmente e em produção
