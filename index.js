const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})

app.post('/books/insertbook', (req, res) => {
    const titulo = req.body.titulo
    const paginas = req.body.paginas

    const sql= `INSERT INTO books (titulo, paginas) VALUES ('${titulo}', '${paginas}')`

    conn.query(sql, function(err){
        if(err) {
            console.log(err)
            return
        }

        res.redirect('/books')
    })
})

app.get('/books', (req, res) => {
    const sql = 'SELECT * FROM books'

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }

        const books = data

        console.log(books)

        res.render('books',{books})
    })
})

app.get('/books/edit/:id', (req, res) => {

    const id = req.params.id

    const sql = `SELECT * FROM books WHERE id = ${id}`

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }

        const book = data[0]
        res.render('editbook', {book})
    })

})

app.post('/books/updatedbook', (req, res) => {

    const id = req.body.id
    const titulo = req.body.titulo
    const paginas = req.body.paginas

    const sql = `UPDATE books SET titulo = '${titulo}', paginas = '${paginas}' WHERE id = ${id}`

    conn.query(sql, function(err){
        if(err){
            console.log(err)
            return
        }

        res.redirect('/books')
    })

})


app.post('/books/remove/:id', (req, res) => {

    const id = req.params.id

    const sql  = `DELETE FROM books WHERE id = ${id}`

    conn.query(sql, function(err){
        if (err){
            console.log(err)
            return
        }

        res.redirect('/books')
    })

})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root@1234',
    database: 'nodemysql',
})

app.get('/books/:id', (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM books WHERE id = ${id}`

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }

        const book = data[0]

        res.render('book', {book})
    }) 
})

conn.connect(function (err) {
    if(err){
        console.log(err)
    }

    console.log('Conectou ao MySQL')

    app.listen(3000)
})