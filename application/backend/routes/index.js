var express = require('express');
var router = express.Router();
const  mysql = require('mysql');
var app = express();

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({extended:false})

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "mydb",
    connectionLimit: 50,
    port: 3306,
    insecureAuth: true,
    queueLimit: 0,   
    debug:true
});

router.get('/', function(req, res){
    res.sendFile(__dirname+'/create.html');
});

router.post('/', urlencodedParser, (req,res)=> {
    console.log(req.body);
    var todb = "INSERT INTO account (username, password) VALUES ( \"" + req.body.username + "\", \"" + req.body.password + "\")"; 
    pool.query(todb,  (error, result) =>{
        return console.log(result);
    })
    res.send("sent");
});    

pool.query(`INSERT INTO account (username, password) VALUES ("1", "2")`,  (error, result) =>{
    if (error) throw error;
    return console.log(result);
})


module.exports = router;