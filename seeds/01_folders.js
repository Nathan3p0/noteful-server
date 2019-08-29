
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('folders').del()
    .then(function () {
      // Inserts seed entries
      return knex('folders').insert([
        {id: 1, name: 'James Method'},
        {id: 2, name: 'We Out Here'},
        {id: 3, name: 'Send It'}
      ]);
    });
};