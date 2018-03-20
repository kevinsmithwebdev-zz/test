const passport = require('passport')

const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

module.exports.isLoggedIn = (req, res, next) => {
  console.log('checking auth')
  console.log(req.user)
  if (req.isAuthenticated())
    return next()
  res.sendStatus(401)
}
