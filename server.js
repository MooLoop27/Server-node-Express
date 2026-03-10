const express = require('express')
const auth = require('./middleware/auth')
const studentRoutes = require('./route/student.route')

const app = express()
const PORT = 3000
app.use(express.json())

app.get('/', (req, res) => {
    res.send({
        message: 'Hello World'
    })
})

app.post('/auth', (req, res) => {
    res.send({
        message: 'auth is success',
    })
})

app.use('/student', auth, studentRoutes)

app.get('/teacher', (req, res) => {
    res.send({
        message: 'Hello teacher'
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
