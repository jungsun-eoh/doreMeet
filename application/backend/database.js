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

pool.query(`SELECT * FROM users`, (err, result, fields) =>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});

pool.query(todb,  (error, result) =>{
    return console.log(result);
});

pool.query(`INSERT INTO users (first_name, art_category) VALUES ("June", "Music")`, (err, result) => {
    if (err) {
        return console.log(err);
    }
    return console.log("Insert user!");
    
    res.send(result);
});


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


module.exports = pool;
