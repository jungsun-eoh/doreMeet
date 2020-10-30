
var express = require('express');
var router = express.Router();
const db = require('../database');

// pool.query(`INSERT INTO communityPage (post_title ,post_category) VALUES ("post4","Dance")`, (err, result) => {
//     if (err) {
//         return console.log(err);
//     }
//     return console.log("Insert user!");
// });

// pool.query(`SELECT * FROM communityPage`, (err, result, fields) =>{
//     if(err){
//         return console.log(err);
//     }
//     return console.log(result);
// });



router.get('/getAllMusic', (req, res, next) => {
    // db.query(`SELECT * FROM communityPage WHERE post_category = "Music"`, (err, result, fields) =>{
    //     if(err){
    //         return console.log(err);
    //     }
    //     return console.log(result);
    // });
    console.log("db test &&&&&&");
    
});


//pool.query(`SELECT * FROM DoreMeet.users WHERE first_name = "June"`, )

// pool.post('/createUser', (req, res, next) => {
//   console.log(req.body);
//   let firstname = req.body.first_name;
//   let artCategory = req.body.art_category;

//   let baseSQL = 'INSERT INTO users (first_name, art_category) VALUES (?,?)';

//   db.query(baseSQL, [firstname, artcategory])
//       .then(([results, fields]) => {
//           if(results && results.affectedRows) {
//               res.send('user was made');
//           } else {
//               res.send('user was not made');
//           }
//       })
//       .catch((err) => {
//           next(err);
//       })
// });
module.exports = router;