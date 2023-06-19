const express = require("express")
const app = express()
const path = require('path')

const port = 3000

const basePath = path.join(__dirname, 'templates')

const checkAuth = (req, res, next) => {
    req.authStatus = true

    if(req.authStatus){
        console.log("Login confirmado, pode continuar")
        next()
    } else {
        console.log("Usuário não está logado, faça login para continuar");
    }
}

app.use(checkAuth)

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log("App rodando na porta "+port);
})