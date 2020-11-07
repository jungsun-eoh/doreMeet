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
    insecureAuth: true,
    queueLimit: 0,   
    debug:true
});

router.get('/', function(req, res){
    res.sendFile(__dirname+'/create.html');
});

router.post('/makePost', urlencodedParser, (req,res)=> {
    console.log(req.body);
    var todb = "INSERT INTO communityPage (post_title, post_category) VALUES ( \"" + req.body.post_title + "\", \"" + req.body.post_category + "\")"; 
    pool.query(todb,  (error, result) =>{
        return console.log(result);
    })
    console.log("router")
});    

router.post('/', urlencodedParser, (req,res)=> {
    console.log(req.body);
    var todb = "INSERT INTO communityPage (post_title, post_category) VALUES ( \"" + req.body.post_title + "\", \"" + req.body.post_category + "\")"; 
    pool.query(todb,  (error, result) =>{
        return console.log(result);
    })
    res.send("sent");
});    

router.get('/s', function(req, res){
    res.sendFile(__dirname+'/search.html');
});

router.post('/s', urlencodedParser, (req,res)=> {
    console.log(req.body);
    var todb = "SELECT * FROM communityPage WHERE (post_title = '" + req.body.post_title + "' AND post_category = '" + req.body.post_category + "')";
    pool.query(todb,  (error, result) =>{
        return console.log(result);
    })
    res.send("search sent");
});  


// pool.query(`INSERT INTO account (username, password) VALUES ("1", "2")`,  (error, result) =>{
//     if (error) throw error;
//     return console.log(result);
// })


// pool.query(`SELECT * FROM account WHERE username = "1"`, (err, result, fields) =>{
//     if(err){
//         return console.log(err);
//     }
//     return console.log(result);
// }); 
module.exports = router;