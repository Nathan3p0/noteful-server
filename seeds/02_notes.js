
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {name: 'Bob Dole', content: 'Funny Name', folder_id: 1},
        {name: 'James Snoopy Schultz', content: 'Teacher', folder_id: 2},
        {name: 'Nate Zee-lag', content: 'Developer', folder_id: 2}
      ]);
    });
};
