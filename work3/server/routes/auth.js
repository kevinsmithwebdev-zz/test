const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')

const router = express.Router()

const authentication = require('../config/authentication')

// const User = require('../models/user.js')

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    res.json({ msg: "succesful login", user: req.user
  })

})

router.get('/logout',
  function(req, res) {
    req.logout();
    res.json({ msg: "logged out"})
  })

router.get('/profile',
  authentication.ensureLoggedIn(),
  function(req, res) {
    res.json({ msg: "proifel page "})
  })

module.exports = router
