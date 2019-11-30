const NotesService = {
    getAllNotes(knex) {
        return knex.select('*').from('notes')
    },
    getNoteById(knex, id) {
        return knex('notes').where('id', id).first()
    },
    createNewNote(knex, note) {
        return knex.insert(note).into('notes').returning('*')
            .then(([note]) => note)
            .then(newNote => NotesService.getNoteById(knex, newNote.id))
    },
    deleteNote(knex, id) {
        return knex('notes').where('id', id).del()
            .then(note => {
                return NotesService.getAllNotes(knex)
            });
    }
}

module.exports = NotesService