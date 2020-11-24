const mysql = require('mysql');

const pool = mysql.createPool({
    // changed host for debug. consider changing fields
    host: "http://13.52.247.220/",
    user: "root",
    password: "CSC648TEAM02!",
    database: "mydb",
    connectionLimit: 50,
    insecureAuth: true,
    queueLimit: 0
});

module.exports = pool;
