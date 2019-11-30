
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('folders').del()
    .then(function () {
      // Inserts seed entries
      return knex('folders').insert([
        { name: 'James Method' },
        { name: 'We Out Here' },
        { name: 'Send It' }
      ]);
    });
};