//módulos
const express = require("express")
const exphbs = require("express-handlebars")

//iniciando o express
const app = express()

//instanciando a conexão com o db
const conn = require('./db/conn')

//instanciando os models
const Task = require('./models/Task')

//definindo o template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//middlewares
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(
    express.json()
)

app.use(express.static('public'))

//routes
const tasksRoutes = require("./routes/tasksRoutes")

app.use('/tasks', tasksRoutes)

conn.sync()
.then(() => {
    app.listen(3000)
})
.catch((error) => console.log(error))