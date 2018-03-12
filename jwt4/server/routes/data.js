const express = require('express')
const authorization = require('../config/authorization')
var passport = require("passport");

const router = express.Router()

router.get("/", function(req, res) {
  res.json({data: "Anyone can see uprotected route!"});
});

router.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
  res.json({data: "Success! This is the secret data!"});
});

router.get("/secretDebug",
  function(req, res, next){
    console.log(req.get('Authorization'));
    next();
  }, function(req, res){
    res.json("debugging");
});

module.exports = router
