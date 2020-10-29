const express = require('express');
const app = express();
const mysql = require('mysql');

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "newuser",
//     password: "password"
//   });
  
//   db.connect(function(err) {
//     if (err) throw err;
//         console.log("Connected!");
//   });


app.get("/", (req, res) => res.send(
    "hella @@"
));

app.get("/insert", (req, res) => {
    db.query('INSERT INTO name (first_name, art_category) VALUES ("June", "Music")', (err, result) => {
        if (err) throw err;
            console.log("Connected!");

        res.send(result);
    })
})
//app.listen(port, () => console.log(`*****Example app listening on port ${port}!`));
app.listen(3001, () => {
    console.log("server runing")
})
