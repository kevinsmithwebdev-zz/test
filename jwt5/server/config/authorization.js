const passport = require("passport")
const passportJWT = require("passport-jwt")

const User = require('../models/user.js')

const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader()
jwtOptions.secretOrKey = 'tasmanianDevil'
// jwtOptions.exp = (Date.now()/1000) + parseInt(process.env.JWT_EXP)

const strategy = new JwtStrategy(jwtOptions, function (jwtPayload, next) {

  User.getUserById(jwtPayload.id, (err, user) => {
    if (err)
      next(null, false)

    if (user) {
      next(null, user)
    } else {
      next(null, false)
    }
  })
})

const jwt = require('jsonwebtoken')

passport.use(strategy)


module.exports.getToken = function(payload) {
  payload.exp = Math.round(Date.now()/1000) + parseInt(process.env.JWT_EXP)
  return jwt.sign(payload, jwtOptions.secretOrKey)
}

module.exports.getUser = function(username) {
  return users[_.findIndex(users, {username: username})]
}
