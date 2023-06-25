Passo a passo da aplicação

1 - Separar as pastas backend e frontend

2 - Criar projeto node.js (npm init -y)

3 - Instalar dependências (npm install bcrypt cookie-parser cors express jsonwebtoken mongoose multer nodemon)

4 - Criar index.js e script no package.json

5 - Configurar o index.js

    5.1 - Importar o express e o cors
    5.2 - Chamar a função express() e armazenar na variável app
    5.3 - Configurar o middleware JSON response
    5.4 - Configurar o middleware CORS
    5.5 - Configurar a pasta public
    5.6 - Importar rotas
    5.7 - Executar o app.listen

6 - Criar pastas

    6.1 - controllers
    6.2 - db
    6.3 - models
    6.4 - public
    6.5 - routes
    6.6 - helpers

7 - Configurar a conexão com o banco de dados

    7.1 - Criar arquivo conn.js
    7.2 - Importar o pacote mongoose
    7.3 - Criar a função que irá realizar a ligação com o banco de dados
    7.4 - exportar o mongoose

8 - Criação dos models

    8.1 - Criação dos arquivos de models User e Pet
    8.2 - Importar o arquivo conn.js para utilizar as funcionalidades do banco de dados
    8.3 - Destructuring Schema do mongoose
    8.4 - Criar model User/Pet com a função mongoose.model(), estes serão os atributos que irão ser pesistidos no banco de dados
    8.5 - exportar o User/Pet

9 - Criação dos controllers

    9.1 - Criação dos arquivos de controller do User e do Pet
    9.2 - Importar o seu respectivo model
    9.3 - Exportar a classe UserController/PetController com as funções que serão executadas pelas rotas
    9.4 - Criar as funções que serão executadas

10 - Criação das Rotas

    10.1 - Criação dos arquivos de rotas UserRoutes e PetRoutes
    10.2 - Importar a função Router() do express
    10.3 - Importar o respectivo controller
    10.4 - Criação das rotas
    10.5 - Exportar as rotas (router) para index.js

11 - Rotas no index.js

    11.1 - Importar o arquivo de rotas
    11.2 - app.use('/nomeDaRota', arquivoDaRota)

12 - Trabalhando com a função de registrar usuário

    12.1 - Criar função async no Controller do usário
    12.2 - Extrair as informações necessárias do body da rota em /users/register
    12.3 - Realizar as validações dos campos
    12.4 - Criação da senha
        12.4.1 - Importar o bcrypt
        12.4.2 - Gerar o salt
        12.4.3 - Gerar a senha criptografada mesclando a senha passada no req.body com o salt
    12.5 - Instanciar um novo objeto do tipo User com os dados que serão persistidos no DB
    12.6 - Utilizar o metodo save() do mongoose para persistir os dados. Obs.: Utilizar um try/catch para realizar o envio dos dados para o DB
    12.7 - Realizar autenticação do usuário após criação da conta via token

13 - Criação de token do usuário

    13.1 - Criar arquivo "create-user-token.js" na pasta helpers
    13.2 - Importar o pacote jsonwebtoken
    13.3 - Criar função para gerar e retornar um token
    13.4 - Exportar função para ser utilizada na função de registrar usário

14 - Trabalhando com a função de logar o usuário

    14.1 - Criar função async no Controller do usário
    14.2 - Extrair as informações necessárias do body da rota em /users/register
    14.3 - Realizar as validações dos campos
    14.4 - Checar existência do usuário
    14.5 - Checar a se a senha é válida
    14.6 - Se tudo estiver correto, realizar a autenticação do usuário a partir do token gerado com a função createUserToken

15 - Trabalhando com a função de checar usuário autenticado

    15.1 - Criar função async no controller e declarar a variavel currentUser
    15.2 - Criar rota GET para checar usuário
    15.3 - Configurar o postman para receber um token (ir na request -> authorization -> type: bearer token -> setar o token)
    15.4 - Extrair as informações necessárias no header (params) da requisição (token)
    15.6 - Criar uma função no helper para separar o token da req.header (Bearer 'token'), em seguida exportar
    15.7 - Verificar o token num if/else
    15.8 - Importar a função de separar o token
    15.9 - Extrair o token com o auxilio do helper
    15.10 - Decodificar o token
    15.11 - O retorno do decodificador é um objeto com as informações de nome e id
    15.12 - Com o id, utilizar o model para retornar o seu respectivo usuário e armazenar em current user
    15.13 - Caso não venha nenhum token no header o checkUser será null
    15.14 - Por fim, retornar uma response com o currentUser


