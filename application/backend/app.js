
const express = require('express');
var router = express.Router();
const app = express();
const mysql = require('mysql');

const pool = mysql.createPool({
    // changed host for debug. consider changing database name
    //host: "127.0.0.1",
    host: "localhost",
    user: "root",
    password: "1234",
    database: "DoreMeet",
    connectionLimit: 50,
    insecureAuth: true,
    queueLimit: 0
});

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({extended:false})

app.get("/", function(req, res){
    res.send("Welcome to database");
});

router.get('/searchPost', urlencodedParser, (req,res)=> {
    console.log(req.body);
    var todb = "SELECT * FROM communityPage WHERE (post_title = '" + req.body.post_title + "' AND post_category = '" + req.body.post_category + "')";
    pool.query(todb,  (error, result) =>{
        return console.log(result);
    })
});

// app.get("/insert", (req, res) => {
//     pool.query('INSERT INTO name (first_name, art_category) VALUES ("June", "Music")', (err, result) => {
//         if (err) throw err;
//             console.log("Connected!");

//         res.send(result);
//     })
// })

router.post('/makePost', urlencodedParser, (req,res)=> {
    console.log(req.body);
    const todb = "INSERT INTO account (username, password) VALUES ( "\" + req.body.username + "\", \"" + req.body.password + "\")";
    pool.query(todb,  (error, result) =>{
        return console.log(result);
    })
    res.send("sent");
});

const server = app.listen(3301, function(){
// consider change your port to 3306 if you get bug
    console.log("connected to port 3301");
})
