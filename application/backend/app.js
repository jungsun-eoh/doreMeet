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


app.get("/", (req, res) => res.send("Backend simple get response"));

app.get("/searchPost", (req, res) => {
    console.log(req.query);
    var todb = "SELECT * FROM communityPage WHERE (post_title = '" + req.query.post_title + "' AND post_category = '" + req.query.post_category + "')";
    pool.query(todb,  (error, result) =>{
        res.send(result);
    })
});

app.listen(port, () => console.log('app listening on port ' + port));
