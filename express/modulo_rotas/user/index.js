const express = require("express")
const router = express.Router()
const path = require('path')

const basePath = path.join(__dirname, '../templates')

router.get('/add', (req, res) => {
    res.sendFile(`${basePath}/useForm.html`)
})

router.post('/save', (req, res) => {
    const name = req.body.name
    const age = req.body.age
    console.log(`Nome: ${name}, idade: ${age}`)
    //console.log(req.body);

    res.sendFile(`${basePath}/useForm.html`)
})

router.get('/:id', (req, res) => {
    const id = req.params.id //a partir daqui podemos realizar uma consulta numa tabela users, resgatar algo do banco de dados
    console.log(`Dados do usuário de id: ${id}`)
    res.sendFile(`${basePath}/users.html`)
})

module.exports = router