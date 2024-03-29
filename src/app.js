require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const errorHandler = require('./errorHandler')
const foldersRoute = require('../routes/folders')
const notesRouter = require('../routes/notes')

const app = express()

const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common'

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.use('/api/folders', foldersRoute)
app.use('/api/notes', notesRouter)

app.get('/', (req, res, next) => {
    res.send('noteful server')
})

app.use(errorHandler)

module.exports = app