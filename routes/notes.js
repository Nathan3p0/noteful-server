const express = require('express')
const router = express.Router()
const logger = require('../src/logger')
const NotesService = require('../services/notes')
const xss = require('xss')

router.use(express.json())

router.get('/', (req, res, next) => {
    const knexInstance = req.app.get('db')
    NotesService.getAllNotes(knexInstance)
        .then(notes => {
            res.json(notes)
        })
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    const knexInstance = req.app.get('db')
    NotesService.getNoteById(knexInstance, req.params.id)
        .then(note => {
            res.json({
                id : note.id,
                name: xss(note.name),
                content: xss(note.content),
                folder_id: note.folder_id,
                created: note.created
            })
        })
        .catch(next)
})

module.exports = router