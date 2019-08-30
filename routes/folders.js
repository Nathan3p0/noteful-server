const express = require('express')
const router = express.Router()
const logger = require('../src/logger')
const FoldersService = require('../services/folders')
const xss = require('xss')

router.use(express.json())

router.get('/', (req, res, next) => {
    const knexInstance = req.app.get('db')
    FoldersService.getAllFolders(knexInstance)
        .then(folders => {
            res.json(folders)
        })
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    const knexInstance = req.app.get('db')
    FoldersService.getFolderById(knexInstance, req.params.id)
        .then(folder => {
            res.json({
                id : folder.id,
                name: xss(folder.name),
            })
        })
        .catch(next)
})

module.exports = router