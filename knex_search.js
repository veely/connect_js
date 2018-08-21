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


// const printData = function(data) {
//   console.log("Found %i person(s) by the name '%s':", data.length, userInput);
//   let itemNum = 1;
//   for (let row of data) {
//     console.log(itemNum + ": " + row.first_name + " " + row.last_name + ", born '" + row.birthdate + "'");
//     itemNum++;
//   }
// };

// client.connect((err) => {
//   if (err) {
//     return console.error("Connection Error", err);
//   }
//   client.query("SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text;" , [userInput], (err, result) => {
//     if (err) {
//       return console.error("error running query", err);
//     }
//     printData(result.rows);
//     client.end();
//   });
// });