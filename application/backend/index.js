var express = require("express");
var router = express.Router();


router.get('/DoreMeet', function(req, res, next) {
    res.sendFile("../frontend/src/App.js");
});


module.exports = router;