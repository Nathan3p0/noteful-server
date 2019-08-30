const FoldersService = {
    getAllFolders(knex) {
        return knex.select('*').from('folders')
    },
    getFolderById(knex, id) {
        return knex('folders').where('id', id).first()
    }
}

module.exports = FoldersService