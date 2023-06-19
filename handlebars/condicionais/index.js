const express = require("express")
const exphbs = require("express-handlebars")

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/dashboard', (req, res) => {
    const items = ['Atividades', 'Histórico', 'Sair']
    res.render('dashboard', {items: items})
})

app.get('/', (req, res) => {

    const user = {
        name: "Cobra",
        age: 27
    }

    const frase = "Curso node.js"
    const auth = true

    res.render('home', {user: user, frase, auth})
})

app.listen(3000, () => console.log("App rodando na porta 3000"))