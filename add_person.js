const settings = require("./settings");
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

let userInput = process.argv.slice(2);

const addPerson = function(data) {
  knex('famous_people').insert({'first_name': data[0], 'last_name': data[1], 'birthdate': data[2]})
  .asCallback(function(err, rows) {
    if (err) return console.error(err);
    knex.destroy();
  });
};

addPerson(userInput);