
const express = require('express');
const router = express.Router();
const db = require('../database');


router.get('/getAllUsers', (req, res, next) => {
    db.query('SELECT * from users;', (err, results, fields) => {
        if(err){
            next(err); 
        }
        console.log(results);
        res.send(results);
    });
});

router.post('/createUser', (req, res, next) => {
    console.log(req.body);
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    /* validate data, if bad send back response */
    // res.redirect('/registration');

    let baseSQL = 'INSERT INTO users (first_name, art_category) VALUES (?,?)';

    db.query(baseSQL, [firstname, artcategory])
        .then(([results, fields]) => {
            if(results && results.affectedRows) {
                res.send('user was made');
            } else {
                res.send('user was not made');
            }
        })
        .catch((err) => {
            next(err);
        })
});

module.exports = router;
