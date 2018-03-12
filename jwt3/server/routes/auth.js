var _ = require("lodash");
const express = require('express')
// const passport = require('passport')

// require('../config/authorization')

var jwt = require('jsonwebtoken');

// const mongoose = require('mongoose')
// const User = require('../models/user.js')


var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'tasmanianDevil';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  var user = users[_.findIndex(users, {id: jwt_payload.id})];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);











const router = express.Router()




var users = [
  {
    id: 1,
    username: 'jonathanmh',
    password: '%2yx4'
  },
  {
    id: 2,
    username: 'test',
    password: 'test'
  },
  {
    id: 3,
    username: 'qwer',
    password: 'qwerqwer'
  },
  {
    id: 4,
    username: 'asdf',
    password: 'asdfasdf'
  },
  {
    id: 5,
    username: 'zxcv',
    password: 'zxcvzxcv'
  }
]




router.get("/", function(req, res) {
  res.json({data: "Anyone can see uprotected route!"});
});

router.post("/login", function(req, res) {

  console.log('auth/login', req.body)
  if(req.body.username && req.body.password){
    var username = req.body.username;
    var password = req.body.password;
  }
  // usually this would be a database call:
  var user = users[_.findIndex(users, {username: username})];
  console.log('user', user)
  if( ! user ){
    res.status(401).json({message:"no such user found"});
  }

  if(user.password === req.body.password) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    var payload = {id: user.id};
    var token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({ user: user, token: token});
  } else {
    res.status(401).json({message:"passwords did not match"});
  }
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
