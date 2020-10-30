const  mysql = require('mysql');
const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "1234",
    database: "DoreMeet",
    connectionLimit: 50,
     insecureAuth: true,
     queueLimit: 0   
});

pool.query(`SELECT * FROM user`, (err, result, fields) =>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
});

module.exports = pool;