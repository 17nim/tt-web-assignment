const express = require('express')
const app = express()
const mysql = require('mysql2/promise')
// require('dotenv').config()

const port = 8000

app.get('/hello_world', (req, res) => {
    res.send('Hello, world!')
})

app.listen(port, () => {
    console.log(`The server is live! Port: ${port}`)
})

app.get('/usersdb', (req, res) => {
    mysql.createConnection({
        host: 'localhost',
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: 'tt_assignment_db'
    }).then((conn) => {
        conn
            .query('SELECT * FROM users')
            .then((results) => {
                res.json(results[0])
            })
    })
})