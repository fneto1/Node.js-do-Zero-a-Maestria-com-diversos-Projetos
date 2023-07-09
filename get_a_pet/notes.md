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

25 - Trabalhando com a função de retornar todos os pets

    25.1 - Criar função no controller
    25.2 - Utilizar o método find() para retornar todos e o método sort() para fazer a ordenação, passar por parametros no sort qual a coluna que ele ira ordernar
    25.3 - Retornar o resultado numa variável e mandar por resposta em json
    25.4 - Criar a rota GET e passar a função

26 - Trabalhando com a função de retornar todos os pets de um usuário

    26.1 - Criar função no controller
    26.2 - Resgatar o usuário e armazenar seus dados numa variável
        26.2.1 - Importar a função get-token do helpers
        26.2.2 - Importar a função get-user-by-token (Usar o await no momento de resgatar o usuário)
    26.3 - Utilizar o método find() para retornar todos e o método sort() para fazer a ordenação. passar como parametros no find o user._id para ser comparado com o user._id do BD e no sort qual a coluna que ele ira ordernar
    26.4 - Retornar o resultado numa variável e mandar por resposta em json
    26.5 - Criar a rota GET e passar a função

27 - Trabalhando com a função de retornar todos os pets adotados de um usuário

    27.1 - Criar função no controller
    27.2 - Resgatar o usuário e armazenar seus dados numa variável
        27.2.1 - Importar a função get-token do helpers
        27.2.2 - Importar a função get-user-by-token (Usar o await no momento de resgatar o usuário)
    27.3 - Utilizar o método find() para retornar todos e o método sort() para fazer a ordenação. passar como parametros no find o user._id para ser comparado com o 'adopter._id' do DB e no sort qual a coluna que ele ira ordernar
    27.4 - Retornar o resultado numa variável e mandar por resposta em json
    27.5 - Criar a rota GET e passar a função

28 - Trabalhando com a função de retornar um Pet pelo id

    28.1 - Inicialmente importar a função ObjectId do moongose que faz a verificação de um id
    28.2 - Resgatar o id no pet nos parametros da url
    28.3 - Verificar a validade do id pelo ObjectId.isValid(id)
    28.4 - Resgatar o pet no DB pelo método findOne() passando o id como parametro de comparação. Armazenar o resultado numa variavel
    28.5 - Validar a resposta da query, caso exista ou não o pet
    28.6 - Retornar o pet solicitado

29 - Trabalhando com a função de remover o pet pelo id

    29.1 - Inicialmente importar a função ObjectId do moongose que faz a verificação de um id
    29.2 - Resgatar o id no pet nos parametros da url
    29.3 - Verificar a validade do id pelo ObjectId.isValid(id)
    29.4 - Resgatar o pet no DB pelo método findOne() passando o id como parametro de comparação. Armazenar o resultado numa variavel
    29.5 - Validar a resposta da query, caso exista ou não o pet
    29.6 - Resgatar o usuário dono do pet e armazenar seus dados numa variável
        29.6.1 - Importar a função get-token do helpers
        29.6.2 - Importar a função get-user-by-token (Usar o await no momento de resgatar o usuário)
    29.7 - Verificar se o pet solicitado para a remoção pertecence ao usuário (utilizar o .toString() para comparar os _id)
    29.8 - Remover o pet com a função Pet.findByIdAndRemove e retronar uma resposta
    29.9 - Criar a rota DELETE, passar o verifytoken e passar a função

