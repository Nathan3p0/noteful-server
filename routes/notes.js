const express = require('express')
const router = express.Router()
const NotesService = require('../services/notes')
const jsonBodyParser = express.json()
const xss = require('xss')

router.delete('/:id', (req, res, next) => {
    const db = req.app.get('db');
    const { id } = req.params;

    NotesService.deleteNote(db, id)
        .then(note => {
            return res.status(200).json(note)
        })
})

router.get('/:id', (req, res, next) => {
    const knexInstance = req.app.get('db')
    NotesService.getNoteById(knexInstance, req.params.id)
        .then(note => {
            res.json({
                id: note.id,
                name: xss(note.name),
                content: xss(note.content),
                folder_id: note.folder_id,
                created: note.created
            })
        })
        .catch(next)
})

router.post('/', jsonBodyParser, (req, res, next) => {
    const { name, content, folder_id } = req.body

    for (const field of ['name', 'content', 'folder_id']) {
        if (!req.body[field]) {
            return res.status(400).json({
                error: `Please include ${field} in your request body.`
            })
        }
    }

    const newNote = {
        name: name,
        content: content,
        folder_id: folder_id
    }

    const knexInstance = req.app.get('db')
    NotesService.createNewNote(knexInstance, newNote)
        .then(note => {
            res.json({
                id: note.id,
                name: xss(note.name),
                content: xss(note.content),
                folder_id: note.folder_id,
                created: note.created
            })
        })
        .catch(next)
})

router.get('/', (req, res, next) => {
    const knexInstance = req.app.get('db')
    NotesService.getAllNotes(knexInstance)
        .then(notes => {
            res.json(notes)
        })
        .catch(next)
})

module.exports = router