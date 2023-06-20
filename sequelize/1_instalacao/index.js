const express = require("express")
const exphbs = require("express-handlebars")
const conn = require('./db/conn')

const app = express()

app.engine('handlebars', exphbs.engine())

app.set('view engine', 'handlebars') //definindo a engine padrão

app.use(express.static('public')) //para uso de assets

//config express para pegar o body
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.get('/', (req, res) => {

    res.render('home')
})

app.listen(3000, ()=>{
    console.log("Aplicativo rodando");
})

