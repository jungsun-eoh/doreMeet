const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "newuser",
  password: "password"
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    // db.query("CREATE DATABASE mydb", function (err, result) {
    //   if (err) throw err;
    //   console.log("Database created");
    // });
    //??????????? getting error 
  });