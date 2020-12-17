/*
**CSC 648 Team 02 DoReMeet
**File: app.js
**Desc: Contains all backend functionality (sending/retreiving data to the database)
*/

//////////////////////////////////////////////////////////////////////////////////////////
const record = 0; //change to 1 if making lasting changes (ex. change to 1 if not testing)
//////////////////////////////////////////////////////////////////////////////////////////

const { query, json, response } = require("express");
const app = require("express")();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const mysqlStore = require("express-mysql-session")(session);
const http = require('http').createServer(app);
const port = 5000;
const mysql = require('mysql');
const fileUpload = require('express-fileupload');
const mkdirp = require('mkdirp');
const fs = require('fs');
const dir = `${__dirname}/../database/transaction.sql`;
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});
const bcrypt = require('bcrypt');
const saltRounds = 8;
//const db = require('./conf/database');

io.on('connection', (socket) => {
    socket.on('message', ({name, message}) =>{
        io.emit('message', {name, message})
    })
});


//connection credentials to the database
const pool = require('./database.js');

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

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'domremeet.team2',
      pass: 'ewgruapbcwupkbdy'
    }
  });


var bodyParser = require('body-parser');
const e = require("express");
const { createHash } = require("crypto");
app.use(cookieParser());
app.use(session(sessionOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(fileUpload());


fs.closeSync(fs.openSync(dir, 'a'));

function recordQuery(query, values) {
    values.forEach((item) => {
        query = query.replace('?', "'" + item + "'");
    })
    query = query + "\n";
    fs.appendFile(dir, query, function (err) {
        if (err){
            console.log(err)
        }else{
        console.log(query);
        }
    });
};

//Test response
app.get("/", (req, res) => res.send("Backend simple get response"));


////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
/*                                        Start of Community                                      */
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

//Searches within the communityPage table
app.get("/searchPost", (req, res) => {
    console.log(req.query);
    var queryArray = [req.query.post_title, req.query.post_category]
    var todb = 'SELECT * FROM communityPage WHERE post_title = ? AND post_category = ?;';
    pool.query(todb,queryArray ,(err, result) => {
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
        var queryArray = [req.body.post_title, req.body.post_category, req.body.post_description, req.files.file.name, 1, req.session.userId]
        var todb = 'INSERT INTO `communityPage` (`post_title`, `post_category`, `post_description`, `post_file`, `post_votes`, `user`) VALUES (?,?,?,?,1,?);'
        pool.query(todb, queryArray ,(err, result) => {
            if(err || result == ''){
                console.log(err);
                console.log("post error")
            }else{
                console.log("post pass")
                if(record){recordQuery(todb, queryArray);}
            }  /* return res.json({ fileName: file.name, filePath: filepath }); */
        });
     });
});

    // var todb = 'UPDATE communitypage SET `post_votes` = `post_votes` + 1 WHERE `comm_pg_id` = ?;'; //does not work?
app.post('/voteplus', (req,res) => {
    console.log("vote+ test " + req.body.comm_pg_id);
    var todb = 'UPDATE communitypage SET `post_votes` = `post_votes` + 1 WHERE `comm_pg_id` = ' + req.body.comm_pg_id + ';';
    pool.query(todb,req.comm_pg_id,(err, result) => {
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
    console.log("vote- test " + req.body.comm_pg_id);
    var todb = 'UPDATE `communitypage` SET `post_votes` = `post_votes` - 1 WHERE `comm_pg_id` = ' + req.body.comm_pg_id + ';';
    pool.query(todb,req.comm_pg_id,(err, result) => {
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

 //Gets top 3 voted post on the community page
 app.get("/highlights", (req, res) => {
     console.log("highlightback");
    var todb = "SELECT * FROM communityPage ORDER BY post_votes DESC LIMIT 3";
    pool.query(todb, (error, result) => {
        res.send(result);
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
/*                                        Start of Sign/Log in                                    */
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

 //Checks if the user's input has an existing row in the account table, then creates a cookie to track their login state

 //  app.post('/login', (req, res) => {
//     let username = req.body.username;
//     let password = req.body.password;
//    // let account_id;

//     var validate_user_todb = 'SELECT account_id, password FROM account WHERE username = ?;'

//     pool.query(validate_user_todb, [username] ,(err, results) => {
//         if(results && results.length == 1){
//             console.log(results);

//             let hpass = results[0].password;
//             //account_id = results[0].account_id;

//             bcrypt.compare(password, hpass, (err, result) =>{
//                 console.log(result);
//                 if (result == 1){
//                     console.log("true");
                    
//                     // var todb_check = 'SELECT account.username, latitude, longitude FROM address JOIN account ON account.account_id = address.account WHERE account.username = ?;'
//                     // pool.query = (todb_check, [username], (err, result) => {
//                     //     console.log(result);
//                     //     console.log(err);
//                     // });
                 
//                     console.log(res.redirect('/'));
//                 }
//                 else{
//                     console.log("Wrong Credential");
//                     res.send(null);
//                 } 
//         }); // bcryption
//         }
//     });
// });

//Inserts into the User and Account table
// app.post('/signup', (req, res) => {
      
//     // user table

//     var first_name = req.body.firstname;
//     var last_name = req.body.lastname;
//     var gender = req.body.gender;
//     var date_of_birth = req.body.dob;
//     var email  = req.body.email;
//     var phone_number = req.body.phone;
//     var art_category = req.body.art;
//     var art_category_tag = req.body.tag; // there is no field for tag
//     var skill_lvl = req.body.skill;
    
//     //  account table

//     var username = req.body.username;
//     var password = req.body.password;

//     // user_add table
    
//     var todb_check_email = 'SELECT * FROM user WHERE email = ?;'
//     var todb_check_username = 'SELECT* FROM account WHERE username = ?;'

//     // address table
//     var street_number = req.body.street_num;
//     var street = req.body.street;
//     var city = req.body.city;
//     var state = req.body.state;
//     var zipcode = req.body.zipcode;
//     var country = req.body.country;
//     var latitude = req.body.latitude;
//     var longitude = req.body.longitude;
   
//     // M - 12 F - 9
//     // checks for email
//     pool.query(todb_check_email, [email], (err, results) => {
//         if(results && results.length == 0){
//             // checks for username
//             pool.query(todb_check_username, [username], (err, results) => {
//                 if(results && results.length == 0){
//                     var todb_user = 'INSERT INTO user (first_name, last_name, gender, date_of_birth, email, phone_number, art_category, skill_lvl) VALUES (?,?,?,?,?,?,?,?);'
//                     pool.query(todb_user,[first_name, last_name, gender, date_of_birth, email, phone_number, art_category, skill_lvl]
//                     ,(err, result) => {
//                         var get_id = 'SELECT user_id FROM user WHERE email = ?;'
//                         pool.query(get_id, [email], (err2, result2, results) => {
//                             console.log(result2[0].user_id);
//                             user_id = result2[0].user_id; 
//                         bcrypt.hash(password, saltRounds, (err,hash) => { 
//                                 console.log(hash);
//                             var todb_account = 'INSERT INTO account (username, password, acc_created, user) VALUES (?,?,now(),?);'
//                             pool.query(todb_account,[username, hash, user_id],(err, result3) => {
//                                 if(err) throw err;
//                                 else{
//                                     console.log(result3);
//                                     var todb_address = 'INSERT INTO address (street_number, street, city, state, zipcode, country, latitude, longitude) VALUES (?,?,?,?,?,?,?,?);'
//                                     pool.query(todb_address, [street_number, street, city, state, zipcode, country, latitude, longitude], (err, result) => {
//                                         if(err) throw err;
//                                         else{
//                                             console.log(result);
//                                             // addes to user_add table
//                                             var todb_user_add = 'INSERT INTO user_add (user, address) VALUES (?,?);'
//                                             pool.query(todb_user_add, [user_id, user_id], (err, result) => {
//                                             console.log(err);
//                                             console.log(result);
                                            
//                                             // added later account_type
//                                             var general_account = "general"
//                                             var todb_account_type = 'INSERT INTO accountType (account_type_desc, account) VALUES (?,?);'
//                                             pool.query(todb_account_type, [general_account, user_id], (err, result) => {
//                                                 if (err) throw err;
//                                                 else{
//                                                     console.log(result);
//                                                 }
//                                             })
//                                             })
//                                         }
//                                     })
//                                 }  
//                             }); 
//                         });    
//                         })
//                     });
//                 }
//                 else {
//                     console.log('Username already exists!');
//                 }
//             })
//         }
//         else {
//             console.log('Email already exists!');
//         }
//     }) 
// });


/**
 * CHECK HERE FOR THE OLD LOGIN and SIGN UP codes
 * 
 * 
 * 
 */

app.post('/login', (req, res) => {
    console.log("_________loggin in with__________")
    console.log(req.body);
    var todb = "SELECT * FROM account WHERE (username = '" + req.body.username + "' AND password = '" + req.body.password + "')";
    pool.query(todb, (error, result) => { 
        console.log("____________start_______________")
        if (result == '') {
            console.log("incorrect creds");
            console.log(error);
            console.log("____________end_______________")
            res.send(null);
        } else {
            req.session.username = result[0].username;
            req.session.userId = result[0].user;
            var test = result[0].user+ "; expires=18 Dec 2021 12:00:00 UTC; path=/";
            console.log(test);
            console.log("Logged in: " + result[0].username + " " + result[0].user);
            res.send(test);
            console.log("____________end_______________")
        }
    }); // query ends here
}); // log in ends

// //Inserts into the User and Account table
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
 
 //initializes profile on signup
 app.post("/profileInit", (req, res) => {
    var email  = req.body.email;
    var get_id = 'SELECT user_id FROM user WHERE email = ?;'
    pool.query(get_id, [email], (err2, result2) => {
        console.log(result2[0].user_id);
        var user_id = result2[0].user_id;
    if(result2){
        var todb = 'INSERT INTO `file_path` (`user`) VALUES (?);'
        pool.query(todb,[user_id],(err, result4) => {
            console.log(result4);
            console.log(result2[0].user_id);
        });
    }
    });
});

app.post("/prefInit", (req, res) => {
    var email  = req.body.email;
    var get_id = 'SELECT user_id FROM user WHERE email = ?;'
    pool.query(get_id, [email], (err2, result2) => {
        console.log(result2[0].user_id);
        var user_id = result2[0].user_id;
    if(result2){
        var todb = 'INSERT INTO `preferences` (`user`) VALUES (?);'
        pool.query(todb,[user_id],(err, result4) => {
            console.log(result4);
            console.log(result2[0].user_id);
        });
    }
    });
});

 //Deletes the logged in user's cookie table to log the user out
app.post('/logout', (req, res) => {
    // console.log(req.body);
    // res.clearCookie('loginkey');
    console.log("logging out: " + req.session.userId);
    if(req.session.userId){
        req.session.destroy((error) => {
            if (error) {
                console.log("session destory error: '/logout'");
            } else {
                console.log(req.session);
                console.log("destroy cookie");
                res.clearCookie('loginkey');
                var test = "0"+ "; expires=18 Dec 2000 12:00:00 UTC; path=/";
                console.log(test);
                res.send(test);
                //res.redirect('/');                
            }
        })

    }else{
            console.log("none to destroy '/logout'");
            //res.redirect('/');
    }
})


// grab the user email to check if the Application has the account under the submitted email. 
app.post('/recoverPassword', (req,res) => {
    var email = req.body.email;
    var get_id = "SELECT user_id FROM user WHERE (email = '" + req.body.email + "')";
    pool.query(get_id, (err2, result2) => {
        if (result2 == ''){
            console.log("Have no account under the email.");
            res.send(null);
        } else {
            console.log(result2[0].user_id);
            var user_id = result2[0].user_id;
            if(result2){
                var todb = 'SELECT password FROM account WHERE account_id = ?;'
                pool.query(todb,[user_id],(err, result4) => {
                    console.log(result4);
                    console.log(result2[0].user_id);
                    console.log(result2[0].password);

                    res.send(req.session);
                });
                  var mailOptions = {
                    to: email,
                    from: 'domremeet.team2@gmail.com',
                    subject: 'DoreMeet : Password Reset',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                        'Your password: ' + result2[0].password
                        
                  };
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
                  
            }
        }
    });
})


////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
/*                                        Start of Settings                                       */
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

//Gets the user's data from the User and Account table for settings
app.get('/getUsers', (req, res) => {
    console.log(req.query.user)
    var todb = 'SELECT * FROM `account` AS A LEFT OUTER JOIN `user` AS B ON `account_id` = `user_id` WHERE `user_id` = ?';
    pool.query(todb, [req.query.user], (error, result) => {
        if (error  || result == '') {
            console.log("getuser error session: " + req.query.user);
            res.send(result);
        } else {
            console.log("getuser pass  session: " + req.query.user);
            res.send(result);
        }
    })
})
//Updates the user's information in the User and Account table
app.post('/updateUser', (req, res) => {
    console.log(req.body);
    console.log(req.session.userId);

    var todb =
        "UPDATE user SET " +
        "first_name = ?, last_name = ?, gender = ?, date_of_birth = ?, email = ?, phone_number = ?, art_category = ?,  skill_lvl = ?" +
        "WHERE user_id = ?;";
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

            todb = "SELECT * FROM account WHERE (username = '" + req.body.username + "' AND password = '" + req.body.password + "')";
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

//Updates the user's match preferences in User and Preference tables
app.post('/updatePreferences', (req, res) => {
    console.log(req.body);
    console.log(req.session.userId);

    var todb = "UPDATE preferences SET min_age = ?, max_age = ?, gender = ?,  skill_lvl_pref = ?, meeting_pref = ? WHERE user = ?;";
    pool.query(todb, [req.body.min_age, req.body.max_age, req.body.gender,  req.body.skill_lvl_pref, req.body.meeting_pref , req.session.userId], (error, result) => {
        if (error) {
            console.log(error);
            console.log("update pref error");
        } else {
            var todb =
            "UPDATE user SET " +
            "art_category = ?,  skill_lvl = ?" +
            "WHERE user_id = ?;";
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

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
/*                                        Start of Profile                                        */
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

//Gets your own profile
app.get('/getProfile', (req, res) => {

    var todb = 'SELECT * FROM `file_Path` WHERE `user` = ?';
    pool.query(todb, [req.query.user], (error, result) => {
        if (error || result == '') {
            console.log("getprofile error session: " + req.query.user);
            //res.data.join(result);
        } else {
            console.log("getprofile pass  session: " + req.query.user);
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
      
    mkdirp.sync(dir);
    var filepath = `/../frontend/public/assets/users/${req.session.userId}/${req.files.file.name}`;
    req.files.file.mv(`${__dirname}${filepath}`, err => {
        if (err) {
            console.error(err);
          }
          var todb =   
          "UPDATE file_path SET profile_pic = ?, picture_path = ? WHERE user = ?";
          queryArray = [req.files.file.name, frontpath, req.session.userId];
        pool.query(todb, queryArray,(error, result) => {
            if(error){
            console.log("upload fail");

                console.log(error);
            }else{
            console.log("upload pass");
            console.log("upload passpasspasspasspasspasspasspasspass");

            if(record){recordQuery(todb, queryArray)};
            } });
    });
});

app.get("/getCommunityPosts", (req, res) => {

    var todb = "SELECT * FROM `communityPage`  WHERE `user` = " + req.session.userId + " ORDER BY `post_votes` DESC LIMIT 3 ;"
    pool.query(todb, (error, result) => {
        res.send(result);
    });
});

//Bandaid: ideally should be in upload and flag is passed from the button on the front end, OLD, delete
app.post('/uploadMedia2', (req, res) => {
    console.log(req.files);
    console.log(req.body);
    if (req.files == null) {
        console.error("what");
        return res.status(400).json({ msg: 'No file uploaded' });
    }
    var filepath = `/../frontend/public/assets/users/${req.session.userId}/${req.files.file.name}`;
    var dir = `../frontend/public/assets/users/${req.session.userId}/`;
    
    mkdirp.sync(dir);
    req.files.file.mv(`${__dirname}${filepath}`, err => {
        if (err) {
            console.error(err);
            console.error("no move file");

        }
        flag = req.body.type;
        var todb =   "UPDATE file_path SET `" + flag + "` = ? WHERE `user` = ?;";//`` = uploadMedia1
        console.log(todb);
        queryArray = [req.files.file.name, req.session.userId]
        pool.query(todb, queryArray ,(error, result) => {
            if(error || result == ''){
                console.log("upload1 fail");
                console.log(error.sqlMessage);
            }else{
                console.log("upload1 pass");
                console.log(result);
                if(record){recordQuery(todb, queryArray)};
            } 
        });
    });
});

//Just like above, but without uploading a file
app.post('/uploadText', (req, res) => {
    console.log(req.body);
    flag = req.body.type;
    var todb =   "UPDATE `file_path` SET `" + flag + "` = ? WHERE `user` = ?;";//`` = uploadMedia1'
    queryArray = [req.body.value, req.session.userId]
    pool.query(todb, queryArray ,(error, result) => {
        if(error || result == ''){
            console.log("uploadText fail");
            console.log(error.sqlMessage);
            console.log(error.sql);

        }else{
            console.log("uploadText pass");
            // console.log(result);
            res.send(req.body.value);
            if(record){recordQuery(todb, queryArray)};
        } 
    });
});

//new media upload, replaces old media once done
app.post('/uploadMedia', (req, res) => {
    console.log("test");
    console.log(req.files);
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }
      const file = req.files.file.name;
    var filepath = `/../frontend/public/assets/users/${req.body.user}/${req.files.file.name}`;
    var dir = `../frontend/public/assets/users/${req.body.user}/`;
    var frontpath = dir.substring(dir.indexOf("/assets/")) + file;
    console.log(frontpath);

    mkdirp.sync(dir);
    var filepath = `/../frontend/public/assets/users/${req.body.user}/${req.files.file.name}`;
    req.files.file.mv(`${__dirname}${filepath}`, err => {
        if (err) {
            console.error(err);
          }
          var todb = "INSERT INTO `media2` (`file_name`, `user`) VALUES (?,?);"
        
          queryArray = [frontpath, req.body.user];
             pool.query(todb, queryArray,(error, result) => {
            if(error){
            console.log("upload fail");

                console.log(error);
            }else{
            console.log("upload pass");
            console.log("upload passpasspasspasspasspasspasspasspass");

            if(record){recordQuery(todb, queryArray)};
            } });
    });
});

//
app.get("/getMedia", (req, res) => {
    var todb = "SELECT `file_name` FROM `media2`  WHERE `user` = " + req.query.user + " ORDER BY `media2_id`DESC ;"
    console.log(req.body);
    pool.query(todb, (error, result) => {
        console.log("-=-=-=")
        console.log(req.body.user);
        console.log("medieamied");
        console.log(result);
        console.log("-=-=-=")

        res.send(result);
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
/*                                        Start of Match                                          */
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

//This gets the profile of your current match
app.post('/getProfile2', (req, res) => {
    console.log(req.body);

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
    var todb = 'SELECT art_category FROM user WHERE user_id = ?;';
    pool.query(todb,[req.session.userId] ,(err, result) => {
        if (err || result == ''){
            console.log("artCat search fail");
            console.log(err);
        }else{
            //console.log(result);
            console.log(result[0].art_category);
            var todb = 'SELECT * FROM user where art_category = ? and user_id != ?;';
            pool.query(todb,[ result[0].art_category, req.session.userId] ,(err, result) => {
                if (err || result == ''){
                    console.log(req.session.userId + " searchMatches fail");
                    res.send(err);
                }else{
                    console.log(req.session.userId + " searchMatches pass");
                    res.send(result);

                    // select query get personal lat an lng for me variable
                    // select query get lat and lng of other users for variable temp 

                    // var todb_loc = 'SELECT latitude, longitude FROM address;'
                    // pool.query(todb_loc, (err, result) => {
                    //     var temp = { lat: result[0].latitude, lng: result[0].longitude}; // calling from databse
                    //     var me = { lat: 33.788441, lng: -118.170573 }; // user location
                    //     var km = 161;

                    //     var n = InteriorPoint(temp, me, km);

                    //     if (n == 1){
                    //         console.log("Result:", n);
                    //         console.log(req.session.userId + " searchMatches pass");
                    //         res.send(result);
                    //     }else{
                    //         console.log(err);
                    //         console.log("Not in the radius");
                    //     }
                    // })
                }
            })
        }
    })
});

//Pass the current match
app.post("/pass", (req, res) => {
    var todb = 'INSERT INTO `matches2` (`user1`,`match_status`,`user2`) VALUES(?, ?, ?);'; 
    var queryArray = [req.session.userId, 0, req.body.currentMatch];
    pool.query(todb,queryArray ,(err, result) => {
        if (err || result == ''){
            console.log("pass fail");
        }else{
            console.log("pass pass");
            if(record){recordQuery(todb, queryArray)};
            res.send(result);   
        }
    })
});

//Connect on current match
app.post("/connect", (req, res) => {
    var todb = 'INSERT INTO `matches2` (`user1`,`match_status`,`user2`) VALUES(?, ?, ?);';
    var queryArray = [req.session.userId, 1, req.body.currentMatch];
    pool.query(todb,queryArray ,(err, result) => {
        if (err || result == ''){
            console.log("connect fail");
        }else{
            console.log("connect pass");
            if(record){recordQuery(todb, queryArray)};
            res.send(result);
        }
    })
});

//match_status: // 0:pass // 1:connect //
app.post("/checkMatch", (req, res) => {
    var todb = 'SELECT * FROM matches2 WHERE `user1` = ? AND `user2` = ?;';
    pool.query(todb,[req.session.userId, req.body.currentMatch] ,(err, result) => {
        if (err || result == ''){
            console.log(req.session.userId + "No match status " + req.body.currentMatch);
            res.send(result);
        }else{
            process.stdout.write(req.session.userId + " a match status exist " + req.body.currentMatch + " ");
            console.log(result);
            res.send(result);
        }
    })
});

//gets the all the users that ______ has clicked "Connect" on
app.post("/getConnected", (req, res) => {
    var connectedMatches = [];
    var todb = `SELECT user2 FROM mydb.matches2 WHERE (match_status = '1' AND user1 = ` +  req.session.userId + `);`
    pool.query(todb,  (err, result) => {
        if (err || result == ''){
            console.log("error");
        }else{
            var json =  JSON.parse(JSON.stringify(result));
            for (i = 0; i < json.length; i++) {
                connectedMatches.push(json[i].user2);
            }
            console.log("got [" + connectedMatches.length + "] connected matches: ");
            res.send(connectedMatches);
        }
    })

});

//gets the all the users that ______ has clicked "Connect" on and* has recieved a "Connect" back.
app.post("/getSuccessfulMatches", (req, res) => {
    const connectedMatches = [];
    for (var key in req.body.connectedMatches) {
        connectedMatches.push(req.body.connectedMatches[key]);
    }
    var successfulMatches = [];
    var todb = `SELECT user1 FROM mydb.matches2 WHERE (match_status = '1' AND user1 = ? AND user2 = ?)`;
    var index = 0;
    connectedMatches.forEach( function(connectedMatch) {
        pool.query(todb,[connectedMatch, req.session.userId],(err, result) => {
            if(err || result == ''){
                console.log("checking if " + connectedMatch + " connected with you..." +  req.session.userId + " false");
                index += 1;
            }else{
                console.log("checking if " + connectedMatch + " connected with you..." +  req.session.userId + " true");
                
                todb = `select distinct user.first_name, user.last_name, file_path.profile_pic , file_path.picture_path from user, file_path, matches2 where user_id = user AND user = ?`
                 pool.query(todb,connectedMatch,(err, result2) => {
                    successfulMatches.push(result2);
                    if(index >= connectedMatches.length){
                        console.log("Connected back to you: " + successfulMatches); console.log();
                        console.log(successfulMatches);
                        res.send(successfulMatches);
                    }
                });
                index += 1;
            }
        });
    });
});



function InteriorPoint(checkPoint, centerPoint, km){
        
    var ky = 40000/360;
    var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
    var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
    var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
    return Math.sqrt(dx*dx + dy*dy) <= km;
}

//this reads each line from transaction.sql and executes each query
//Note: race condition causes incorrect Id numbers (based on order in the data file)
//so will not be used atm
//
// const recordData = 0; //set this to 1 if you want to add data
// function loadData(){
// var todb = 'SELECT * FROM `matches2` WHERE `user1` = ? AND `user2` = ? AND `match_status` = ?';
// var todbValues = [0, 0, 0];
// pool.query(todb, todbValues, (err, result) => {
//     var h = 0;
//     var queryArray;
//     if (err || result == '') {
//         console.log("flag not found: executing transaction.sql");
//         fs.readFile(dir, function (err, data) {
//             if (err) console.log(err);
//             queryArray = data.toString().split("\n");
//             for (let i in queryArray) 
//             {
//                 pool.query(queryArray[i], (err, result) => {
//                     if (err || result == '') {
//                         if(err){
//                             console.log(err.sqlMessage)
//                         }
//                     }
//                     else{
//                         h+=1;
//                     }
//             });
//         }
//             console.log("Queries done: " + h);
//         });
//     } else {console.log("flag found: skipping transaction.sql");}
// })
// }
// loadData();
http.listen(port, () => console.log('app listening on port ' + port));  

