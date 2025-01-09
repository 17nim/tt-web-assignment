const express = require('express')
const app = express()
const mysql = require('mysql2/promise')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let conn = null
const port = 8000

const initDB = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: 'tt_assignment_db'
    })
}

app.get('/hello_world', (req, res) => {
    res.send('Hello, world!')
})

app.get('/usersdb', async (req, res) => {
    try {
        const results = await conn.query('SELECT * FROM users')
        res.json(results[0])
    } catch (error) {
        console.error('Error fetching users:', error.message)
        res.status(500).json({ error: 'Error fetching users' })
    }
})

app.post('/usersdb', async (req, res) => {
    let user = req.body

    try {
        const result = await conn.query('INSERT INTO users SET ?', user)
        const userId = result[0].insertId
        res.status(201).json({ message: 'User created successfully', userId })
    } catch (error) {
        console.error('Error creating user:', error.message)
        res.status(500).json({ error: 'Error creating user' })
    }
})

app.listen(port, async () => {
    await initDB()
    console.log(`The server is live! Port: ${port}`)
})