/*
**CSC 648 Team 02 DoReMeet
**File: app.js
**Desc: Contains all backend functionality (sending/retreiving data to the database)
*/

//////////////////////////////////////////////////////////////////////////////////////////
const record = 0; //change to 1 if making lasting changes (ex. change to 1 if not testing)
//////////////////////////////////////////////////////////////////////////////////////////
const path = require("path");
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
const io = require('socket.io')(http);
//const db = require('./conf/database');

io.on('connection', (socket) => {
    console.log("A user has connected");
});

//connection credentials to the database
const pool = require('./database.js');

//used to track user states (logged in / logged out)
var sessionStore = new mysqlStore({/*test*/}, require('./database.js'));
var sessionOptions = {
    name:"xxxxxxxxxxxxx",
    key: "loginkey",
    secret: "login signature",
    store: sessionStore,
    httpOnly: false,
    secure: false,
    cookie: {secure: false, httpOne: false, maxAge:9000000, httpOnly: false},
    resave: false,
    saveUninitialized: false
}
//const pool = require("./database.js");

var cors = require('cors');
var bodyParser = require('body-parser');
const e = require("express");
app.use(cookieParser());
app.use(session(sessionOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(fileUpload());
//app.use(express.static(__dirname + "/../frontend/build"));
console.log(__dirname + "/../../..")
app.use(e.static(path.join(__dirname, "../../../")));
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});






app.get("/", (req, res) => res.send("Backend simple get response " + __dirname));

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
// app.get("/", (req, res) => res.send("Backend simple get response"));


////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
/*                                        Start of Community                                      */
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

//Searches within the communityPage table
app.get("/searchPost", (req, res) => {
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
app.post('/login', (req, res) => {
    console.log("_________loggin in with__________")
    console.log(req.body);
    var todb = "SELECT * FROM `mydb`.`account` WHERE (username = '" + req.body.username + "' AND password = '" + req.body.password + "')";
    pool.query(todb, (error, result) => { 
        console.log("____________start_______________")
        if (result == '') {
            console.log("incorrect creds");
            console.log(error);
            console.log("____________end_______________")
            res.send(null);
        } else {
            // console.log(res.redirect('/'));
            req.session.username = result[0].username;
            req.session.userId = result[0].user;
            console.log("Logged in: " + req.session.username + " " + req.session.userId);
            var expires = "expires=Thu, 18 Dec 2020 12:00:00 UTC;"
            var test = req.session.userId + ";" + expires + ";path=/";
            console.log(test);
            console.log("Logged in: " + req.session.username + " " + req.session.userId);
            res.send(test);
//            res.send(req.session);

            console.log("____________end_______________")
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
                res.send("done");
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
/*
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
*/
app.post('/logout', (req, res) => {

   console.log("logging out: " + req.session.userId);
                console.log(req.session);
                console.log("altering cookie to delete");
                var test = "0"+ "; expires=18 Dec 2000 12:00:00 UTC; path=/";
           console.log(test);
                res.send(test);
                //res.redirect('/');                
                 })

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
/*                                        Start of Settings                                       */
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

//Gets the user's data from the User and Account table for settings
app.get('/getUsers', (req, res) => {
console.log(req.body);

    var todb = 'SELECT * FROM `account` AS A LEFT OUTER JOIN `user` AS B ON `account_id` = `user_id` WHERE `user_id` = ?';
    pool.query(todb, [req.query.user], (error, result) => {
        if (error  || result == '') {
            console.log("getuser error session: " + req.session.userId + "|" + req.query.user);
            res.send(result);
        } else {
            console.log("getuser pass  session: " + req.session.userId + "|" + req.query.user);
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
            console.log("getprofile error session: " + req.session.userId + "|" + req.query.user);
            //res.data.join(result);
        } else {
            console.log("getprofile pass  session: " + req.session.userId + "|" + req.query.user);
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
    var todb =   "UPDATE file_path SET `" + flag + "` = ? WHERE `user` = ?;";//`` = uploadMedia1
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
    var filepath = `/../frontend/public/assets/users/${req.session.userId}/${req.files.file.name}`;
    var dir = `../frontend/public/assets/users/${req.session.userId}/`;
    var frontpath = dir.substring(dir.indexOf("/assets/")) + file;
    console.log(frontpath);

    mkdirp.sync(dir);
    var filepath = `/../frontend/public/assets/users/${req.session.userId}/${req.files.file.name}`;
    req.files.file.mv(`${__dirname}${filepath}`, err => {
        if (err) {
            console.error(err);
          }
          var todb = "INSERT INTO `media2` (`file_name`, `user`) VALUES (?,?);"
        
          queryArray = [frontpath, req.session.userId];
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
    var todb = "SELECT `file_name` FROM `media2`  WHERE `user` = " + req.session.userId + " ORDER BY `media2_id`DESC ;"
    pool.query(todb, (error, result) => {
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
    var todb = 'SELECT art_category  FROM user WHERE user_id = ?;';
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

