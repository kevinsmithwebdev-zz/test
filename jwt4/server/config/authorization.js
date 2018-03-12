var _ = require("lodash");
var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'tasmanianDevil';
// jwtOptions.exp = (Date.now()/1000) + 60



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

var jwt = require('jsonwebtoken');

passport.use(strategy);


module.exports.getToken = function(payload) {
  // payload.exp = Math.round(Date.now()/1000) + 60
  payload.exp = Math.round(Date.now()/1000) + parseInt(process.env.JWT_EXP)
  return jwt.sign(payload, jwtOptions.secretOrKey);
}

module.exports.getUser = function(username) {
  return users[_.findIndex(users, {username: username})];
}
