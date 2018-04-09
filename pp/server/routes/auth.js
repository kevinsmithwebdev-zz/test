const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')

const router = express.Router()

const authentication = require('../config/authentication')

const User = require('../models/user.js')

const { loginSuccess, loginFailure, logoutSuccess, checkjwtSuccess } = require('../constants/api_msg')

//*************

router.post("/login", (req, res) => {
  User.login(req.body.username, req.body.password)
  .then(user => {
    let token = authentication.createToken({ id: user._id })
    return res.status(loginSuccess.code).json(loginSuccess.message(user, token))
  })
  .catch(err => {
    console.log('req.log', req.log)
    req.log = loginFailure.log('Danger Will Robinson!!!')
    req.message = loginFailure.message(err.message)
    console.log('req.log', req.log)
    console.log('req.log', req.message)
    return res.status(loginFailure.code).json(req.message)
  })
})

//*************

router.get('/logout', (req, res) => {
  req.logout()
  // wowsers - add blacklist support
  res.status(logoutSuccess.code).json(logoutSuccess.message)
})

//*************

router.get('/checkjwt', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(checkjwtSuccess.code).json(checkjwtSuccess.message(req.user))
})

//*************

module.exports = router
