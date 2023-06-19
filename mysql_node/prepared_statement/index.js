const express = require("express")
const exphbs = require("express-handlebars")
const pool = require('./db/conn')

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

    const query = `insert into books (??, ??) values (?, ?)`
    const data = ['title', 'pageqty', title, pageqty]

    pool.query(query, data, (err) => {
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

    pool.query(query, (err, data) => {
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

    const query = `select * from books where ?? = ?`
    const data = ['id', id]

    pool.query(query, data, (err, data) => {
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

    const query = `select * from books where ?? = ?`
    const data = ['id', id]

    pool.query(query, data, (err, data) => {
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

    const query = `update books set ?? = ?, ?? = ? where ?? = ?`
    const data = ['title', title, 'pageqty', pageqty, 'id', id]

    pool.query(query, data, (err) => {
        if(err){
            console.log(err);
            return
        }

        res.redirect('/books')
    })
})

app.get('/book/delete/:id', (req, res) => {
    const id = req.params.id

    const query = `delete from books where ?? = ?`
    const data = ['id', id]

    pool.query(query, data, (err, data) => {
        if(err){
            console.log(err);
            return
        }
        res.redirect('/books')
    })
})


app.listen(3000, ()=>{
    console.log("Aplicativo rodando");
})

