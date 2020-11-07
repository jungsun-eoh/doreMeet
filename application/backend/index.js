var express = require('express');
var port = 3301
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

var indexRouter = require('./routes/rindex');


app.use((req, resp, next) => {
    console.info('\x1b[42m\x1b[30m Request URL : ' + req.url + '\x1b[0m');
    next();
});

app.use(logger('dev'));//echo
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
module.exports = app;


const server = app.listen(port, function(){
    console.log("connected to port " + port);
});


/*
router.get('/DoreMeet', function(req, res, next) {
    res.sendFile("../frontend/src/App.js");
});


module.exports = router;
*/