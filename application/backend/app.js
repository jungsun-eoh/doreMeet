
var express = require('express');
//var mysql = require('mysql');
// var session = require("express-session");
// var mysqlStore = require("express-mysql-session")(session);
var app = express();
var usersRouter = require("./routes/users");

app.get("/", function(req, res){
    res.send("Welcome to database");
});

app.use("/users", usersRouter);

// app.get("/DoreMeet", function(req, res){
//     res.send(App());
// });

// var sessionStore = new mysqlStore({/* using default option*/}, require('/database'));



//     pool.query(`INSERT INTO users (first_name, art_category) VALUES ("June", "Music")`, (err, result) => {
//     if (err) {
//         return console.log(err);
//     }
//     console.log("Insert user!");
    
//     res.send(result);
// });


// app.get("/insert", (req, res) => {
//     pool.query('INSERT INTO name (first_name, art_category) VALUES ("June", "Music")', (err, result) => {
//         if (err) {
//             return console.log(err);
//         }
//         console.log("Insert user!");

//         res.send(result);
//     })
// })


const server = app.listen(5000, function(){
// consider change your port to 3306 if you get bug
    console.log("connected to port 3306");
})

module.exports = app;