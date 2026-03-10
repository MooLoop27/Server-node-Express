const express = require('express')
const router = express.Router()
const db = require('../db/db')


router.get('/', (request, response) => {

    const sql = "SELECT * FROM students"

    db.query(sql, (error, result) => {
        if (error) {
            return response.status(500).send({
                message: 'DB Error',
                error: error
            })
        }

        response.send({
            message: 'students found',
            data: result
        })
    })

})

router.get('/:id', (request, response) => {

    const id = request.params.id
    const sql = "SELECT * FROM students WHERE id = ?"

    db.query(sql, [id], (error, result) => {

        if (error) {
            return response.status(500).send({
                message: 'DB Error',
                error: error
            })
        }

        if (result.length === 0) {
            return response.status(404).send({
                message: 'student is not found',
                data: null
            })
        }

        response.send({
            message: 'student is found',
            data: result
        })

    })

})

router.post('/', (request, response) => {

    const {name, class_room, major} = request.body

    const sql = "INSERT INTO students (name, class_room, major) VALUES (?, ?, ?)"

    db.query(sql, [name, class_room, major], (error, result) => {

        if (error) {
            return response.status(500).send({
                message: 'DB Error',
                error: error
            })
        }

        response.send({
            message: 'student is created',
            data: {id: result.insertId, name, class_room, major}
        })

    })

})

router.put('/:id', (request, response) => {

    const id = request.params.id
    const {name, class_room, major} = request.body

    const sql = "UPDATE students SET name = ?, class_room = ?, major = ? WHERE id = ?"

    db.query(sql, [name, class_room, major, id], (error, result) => {

        if (error) {
            return response.status(500).send({
                message: 'DB Error',
                error: error
            })
        }

        response.send({
            message: 'student updated',
            data: {id, name, class_room, major}
        })

    })

})

router.delete('/:id', (request, response) => {

    const id = request.params.id

    const sql = "DELETE FROM students WHERE id = ?"

    db.query(sql, [id], (error, result) => {

        if (error) {
            return response.status(500).send({
                message: 'DB Error',
                error: error
            })
        }

        response.send({
            message: 'student deleted'
        })

    })

})


module.exports = router