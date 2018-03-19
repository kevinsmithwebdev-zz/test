const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')

const router = express.Router()

const authentication = require('../config/authentication')

const User = require('../models/user.js')

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    console.log('in /auth/login')
    console.log(req.user)
    console.log('\n\n**** cookie\n\n',req.session.cookie)
    console.log('\n\n**** pp\n\n',req.session.passport)
    res.set({'Set-Cookie': 'appSession=' + req.session.id})
    res.json({ msg: "succesful login", user: req.user })
})


router.post('/register', (req, res) => {
  // Create a user object to save, using values from incoming JSON
  console.dir(req.body)
  console.log('post', req.body)
  const newUser = new User(req.body);

  // Save, via Passport's "register" method, the user
  User.register(newUser, req.body.password, (err, user) => {
    // If there's a problem, send back a JSON object with the error
    if (err) {
      return res.send(JSON.stringify({ error: err }));
    }
    // Otherwise, for now, send back a JSON object with the new user's info
    return res.send(JSON.stringify(user));
  });
});


router.get('/logout',
  function(req, res) {
    req.logout();

    res.json({ msg: "logged out"})
  })

router.get('/profile',
  authentication.ensureLoggedIn(),
  function(req, res) {
    res.json({ msg: "profile page ", data: "profile page " })
  })

module.exports = router
