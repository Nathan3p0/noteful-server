const knex = require('knex')
const app = require('./app')
const { PORT, NODE_ENV } = require('./config')
const knexConfig = require('../knexfile')

const db = knex(knexConfig[NODE_ENV])

app.set('db', db)

app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`)
})
