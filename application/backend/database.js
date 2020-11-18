
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


module.exports = pool;
