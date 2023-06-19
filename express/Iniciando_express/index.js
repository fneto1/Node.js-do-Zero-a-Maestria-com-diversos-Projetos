const express = require("express")
const app = express()
const path = require('path')

const port = 3000

app.get('/', (req, res) => {

    res.send('hello world')
})

app.listen(port, () => {
    console.log("App rodando na porta "+port);
})