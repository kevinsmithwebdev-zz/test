const express = require('express')
const passport = require('passport')
const User = require('../models/user')

const router = express.Router()
const authorization = require('../config/authorization')

router.post('/register', (req, res) => {
  User.register(new User({ username : req.body.username }), req.body.password, (err, user) => {
    if (err)
      return res.status(201).json({ error : err.message })

    res.status(200).json({ msg: "registered", user: user })
  })
})

router.post('/login', passport.authenticate('local'), (req, res) => {
  req.session.save((err) => {
    if (err) {
      console.errer("login error", err)
      res.status(401).json({ error: "error logging in" })
    }
    res.status(200).json({ msg: "logged in", user: req.user })
  })
})

router.get('/logout', (req, res, next) => {
  req.logout() // wowsers - error handler?
  res.status(200).json({ msg: "logged out" })
})


router.get('/checksession', authorization.isLoggedIn, function(req, res) {
  console.log('in auth', req.user)
  res.status(200).json({ data: "checksession success", user: req.user })
})

module.exports = router
