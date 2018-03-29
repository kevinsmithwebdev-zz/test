const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')

const router = express.Router()

const authentication = require('../config/authentication')

const User = require('../models/user.js')

//*************

router.post("/login", (req, res) => {
  User.login(req.body.username, req.body.password)
  .then(user => {
    let token = authentication.createToken({ id: user._id })
    return res.status(200).json( { user, token, success: 'User logged in.' } )
  })
  .catch(err => {
    return res.status(err.status).json({ error: err.message })
  })
})

//*************

router.get('/logout', (req, res) => {
  console.log('req.user', req.user)
  req.logout()

  // wowsers - add blacklist support

  res.status(200).send({ success: "User logged out." })
})

//*************

router.get('/checkjwt', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).json({ user: req.user })
})

//*************

module.exports = router
