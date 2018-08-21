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

let userInput = process.argv[2];

knex.select('first_name', 'last_name')
.from('famous_people')
.where('first_name', userInput)
.orWhere('last_name', userInput)
.asCallback(function(err, rows) {
  if (err) return console.error(err);
  console.log(rows);
  knex.destroy();
});