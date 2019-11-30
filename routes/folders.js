const express = require('express')
const router = express.Router()
const logger = require('../src/logger')
const FoldersService = require('../services/folders')
const xss = require('xss')

router.use(express.json())

router.get('/folder/:id', (req, res, next) => {
    const db = req.app.get('db');
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            error: 'Please include an ID in the request body'
        })
    }

    FoldersService.getNoteById(db, id)
        .then(note => {
            if (!note) {
                return res.status(404).json({
                    error: 'There was no note found.'
                })
            }
            return note;
        })
        .then(note => {
            return FoldersService.getFolderById(db, note.folder_id)
                .then(folder => {
                    if (!folder) {
                        return res.status(404).json({
                            error: 'There was no folder found.'
                        })
                    }
                    return res.status(200).json({
                        name: xss(folder.name)
                    })
                })
        })
})

router.get('/:id', (req, res, next) => {
    const knexInstance = req.app.get('db')
    FoldersService.getFolderById(knexInstance, req.params.id)
        .then(folder => {
            res.json({
                id: folder.id,
                name: xss(folder.name),
            })
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    const db = req.app.get('db');
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            error: 'Please include a folder name in your request body.'
        })
    }

    const newFolder = {
        name: name
    }

    FoldersService.postNewFolder(db, newFolder)
        .then(folder => {
            return res.status(201).json(folder)
        })
})

router.get('/', (req, res, next) => {
    const knexInstance = req.app.get('db')
    FoldersService.getAllFolders(knexInstance)
        .then(folders => {
            if (!folders) {
                return res.status(404).json({
                    error: 'There were no folders found.'
                })
            }
            res.json(folders)
        })
        .catch(next)
})

module.exports = router