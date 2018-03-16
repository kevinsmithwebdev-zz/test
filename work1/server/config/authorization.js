const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    })
  }
))


// const passport = require("passport")
// // const passportJWT = require("passport-jwt")
//
// const User = require('../models/user.js')
//
// const ExtractJwt = passportJWT.ExtractJwt
// const JwtStrategy = passportJWT.Strategy
//
// const jwtOptions = {}
// jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader()
// jwtOptions.secretOrKey = 'tasmanianDevil'
//
// const strategy = new JwtStrategy(jwtOptions, (jwtPayload, next) => {
//   User.getUserById(jwtPayload.id, (err, user) => {
//     if (err)
//       next(null, false)
//     if (user) {
//       next(null, user)
//     } else {
//       next(null, false)
//     }
//   })
// })
//
// const jwt = require('jsonwebtoken')
//
// passport.use(strategy)
//
// module.exports.getToken = (payload) => {
//   payload.exp = Math.round(Date.now()/1000) + parseInt(process.env.JWT_EXP)
//   return jwt.sign(payload, jwtOptions.secretOrKey)
// }
