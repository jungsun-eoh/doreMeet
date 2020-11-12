const { query, json } = require("express");
const express = require("express");
const app = express();
const port = 5000;
const mysql = require('mysql');
const fileUpload = require('express-fileupload');

const pool = mysql.createPool({
    // changed host for debug. consider changing fields
    host: "localhost",
    user: "root",
    password: "1234",
    database: "mydb",
    connectionLimit: 50,
    insecureAuth: true,
    queueLimit: 0
});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(fileUpload());

app.get("/", (req, res) => res.send("Backend simple get response"));

app.get("/searchPost", (req, res) => {
    var todb = "SELECT * FROM communityPage WHERE (post_title = '" + req.query.post_title + "' AND post_category = '" + req.query.post_category + "')";
    pool.query(todb, (error, result) => {
        res.send(result);
    })
});

app.post('/makePost', (req, res) => {
    var filepath = `/../frontend/public/assets/postImages/${req.files.file.name}`;
    req.files.file.mv(`${__dirname}${filepath}`, err => {
        var todb = "INSERT INTO communityPage (post_title, post_category, post_file)" + " VALUES ( \'" + req.body.post_title + "\', \'" + req.body.post_category + "\', \'" + req.files.file.name + "\')";
        pool.query(todb, (error, result) => {/* return res.json({ fileName: file.name, filePath: filepath }); */});
    });
});

app.listen(port, () => console.log('app listening on port ' + port));  