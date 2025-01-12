
# AgroMercantil Produtos - Avaliação Técnica

Pictures

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

Tarefas:
- Exiba os produtos em uma tabela, com colunas para Nome, Preço e Ações
- Implemente uma funcionalidade para excluir produtos da lista
- Adicione um botão para adicionar novos produtos (não é necessário conectar com a API)
- Use hooks (useState, useEffect) para gerenciar o estado da aplicação.


### Tarefa 2 - Integração Front-End e Back-End

Implemente uma API em Django que atenda ao front end da questão anterior. A API deve:
- Retornar a lista de produtos
- Permitir a exclusão de um produto
- Permitir a adição de um novo produto.

Tarefas:

- Crie o modelo Product no Django com campos name e price
- Implemente as rotas da API usando o Django REST Framework (DRF)
- Adicione validações para impedir que produtos sem nome ou preço sejam criados
- Escreva testes para garantir o funcionamento correto da API.

### Tarefa 3 - Teste de Componentes em React

Escreva testes unitários para os componentes da aplicação React criada na Questão 1.
Tarefas:
- Utilize Jest e Testing Library para garantir
- A tabela exibe corretamente os produtos
- O botão de excluir remove o produto da lista
- Novos produtos podem ser adicionados corretamente.


### Tarefa 4 - Autenticação e Autorização

Implemente um sistema de autenticação para a API Django, utilizando JWT (JSON Web Tokens).

Tarefas:
- Configure o Django REST Framework para usar JWT na autenticação.
- Modifique as rotas para que apenas usuários autenticados possam acessar ou modificar os produtos.
- Crie um endpoint para login, que retorne um token JWT válido.

### Tarefa 5 - Estilização Responsiva

Adicione estilos à aplicação React para torná-la responsiva.
Tarefas:

- Utilize CSS ou uma biblioteca como TailwindCSS ou BootstrapP
- Certifique se de que a tabela seja exibida corretamente em diferentes tamanhos de tela (desktop, tablet, celular).

### Tarefa 6 - Gerenciamento de Estado Global

A aplicação React cresceu e agora precisa de um gerenciamento de estado mais eficiente.

Tarefas:

- Refaça a aplicação da Questão 1, utilizando Redux Toolkit para gerenciar o estado globalP
- Mantenha as funcionalidades de exibir, excluir e adicionar produtos.

### Tarefa 7 - Implementação de Cache no Back-End

A API Django está sofrendo com alta carga de requisições ao endpoint /api/products.

Tarefas:

- Implemente caching para o endpoint, garantindo que os resultados sejam armazenados por 10
minutosT
- Explique como invalidar o cache se os produtos forem atualizados.

### Tarefa 8 - Otimização de Performance no Front-End

A aplicação React apresenta lentidão ao renderizar listas com mais de 500 produtos.

Tarefas:

- Explique e implemente uma solução para melhorar a performance da renderização (ex.: virtualização de lista)
- Utilize uma biblioteca como React-Window ou React-Virtualized.

### Tarefa 9 - Monitoramento e Logs
Sua aplicação em Django precisa de um sistema de monitoramento e geração de logs para rastrear erros em produção.

Tarefas:

- Configure o Django para enviar logs detalhados para um sistema externo (ex.: Sentry ou ELK Stack)
- Explique como monitorar falhas críticas e criar alertas para notificá-las.

### Tarefa 10 - Desafio Extra: Deploy em Produção
Prepare o deploy da aplicação completa (front end e back-end).

Tarefas:

- Use Docker para criar imagens separadas para o front end e o back-endT
- Configure o docker compose para orquestrar os containers
- Escreva uma documentação explicando como rodar o projeto localmente e em produção
