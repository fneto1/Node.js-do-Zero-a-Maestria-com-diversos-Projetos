const e = require("express")
const express = require("express")
const app = express()
const path = require('path')

const port = 3000

const user = require('./user')

const basePath = path.join(__dirname, 'templates')

//middleware para ler o body - uso em rotas do tipo POST
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())
//************

//middleware para chamar o conjunto de rotas
app.use('/user', user)


app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log("App rodando na porta "+port);
})