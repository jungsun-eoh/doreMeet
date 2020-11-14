const { query, json, response } = require("express");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const mysqlStore = require("express-mysql-session")(session);
const app = express();
const port = 5000;
const mysql = require('mysql');
const fileUpload = require('express-fileupload');

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

var sessionStore = new mysqlStore({/*test*/}, require('./database.js'));
var sessionOptions = {
    key: "loginkey",
    secret: "login signature",
    store: sessionStore,
    cookie: {secure: false, httpOne: false, maxAge:36000},
    resave: false,
    saveUninitialized: false
}

var bodyParser = require('body-parser');
app.use(cookieParser());
app.use(session(sessionOptions));
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
        pool.query(todb, (error, result) => {/* return res.json({ fileName: file.name, filePath: filepath }); */ });
    });
});


app.get("/recent5", (req, res) => {
    var todb = "SELECT * FROM communityPage ORDER BY comm_pg_id DESC LIMIT 5";
    pool.query(todb, (error, result) => {
        res.send(result);
    })
});
    register = e =>{
        e.preventDefault();
        axios.post('/register', this.state).then(response =>{
            console.log(response);
            console.log(this.state);
            // axios.post('/register2', response).then(response2 =>{
            // });
        })
    }
app.post('/register', (req, res) => {
    var user_id;
    console.log(req.body);
    console.log(req.body.firstname);
    var todb =
        "INSERT INTO `mydb`.`user` (`first_name`, `last_name`,`gender`,`date_of_birth`,`email`,`phone_number`,`art_category`, `skill_lvl`)" +
        "VALUES  ( \'" + req.body.firstname + "\', \'" + req.body.lastname + "\', \'" + req.body.gender + "\', \'" + req.body.dob + "\', \'" + req.body.email + "\', " + req.body.phone + ", \'" + req.body.art + "\', \'" + req.body.skill + "\')";
    pool.query(todb, (error, result) => {
        var todb = "SELECT user_id FROM `mydb`.`user` WHERE (email = '" + req.body.email + "')";
        pool.query(todb, (error2, result2) => {
            console.log(result2[0].user_id);
            user_id = result2[0].user_id;
            var todb = "INSERT INTO `mydb`.`account`(`username`,`password`,`user`) VALUES ('" + req.body.username + "\', \'" + req.body.password + "\', " + user_id + ")";
            pool.query(todb, (error, result3) => {
                console.log("123");
                console.log(result3);
            })
        });
        
    });

});

app.post('/login', (req, res) => {
    console.log(req.body);
    var todb = "SELECT * FROM `mydb`.`account`WHERE (username = '"+ req.body.username + "' AND password = '" + req.body.password + "')";
    pool.query(todb, (error, result) => {
        if(result.length == 1){
            // console.log(res.redirect('/'));
            req.session.username = result[0].username;
            req.session.userId = result[0].user;
            console.log(req.session);
            res.send(req.session);
        }else{
            console.log("incorrect creds");
        }
    })
});

app.post('/logout', (req,res) =>{
    console.log("____________________________________");
    console.log(req.session);
    console.log("____________________________________");

    req.session.destroy((error) =>{
        if (error){

            console.log("session destory error: '/logout'");
        }else{
            console.log(req.session);
            console.log("destroy cookie");
            res.clearCookie('loginkey');
            res.send(req.session);
        }
    })
})



// var todb = "SELECT * FROM communityPage ORDER BY comm_pg_id DESC LIMIT 5";
// pool.query(todb, (error, result) => {
//     console.log(result)
// })

app.listen(port, () => console.log('app listening on port ' + port));  