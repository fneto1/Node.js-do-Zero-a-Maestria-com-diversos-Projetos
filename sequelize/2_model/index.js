const express = require("express")
const exphbs = require("express-handlebars")
const conn = require('./db/conn')

const User = require('./models/User')

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

conn.sync().then(() => {
    app.listen(3000, ()=>{
        console.log("Aplicativo rodando");
    })
}).catch(err => console.log(err))

