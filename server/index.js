const express = require('express')
const app = express()
const mysql = require('mysql2/promise')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

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

// Get all users
app.get('/usersdb', async (req, res) => {
    try {
        const results = await conn.query('SELECT * FROM users')
        res.json(results[0])
    } catch (error) {
        console.error('Error fetching users:', error.message)
        res.status(500).json({ error: 'Error fetching users' })
    }
})

// Add new user :D ("Add" button)
app.post('/usersdb', async (req, res) => {
    let user = req.body
    try {
        const results = await conn.query('INSERT INTO users SET ?', user)
        res.status(201).json({ message: 'User created successfully!' })
    } catch (error) {
        console.error('Error creating user:', error.message)
        res.status(500).json({ error: 'Error creating user' })
    }
})

// Get individual user (Operation button & user name in index.html)
app.get('/usersdb/:hn', async (req, res) => {
    let hn = req.params.hn
    try {
        const results = await conn.query('SELECT * FROM users WHERE hn = ?', hn)
        if (results[0].length == 0) {
            res.status(404).json({ message: 'User not found.' })
        } else {
            res.json(results[0][0])
        }
    } catch (error) {
        console.error('Error fetching user:', error.message)
        res.status(500).json({ error: 'Error fetching user' })
    }
})

// Delete user ("Delete" button)
app.delete('/usersdb/:hn', async (req, res) => {
    let hn = req.params.hn
    try {
        const results = await conn.query('DELETE FROM users WHERE hn = ?', hn)
        if (results[0].length == 0) {
            res.status(404).json({ message: 'User not found.' })
        } else {
            res.json(results[0][0])
        }
    } catch (error) {
        console.error('Error fetching user:', error.message)
        res.status(500).json({ error: 'Error fetching user' })
    }
})

app.get('/hello_world', (req, res) => {
    res.send('Hello, world!')
})

app.listen(port, async () => {
    await initDB()
    console.log(`The server is live! Port: ${port}`)
})