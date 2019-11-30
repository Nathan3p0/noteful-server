const FoldersService = {
    getAllFolders(knex) {
        return knex.select('*').from('folders');
    },
    getFolderById(knex, id) {
        return knex('folders').where('id', id).first();
    },
    getNoteById(knex, id) {
        return knex('notes').where('id', id).first();
    },
    postNewFolder(knex, name) {
        return knex('folders')
            .insert(name)
            .returning('*')
            .then(([folder]) => {
                return folder
            });
    }
}

module.exports = FoldersService