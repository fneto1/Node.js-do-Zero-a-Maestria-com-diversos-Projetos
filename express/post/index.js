const e = require("express")
const express = require("express")
const app = express()
const path = require('path')

const port = 3000

const basePath = path.join(__dirname, 'templates')

//middleware para ler o body - uso em rotas do tipo POST
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())
//************

app.get('/user/add', (req, res) => {
    res.sendFile(`${basePath}/useForm.html`)
})

app.post('/user/save', (req, res) => {
    const name = req.body.name
    const age = req.body.age
    console.log(`Nome: ${name}, idade: ${age}`)
    //console.log(req.body);

    res.sendFile(`${basePath}/useForm.html`)
})

app.get('/user/:id', (req, res) => {
    const id = req.params.id //a partir daqui podemos realizar uma consulta numa tabela users, resgatar algo do banco de dados
    console.log(`Dados do usuário de id: ${id}`)
    res.sendFile(`${basePath}/users.html`)
})



app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log("App rodando na porta "+port);
})