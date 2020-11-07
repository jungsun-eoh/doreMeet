const { query, json } = require("express");
const express = require("express");
const app = express();
const port = 5000;
const mysql = require('mysql');

const pool = mysql.createPool({
    // changed host for debug. consider changing fields
    host: "localhost",
    user: "root",
    password: "root",
    database: "mydb",
    connectionLimit: 50,
    insecureAuth: true,
    queueLimit: 0
});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())



app.get("/", (req, res) => res.send("Backend simple get response"));

app.get("/searchPost", (req, res) => {
    console.log(req.query);
    var todb = "SELECT * FROM communityPage WHERE (post_title = '" + req.query.post_title + "' AND post_category = '" + req.query.post_category + "')";
    pool.query(todb,  (error, result) =>{
        res.send(result);
    })
});

app.post('/makePost', (req,res)=> {
    console.log(req.query);
    console.log(req.body);

    //INSERT INTO communityPage (post_title, post_category) VALUES (" "," ")"; 
    var todb = "INSERT INTO communityPage (post_title, post_category) VALUES ( \'" + req.body.post_title + "\', \'" + req.body.post_category + "\')"; 
    pool.query(todb,  (error, result) =>{
        return console.log(result);
    })
}); 


app.listen(port, () => console.log('app listening on port ' + port));   