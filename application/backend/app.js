/*
**CSC 648 Team 02 DoReMeet
**File: app.js
**Desc: Contains all backend functionality (sending/retreiving data to the database)
*/
const { query, json, response } = require("express");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const mysqlStore = require("express-mysql-session")(session);
const app = express();
const port = 5000;
const mysql = require('mysql');
const fileUpload = require('express-fileupload');
const mkdirp = require('mkdirp');
//const db = require('./conf/database');

//connection credentials to the database
const pool = mysql.createPool({
    // changed host for debug. consider changing fields
    host: "localhost",
    //host: "mydb.cxfxbt23l5bi.us-west-1.rds.amazonaws.com",
    user: "root",
    password: "CSC648TEAM02!",
    database: "mydb",
    connectionLimit: 50,
    insecureAuth: true,
    queueLimit: 0
});

//used to track user states (logged in / logged out)
var sessionStore = new mysqlStore({/*test*/}, require('./database.js'));
var sessionOptions = {
    key: "loginkey",
    secret: "login signature",
    store: sessionStore,
    cookie: {secure: false, httpOne: false, maxAge:9000000},
    resave: false,
    saveUninitialized: false
}
//const pool = require("./database.js");


var bodyParser = require('body-parser');
const e = require("express");
app.use(cookieParser());
app.use(session(sessionOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(fileUpload());

//Test response
app.get("/", (req, res) => res.send("Backend simple get response"));

//Searches within the communityPage table
app.get("/searchPost", (req, res) => {
    
    var post_title = req.query.post_title;
    var post_category = req.query.post_category;

    var todb = 'SELECT * FROM communityPage WHERE post_title = ? AND post_category = ?;';
    pool.query(todb,[post_title, post_category] ,(err, result) => {
        if (err || result == ''){
            console.log(err);
            console.log("searching fail");
            res.send(err)
        }else{
            //console.log(result);
            res.send(result);
            console.log("searching pass");
        }
        
    })
});

//Inserts into the communityPage table
app.post('/makePost', (req, res) => {
    //console.log("test");
    //console.log(req.files);
    if (req.files === null) {
        return console.log(res.status(400).json({ msg: 'No file uploaded' }));
    }
    var filepath = `/../frontend/public/assets/postImages/${req.files.file.name}`;

    req.files.file.mv(`${__dirname}${filepath}`, err => {
        var post_title = req.body.post_title;
        var post_category = req.body.post_category;
        var post_file = req.files.file.name;

        var todb = 'INSERT INTO communityPage (post_title, post_category, post_file, post_votes) VALUES (?,?,?,1);'
        pool.query(todb, [post_title, post_category, post_file] ,(err, result) => {
            if(err || result == ''){
                console.log(err);
                console.log("post error")
            }else{
                console.log("post pass")
            }  /* return res.json({ fileName: file.name, filePath: filepath }); */
        });
     });
});

app.post('/voteplus', (req,res) => {
    console.log("vote test");
    var todb = 'UPDATE communitypage SET post_votes = post_votes + 1 WHERE comm_pg_id = 1;';
    pool.query(todb,/*req.comm_pg_id,*/(err, result) => {
        if (err || result == ''){
            console.log(err);
            console.log("vote+ fail");
        }else{
            //console.log(result);
            res.send(result);
            console.log("vote+ pass");
        }
        
    })
})

app.post('/voteminus', (req,res) => {
    console.log("vote test");
    var todb = 'UPDATE communitypage SET post_votes = post_votes - 1 WHERE comm_pg_id = 1;';
    pool.query(todb,/*req.comm_pg_id,*/(err, result) => {
        if (err || result == ''){
            console.log(err);
            console.log("vote- fail");
        }else{
            //console.log(result);
            res.send(result);
            console.log("vote- pass");
        }
        
    })
})

//Retrieves the latest five entries in the communityPage table
 app.get("/recent5", (req, res) => {
     var todb = "SELECT * FROM communityPage ORDER BY comm_pg_id DESC LIMIT 5";
     pool.query(todb, (error, result) => {
         res.send(result);
     })
 });

 //Checks if the user's input has an existing row in the account table, then creates a cookie to track their login state
app.post('/login', (req, res) => {
    console.log("____________start_______________")
            console.log(req.body);
    var todb = "SELECT * FROM `mydb`.`account` WHERE (username = '" + req.body.username + "' AND password = '" + req.body.password + "')";
    pool.query(todb, (error, result) => {
    console.log("____________start_______________")

        if (result == '') {
            console.log("incorrect creds");
            console.log(error);
            console.log("____________0_______________")
            console.log(req.session);
            res.send(null);
    console.log("____________end2_______________")

        } else {
            console.log("____________start_______________")
            // console.log(res.redirect('/'));
            req.session.username = result[0].username;
            req.session.userId = result[0].user;
            console.log(req.session);
            res.send(req.session);
    console.log("____________end1_______________")

        }
    })
});

//Inserts into the User and Account table
 app.post('/signup', (req, res) => {
    console.log(req.body);

    // user table
    var first_name = req.body.firstname;
    var last_name = req.body.lastname;
    var gender = req.body.gender;
    var date_of_birth = req.body.dob;
    var email  = req.body.email;
    var phone_number = req.body.phone;
    var art_category = req.body.art;
    //var art_category_tag = req.body.tag; // there is no field for tag
    var skill_lvl = req.body.skill;
    
    //  account table
    var username = req.body.username;
    var password = req.body.password;

    var todb_user = 'INSERT INTO user (first_name, last_name, gender, date_of_birth, email, phone_number, art_category, skill_lvl) VALUES (?,?,?,?,?,?,?,?);'
    pool.query(todb_user,[first_name, last_name, gender, date_of_birth, email, phone_number, art_category, skill_lvl],(err, result) => {
        var get_id = 'SELECT user_id FROM user WHERE email = ?;'
        pool.query(get_id, [email], (err2, result2) => {
            console.log(result2[0].user_id);
            user_id = result2[0].user_id;
            var todb_account = 'INSERT INTO account (username, password, acc_created, user) VALUES (?,?,now(),?);'
            pool.query(todb_account,[username, password, user_id],(err, result3) => {
                console.log(result3);
            }); 
        })
    });
 });
 
 //Deletes the logged in user's cookie table to log the user out
app.post('/logout', (req, res) => {
    console.log("logging out: " + req.session.userId);
    if(req.session.userId){
        req.session.destroy((error) => {
            if (error) {
                console.log("session destory error: '/logout'");
            } else {
                console.log(req.session);
                console.log("destroy cookie");
                res.clearCookie('loginkey');
                res.send(req.session);
                //res.redirect('/');                
            }
        })
    }else{
            console.log("none to destroy '/logout'");
            //res.redirect('/');
    }

})

//Gets the user's data from the User and Account table for settings
app.get('/getUsers', (req, res) => {
    console.log("session: " + req.session.userId);

    var todb = 'SELECT * FROM `account` AS A LEFT OUTER JOIN `user` AS B ON `account_id` = `user_id` WHERE `user_id` = ?';
    pool.query(todb, [req.session.userId], (error, result) => {
        if (error  || result == '') {
            console.log("getuser error");
            res.send(result);
        } else {
            console.log("getuser pass");
            res.send(result);
        }
    })

})

//Updates the user's information in the User and Account table
app.post('/updateUser', (req, res) => {
    /*to be used once empty string is rejected*/
    // for (let key in req.body) {
    //     console.log(key, req.body[key]);
    // }
    console.log(req.body);
    console.log(req.session.userId);

    var todb =
        "UPDATE user SET " +
        "first_name = ?, last_name = ?, gender = ?, date_of_birth = ?, email = ?, phone_number = ?, art_category = ?,  skill_lvl = ?" +
        "WHERE user_id = ?";
    pool.query(todb, [req.body.first_name, req.body.last_name, req.body.gender, req.body.date_of_birth, req.body.email, req.body.phone_number ,req.body.art_category , req.body.skill_lvl, req.session.userId], (error, result) => {
        if (error || result == '') {
            console.log(error);
            console.log("update user error");
        } else {
            console.log("update user pass");
            var todb = "UPDATE account SET username = ? WHERE user = ? ";
            pool.query(todb, [req.body.username, req.session.userId],(error, result) => {
                if (error || result == '') {
                    console.log("update username error");
                } else {
                    console.log("update username pass");
                }
            });

            todb = "SELECT * FROM `mydb`.`account` WHERE (username = '" + req.body.username + "' AND password = '" + req.body.password + "')";
             pool.query(todb, (error, result) => {
                    if (result == '') {
                        console.log("User put incorrect password");
                        console.log(req.session);
            
                    } else {
                        todb = "UPDATE account SET password = ? WHERE user = ? ";
                        pool.query(todb, [req.body.new_password, req.session.userId],(error, result) => {
                            if (error  || result == '') {
                                console.log(error);
                                console.log("update password error");
                            } else {
                                console.log("update password pass");                                
                            }
                        });
                     }
                })
        }
    })
})

app.post('/updatePreferences', (req, res) => {

    console.log(req.body);
    console.log(req.session.userId);

    //req.session.userId
    var todb = "UPDATE preferences SET " +
        "min_age = ?, max_age = ?, gender = ?,  skill_lvl_pref = ?, meeting_pref = ?" +
        "WHERE user = ?";
    pool.query(todb, [req.body.min_age, req.body.max_age, req.body.gender,  req.body.skill_lvl_pref, req.body.meeting_pref , req.session.userId], (error, result) => {
        if (error) {
            console.log(error);
            console.log("update pref error");
        } else {
            var todb =
            "UPDATE user SET " +
            "art_category = ?,  skill_lvl = ?" +
            "WHERE user_id = ?";
            pool.query(todb, [req.body.art_category, req.body.skill_lvl, req.session.userId],(error, result) => {
                if (error || result == '') {
                    console.log("update user error");
                } else {
                    console.log("update user pass");
                }
            });
            console.log("update pref pass");
        }
    })
})

app.get('/getProfile', (req, res) => {
    console.log("____________________________________1");
    console.log("session: " + req.session.userId);
    console.log("____________________________________2");

    var todb = 'SELECT * FROM `file_Path` WHERE `user` = ?';
    pool.query(todb, [req.session.userId], (error, result) => {
        if (error || result == '') {
            console.log("getprofile error");
            //res.data.join(result);
        } else {
            console.log("getprofile pass");
            //res.data.join(result);
            res.send(result);

        }
    })

})



//Upload for profile page: incomplete
app.post('/upload', (req, res) => {
    console.log("test");
    console.log(req.files);
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }
    
      const file = req.files.file;


    var filepath = `/../frontend/public/assets/users/${req.session.userId}/${req.files.file.name}`;
    var dir = `../frontend/public/assets/users/${req.session.userId}/`;
    var frontpath = dir.substring(dir.indexOf("/assets/"));

    var test = mkdirp.sync(dir);
    req.files.file.mv(`${__dirname}${filepath}`, err => {
        if (err) {
            console.error(err);
          }
          var todb =   
          "UPDATE file_path SET profile_pic = ?, picture_path = ? WHERE user = ?";
        pool.query(todb, [req.files.file.name, frontpath, req.session.userId],(error, result) => {
            if(error || result == ''){
            console.log("upload fail");

                console.log(error);
            }else{
            console.log("upload pass");

                console.log(result);
                
            } });
    });
});

app.post('/getProfile2', (req, res) => {
    console.log("getProfile2: " + req.body);

    var todb = 'SELECT * FROM `file_Path` WHERE `user` = ?';
    pool.query(todb, [req.body.currentMatch], (error, result) => {
        if (error || result == '') {
            console.log("getprofile error");
            //res.data.join(result);
        } else {
            console.log("getprofile pass");
            // console.log(result);
            //res.data.join(result);
            res.send(result);
        }
    })
})

//Searches within the communityPage table
app.get("/searchMatches", (req, res) => {
    var art_category = 'd';
    
    var todb = 'SELECT * FROM user where art_category = ? and user_id != ?;';
    pool.query(todb,[ art_category, req.session.userId] ,(err, result) => {
        if (err || result == ''){
            console.log(req.session.userId + " searchMatches fail");
            res.send(err);
        }else{
            console.log(req.session.userId + " searchMatches pass");
            res.send(result);
        }
    })
    
});

app.post("/pass", (req, res) => {
    var todb = 'INSERT INTO `matches2` (`user1`,`match_status`,`user2`) VALUES(?, ?, ?);'; 
    pool.query(todb,[req.session.userId, 0, req.body.currentMatch] ,(err, result) => {
        if (err || result == ''){
            console.log("pass fail");
        }else{
            console.log("pass pass");
            res.send(result);
            
        }
    })
});

app.post("/connect", (req, res) => {
    var todb = 'INSERT INTO `matches2` (`user1`,`match_status`,`user2`) VALUES(?, ?, ?);';
    pool.query(todb,[req.session.userId, 1, req.body.currentMatch] ,(err, result) => {
        if (err || result == ''){
            console.log("connect fail");
        }else{
            console.log("connect pass");
            res.send(result);
            
        }
    })
});

app.post("/checkMatch", (req, res) => {
    var todb = 'SELECT * FROM matches2 WHERE `user1` = ? AND `user2` = ?;';
    pool.query(todb,[req.session.userId, req.body.currentMatch] ,(err, result) => {
        if (err || result == ''){
            console.log(req.session.userId + "checkMatch fail" + req.body.currentMatch);
            res.send(result);
            
        }else{
            console.log("checkMatch pass");
            console.log(req.session.userId + " checkMatch pass " + req.body.currentMatch);
            console.log(result);
            res.send(result);
        }
    })
});

//var user_id = req.query.userID;
// var user_id = 2;
// var art_category = 'd';

// var todb = 'SELECT * FROM user where art_category = ? and user_id != ?;';
// pool.query(todb,[ art_category, user_id] ,(err, result) => {
//     if (err || result == ''){
//         console.log("matching search fail");
//         console.log(err);
//     }else{
//         //console.log(result);
//         console.log("matching search pass");
//         result.forEach(element => {
//             console.log(element)
//         });
//     }
//     console.log("\n\n\n")
// })


//listening port
app.listen(port, () => console.log('app listening on port ' + port));  

