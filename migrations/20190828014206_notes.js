
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', table => {
        table.increments();
        table.string('name').notNullable();
        table.string('content').notNullable();
        table.integer('folder_id').references('folders.id').onDelete('cascade');
        table.timestamp('created').defaultTo(knex.fn.now())
    })      
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notes');
};
