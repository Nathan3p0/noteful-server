const NotesService = {
    getAllNotes(knex) {
        return knex.select('*').from('notes')
    },
    getNoteById(knex, id) {
        return knex('notes').where('id', id).first()
    }
}

module.exports = NotesService