const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});
let userInput = process.argv[2];

const printData = function(data) {
  console.log("Found %i person(s) by the name '%s':", data.length, userInput);
  let itemNum = 1;
  for (let row of data) {
    console.log(itemNum + ": " + row.first_name + " " + row.last_name + ", born '" + row.birthdate + "'");
    itemNum++;
  }
};

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text;" , [userInput], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    printData(result.rows);
    client.end();
  });
});