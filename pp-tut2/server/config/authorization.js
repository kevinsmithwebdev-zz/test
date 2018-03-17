const passport = require("passport")
const passportJWT = require("passport-jwt")

const User = require('../models/user.js')

const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader()
jwtOptions.secretOrKey = 'tasmanianDevil'

const strategy = new JwtStrategy(jwtOptions, (jwtPayload, next) => {
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

module.exports.getToken = (payload) => {
  payload.exp = Math.round(Date.now()/1000) + parseInt(process.env.JWT_EXP)
  return jwt.sign(payload, jwtOptions.secretOrKey)
}
