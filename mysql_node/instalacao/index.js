const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql")

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

//create a book

app.post('/books/insertbook', (req, res) => {

    const title = req.body.title
    const pageqty = req.body.pageqty

    console.log(req.body)

    const query = `insert into books (title, pageqty) values ('${title}', '${pageqty}')`

    conn.query(query, (err) => {
        if(err){
            console.log(err);
            return
        }

        res.redirect('/books')
    })
})

//list books
app.get('/books', (req, res) => {
    const query = 'select * from books'

    conn.query(query, (err, data) => {
        if(err){
            console.log(err);
            return
        }

        const books = data

        res.render('books', {books})
    })
})

//select a book
app.get('/book/:id', (req, res) => {
    const id = req.params.id

    const query = `select * from books where id = ${id}`

    conn.query(query, (err, data) => {
        if(err){
            console.log(err);
            return
        }

        const book = data[0]

        res.render('book', {book})
    })
})

app.get('/book/edit/:id', (req, res) => {
    const id = req.params.id

    const query = `select * from books where id = ${id}`

    conn.query(query, (err, data) => {
        if(err){
            console.log(err);
            return
        }

        const book = data[0]

        res.render('editbook', {book})
    })
})

app.post('/book/updatebook', (req, res) => {

    const id = req.body.id
    const title = req.body.title
    const pageqty = req.body.pageqty

    console.log(req.body)

    const query = `update books set title = ${title}, pageqty = ${pageqty} where id = ${id}`

    conn.query(query, (err) => {
        if(err){
            console.log(err);
            return
        }

        res.redirect('/books')
    })
})

app.get('/book/delete/:id', (req, res) => {
    const id = req.params.id

    const query = `delete from books where id = ${id}`

    conn.query(query, (err, data) => {
        if(err){
            console.log(err);
            return
        }
        res.redirect('/books')
    })
})


const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodemysql"
})

conn.connect(function (err){
    if(err){
        console.log(err);
    }

    console.log('Conectou ao MySQL');

    app.listen(3000, ()=>{
        console.log("Aplicativo rodando");
    })
})


