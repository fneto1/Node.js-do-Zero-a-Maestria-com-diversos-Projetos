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
    10.4 - Importar os middlewares
    10.5 - Criação das rotas
    10.6 - Exportar as rotas (router) para index.js

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
    15.4 - Extrair as informações necessárias no header da requisição (token)
    15.6 - Criar uma função no helper para separar o token da req.header (Bearer 'token'), em seguida exportar
    15.7 - Verificar o token num if/else
    15.8 - Importar a função de separar o token
    15.9 - Extrair o token com o auxilio do helper
    15.10 - Decodificar o token
    15.11 - O retorno do decodificador é um objeto com as informações de nome e id
    15.12 - Com o id, utilizar o model para retornar o seu respectivo usuário e armazenar em current user
    15.13 - Caso não venha nenhum token no header o checkUser será null
    15.14 - Por fim, retornar uma response com o currentUser

16 - Trabalhando com a função de retornar usuário por id

    16.1 - Criar função async no controller e receber por parametro o id do user
    16.2 - Extrair o id do usuario na requisição
    16.3 - Buscar o usuário por meio da função findById, passando o id como parametro
    16.4 - Realizar as validações
    16.5 - Retornar uma resposta passando o usuário
    16.6 - Criar rota GET no userRoutes ("/:id") passando o controller e a função

17 - Protegendo as rotas

    17.1 - Criação de middleware verify-token na pasta helpers
    17.2 - Importar o pacote jwt
    17.3 - Importar a função getToken
    17.4 - Criar função para verificar o token (req, res, next)
    17.5 - Chamar a função para buscar o token
    17.6 - Realizar validações quanto ao token recebido 
    17.7 - Verificar o token a partir de um trycatch
    17.8 - Caso o token esteja ok -> next(), caso contrário, catch() -> res.status()...
    17.9 - Exportar função

18 - Criação de rota para editar usuário

    18.1 - Criar rota 'edit/:id' PATCH no userRoutes
    18.2 - Importar o middleware verify-token, visto que esta rota será protegida
    18.3 - Passar a função entre a rota e o controller

19 - Trabalhando na função de editar usuário

    19.1 - Criar uma função no helper para recuperar o usuário pelo token
        19.1.1 - Importar na função o pacote jwt e o model User
        19.1.2 - A função deve receber o token por parâmetro e ser decodificado
        19.1.3 - A partir do objeto decodificado, pesquisar o usuário pelo id
        19.1.4 - Retornar o usuário
        19.1.5 - Exportar a função
    19.2 - Importar a função para recuperar usuário pelo token no controller
    19.3 - Antes de invocar a função de recuperar o usuário deve-se invocar a função que busca o token do usuário pela requisição e armazená-la numa variável
    19.4 - Invocar a função para recuperar o usuário pelo token passando o resultado da função anterior como parametro
    19.5 - Verificar se o usuário existe
    19.6 - Recuperar as informações que serão editadas no req.body
    19.7 - Tratar a imagem (verificar a proxima seção)
    19.8 - Realizar as validações dos campos para atribuir os novos dados
    19.9 - Gerar nova senha, caso o usuário queira fazer a mudança
    19.10 - Utilizar um trycatch para fazer a atualização dos dados
    19.11 - Atualizar os dados a partir da função do mongoDB findByIdAndUpdate

20 - Trabalhando com o upload de fotos

    20.1 - Criar middleware no helper com a funções para upload de fotos
        20.1.1 - Importar o pacote Multer e o pacote Path
    20.2 - Criar função para configurar a pasta de destino das imagens
    20.3 - Criar função para receber a foto e verificar o seu formato
    20.4 - Exportar a função de upload de imagem
    20.5 - Importar o middleware no arquivos de rotas
    20.6 - Posicionar o middleware nas rotas que irão receber imagens
        20.6.1 - Utilizar o metodo .single('image') pois iremos receber apenas uma imagem (o image acredito que seja o campo do model)
    20.7 - Receber a imagem no controller por meio do req.file.filename
    20.8 - atribuir a foto ao user

------------------ PETS ----------------------------

21 - Iniciando com pets

    21.1 - Executar inicialmente os passos 8, 9, 10 e 11

22 - Trabalhando com a rota dos Pets

    22.1 - Importar o verify-token para verificar as sessões

23 - Trabalhando com a função de criar um novo pet

    23.1 - Extrair as informações necessárias do body da requisição
    23.2 - Iniciar a variável available como true
    23.3 - Upload de imagens -> através do req.files (como são várias fotos, utilizamos o files)
        23.3.1 - Tratamento do objeto req.files
            23.3.1.1 - Utilizar o método map no array de objetos images para separar apenas os nomes dos arquivos das fotos e mandar para o pet.images
    23.4 - Validação dos campos
    23.5 - Informar o dono do pet e armazenar seus dados numa variável
        23.5.1 - Importar a função get-token do helpers
        23.5.2 - Importar a função get-user-by-token (Usar o await no momento de resgatar o usuário)
    23.6 - Instanciar um novo objeto do tipo Pet (new Pet -> model) e passar os dados necessários para criação
    23.7 - Utilizar um try/catch para fazer a persistência dos dados
    23.8 - Utilizar o objeto instânciado com o método save() do mongoose (Não esquecer do await)

24 - Upload de imagens na rota de pet

    24.1 - Importar o middleware de imageUpload criada na pasta helpers
    24.2 - Inserir a função entre o middleware de autenticação e o controller na rota
    24.3 - Acrescentar o método .array('images') o 'images' deve corresponder no body da req
    
    
    