30 - Trabalhando com a função de atualizar o pet

    30.1 - Inicialmente importar a função ObjectId do moongose que faz a verificação de um id
    30.2 - Resgatar o id no pet nos parametros da url
    30.3 - Resgatar os campos dos dados no body (req.body)
    30.4 - Resgatar o campo das imagens (req.file)
    30.5 - Inicialmente declarar um objeto vazio para armazenar os dados atualizados
    30.6 - Verificar a validade do id pelo ObjectId.isValid(id)
    30.7 - Resgatar o pet no DB pelo método findOne() passando o id como parametro de comparação. Armazenar o resultado numa variavel
    30.8 - Validar a resposta da query, caso exista ou não o pet
    30.9 - Resgatar o usuário dono do pet e armazenar seus dados numa variável
        30.9.1 - Importar a função get-token do helpers
        30.9.2 - Importar a função get-user-by-token (Usar o await no momento de resgatar o usuário)
    30.10 - Verificar se o pet solicitado para a atualização pertecence ao usuário (utilizar o .toString() para comparar os _id)
    30.11 - Realizar as validações dos campos
        30.11.1 - Observações para a validação das imagens:
            30.11.1.1 - Caso passe na logica da validação, criar um array images no objeto de dados atualizados
            30.11.1.2 - Utilizar o método map para tratar os dados vindo do req.file para buscar apenas o nome do arquivo de imagem e salvar em seguida no array
    30.12 - Fazer o envio dos dados atualizados pela função findByIdAndUpdate, passando o id do pet e o objeto com os dados atualizados
    30.13 - Retornar uma resposta 200
    30.14 - Criar a rota PATCH, passar o verifytoken, o middleware de upload de fotos e passar a função

31 - Trabalhando com a função de agendar encontro com o pet

    31.1 - Inicialmente importar a função ObjectId do moongose que faz a verificação de um id
    31.2 - Resgatar o id no pet nos parametros da url
    31.3 - Verificar a validade do id pelo ObjectId.isValid(id)
    31.4 - Resgatar o pet no DB pelo método findOne() passando o id como parametro de comparação. Armazenar o resultado numa variavel
    31.5 - Validar a resposta da query, caso exista ou não o pet
    31.6 - Resgatar o usuário atual armazenar seus dados numa variável
        31.6.1 - Importar a função get-token do helpers
        31.6.2 - Importar a função get-user-by-token (Usar o await no momento de resgatar o usuário)
    31.7 - Verificar se o pet em questão já não pertence ao usuário, impossibilitando dele agendar uma visita ao proprio pet
    31.8 - Verificar se o user já possui uma marcação de visita com o pet (dica: lembrar do objeto adopter instanciado no Model pet)
    31.9 - Adicionar os dados do usuário no objeto adopter
    31.10 - Fazer o envio dos dados atualizados pela função findByIdAndUpdate, passando o id do pet e o objeto pet com os dados do adopter atualizado
    31.11 - Retornar uma resposta 200
    31.12 - Criar a rota PATCH, passar o verifytoken, passar a função

32 - Trabalhando com a função de concluir adoção do pet

    32.1 - Inicialmente importar a função ObjectId do moongose que faz a verificação de um id
    32.2 - Resgatar o id no pet nos parametros da url
    32.3 - Verificar a validade do id pelo ObjectId.isValid(id)
    32.4 - Resgatar o pet no DB pelo método findOne() passando o id como parametro de comparação. Armazenar o resultado numa variavel
    32.5 - Validar a resposta da query, caso exista ou não o pet
    32.6 - Resgatar o usuário atual armazenar seus dados numa variável
        32.6.1 - Importar a função get-token do helpers
        32.6.2 - Importar a função get-user-by-token (Usar o await no momento de resgatar o usuário)
    32.7 - Verificar se o pet solicitado para a atualização pertecence ao usuário (utilizar o .toString() para comparar os _id)
    32.8 - Alterar o available para false (pet adotado)
    32.10 - Fazer o envio dos dados atualizados pela função findByIdAndUpdate, passando o id do pet e o objeto pet atualizado
    32.11 - Retornar uma resposta 200
    32.12 - Criar a rota PATCH, passar o verifytoken, passar a função

-------------------------------------------------------------------------------------------------------------------------------------------------

FRONTEND DA APLICAÇÃO

