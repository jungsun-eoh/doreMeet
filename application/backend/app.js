
const express = require('express');
const app = express();
const mysql = require('mysql');

app.get("/", function(req, res){
    res.send("Welcome to database");
});




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


const server = app.listen(3306, function(){
// consider change your port to 3306 if you get bug
    console.log("connected to port 3306");
})
