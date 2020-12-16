/*
**CSC 648 Team 02 DoReMeet
**File: database.js
**Desc: Contains credential used to connect to the database
*/

const mysql = require('mysql');

const pool = mysql.createPool({
    // changed host for debug. consider changing fields
    host: "mydb.cxfxbt23l5bi.us-west-1.rds.amazonaws.com",
    user: "root",
    password: "CSC648TEAM02!",
    database: "mydb",
    connectionLimit: 50,
    insecureAuth: true,
    queueLimit: 0
});

module.exports = pool;