1 - Preparando setup inicial
    1.1 - Inicializar o react na pasta frontend: npx create-react-app .
    1.2 - Instalação dos pacotes: axios, events, react-router-dom, react-icons
    1.3 - Configurar o .env.local
    1.4 - Excluir arquivos desnecessários
        1.4.1 - Manter na pasta public apenas os arquivo de index.html e o favicon de preferencia
        1.4.2 - Manter na pasta src apenas os arquivos: App.js, index.css, index.js
    1.5 - Criação de pastas que serão utilizadas durante o processo. components, assets, context, hooks, utils

2 - Configurar css da index.js

3 - Criação das páginas
    3.1 - Criar uma pasta pages na pasta components
    3.2 - Separar as páginas em grupos por pasta. Obs.: exceto a pagina Home

4 - Importando o pacote de rotas e as páginas no App.js
    4.1 - Importar BrowserRoutes, Routes e Route do react-router-dom
    4.2 - Importar as páginas criadas anteriormente
    4.3 - Estruturar as funções de rotas no return da função App

5 - Criando Navbar e Footer
    5.1 - Em components, criar pasta layouts e os arquivos de componentes Footer.js e Navbar.js
    5.2 - Navbar
        5.2.1 - Importar Link do react-router-dom
        5.2.2 - Criar lista e utilizar o Link para referenciar as páginas
    5.3 - Footer
        5.3.1 - Criar estrutura básica
    5.4 - Importar arquivos no App.js e inserir o Navbar antes do Routes e o Footer ao final do Routes

6 - Estilizando os components Navbar e o Footer
    6.1 - Criar os arquivos module.css

7 - Criação do component Container
    7.1 - Em components, criar na pasta layouts o arquivo de Container.js
    7.2 - Importar o componente em App.js abraçando a tag <Routes>
    7.3 - Colocar {children} no parametro da função Container para que seja possível apresentar os componentes que serão "filhos" de Container
    7.4 - Criar os arquivo module.css e estilizar
 
8 - Criação do component de Input
    8.1 - Criar uma pasta em components com o nome form
    8.2 - Criar o arquivo Input.js e o module.css
    8.3 - Na função do componente, passar por parametro {type, text, name, placeholder, handleOnChange, value, multiple}
    8.4 - A função conta com uma div que engloba as tags de label e input. Essas tags receberão os paramêtros

9 - Trabalhando na página de Cadastro (Register.js)
    9.1 - Importar o component Input.js
    9.2 - Inserir os inputs necessários para o registro passando os valores dos parametros
    9.3 - Criar função handleChange
        9.3.1 - Receber os dados digitados nos input (utilizar o spread operator)
    9.4 - Criar um Form.module.css para estilar forms em geral
    9.5 - Criar função handleSubmit
    9.6 - Criar um helper na pasta utils para exportar a url da api (api.js)
    9.7 - Criar hook para fazer a autenticação do user
        9.7.1 - Criar arquivo useAuth.js na pasta hooks
        9.7.2 - Importar api.js, useState, useEffect, useNavigate
        9.7.3 - Exportar a função useAuth. Dentro destas funções haverá outras funções que serão utilizadas
        9.7.4 - Criar função async register(user)
        9.7.5 - Com o trycatch executar a chamada ajax e mandar via post o user cadastrado (utilizar a função api passando a rota criada no back e o objeto user), armazenar numa variavel
        9.7.6 - Utilizar promises para dar prosseguimento a função (then)
        9.7.7 - Retornar a função register
    9.8 - Criar o UserContext.js na pasta context
    9.9 - Retornar ao Register.js, importar o Context, fazer o destructuring da função register e utilizá-la no handleSubmit
    9.10 - Importar o UserProvider no App.js

10 - Trabalhando com o hook de flash message

    10.1 - Criar arquivo bus.js no utils e importar o EventEmitter do event, exportar new EventEmitter()
    10.2 - Criar hook useFlashMessage
        10.2.1 - Importar o arquivo bus
        10.2.2 - Criar função de exportação useFlashMessage
        10.2.3 - Criar função setFlashMessage para disparar a flash message
        10.2.4 - Retornar a função setFlashMessage






    





    
    
    



