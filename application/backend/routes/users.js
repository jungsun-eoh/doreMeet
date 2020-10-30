var express = require("express");
const UserController = require('../controller/users');
var router = express.Router();

router.post("/DoreMeet", (req, resp, next) => {
    UserController.createUser(req, resp, next);
  });

module.exports = router;
