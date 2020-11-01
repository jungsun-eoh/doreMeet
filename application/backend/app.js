const { query, json } = require("express");
const express = require("express");
const app = express();
const port = 5000;
const mysql = require('mysql');
const pool = mysql.createPool({
    // changed host for debug. consider changing database name
    //host: "127.0.0.1",
    host: "DataBase",
    user: "root",
    password: "root",
    database: "mydb",
    connectionLimit: 50,
    insecureAuth: true,
    queueLimit: 0
});




app.get("/", (req, res) => res.send("Backend simple get response"));


app.get("/searchPost", (req, res) => {
    console.log(req.query);
    var todb = "SELECT * FROM communityPage WHERE (post_title = '" + req.query.post_title + "' AND post_category = '" + req.query.post_category + "')";
    pool.query(todb,  (error, result) =>{
    // var parsedBody = JSON.parse(result);
    // console.log(parsedBody);
    // var post_title = parsedBody['post_title'];

        // return console.log(JSON.parse(JSON.stringify(result)));
        // res.send(result);
        res.send((JSON.parse(JSON.stringify(result))));
        
        // return res.send({post_title});
    })
});

var todb = "SELECT * FROM communityPage WHERE (post_title = 'test' AND post_category = 'cat')";
pool.query(todb,  (error, result) =>{
    return console.log(result);
})
// app.post("/makePost", (req, res) => res.send("makePost endpoint"));

// ('/s', urlencodedParser, (req,res)=> {
//     console.log(req.body);
//     var todb = "SELECT * FROM communityPage WHERE (post_title = '" + req.body.post_title + "' AND post_category = '" + req.body.post_category + "')";
//     pool.query(todb,  (error, result) =>{
//         return console.log(result);
//     })
//     res.send("search sent");
// });  


app.listen(port, () => console.log('app listening on port 5000!'));



