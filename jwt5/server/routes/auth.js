const express = require('express')
const passport = require('passport')

const router = express.Router()

const authorization = require('../config/authorization')

const mongoose = require('mongoose')
const User = require('../models/user.js')

const sanitizeUser = user => {
  // wowser - better way to do this? remove things instead?
  return {
    username: user.username,
    zipCode: user.zipCode
  }
}

//*************

router.post("/register", function(req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ error: "username and password required"} )
  }

  let { username, password, zipCode } = req.body

  User.count({ 'username': username }, function (err, count) {

    if (err) {
      console.error('### error checking DB for user count', err)
      throw err
    }
    if (count!==0)
      return res.status(400).json({ error: "username taken" })

    var newUser = new User({
      username,
      hash: password,
      zipCode
    })

    User.createUser(newUser, function(err, user) {
      if (err) {
        console.error('### error creating user', err)
        return res.status(500).json({ error: 'error creating user' })
      }
      return res.status(200).json({ user: sanitizeUser(user) })
    })
  })
})

//*************

router.post("/login", function(req, res) {

  const rejectLogin = () => {
    res.status(400).json({ error: "username and/or password do/es not match"})
  }

  if (req.body.username && req.body.password) {
    var username = req.body.username
    var password = req.body.password
  }
  // usually this would be a database call:
  var user = User.getUserByUsername(username, (err, user) => {
    if (err) {
      console.error('### error looking up userByUsername', err)
      res.status(500).json({ error: 'error with DB looking up userName'})
    }

    if (!user)
      return rejectLogin()

    User.comparePassword(password, user.hash, function(err, isMatch) {
      console.log('\n\n$$$ in compare', isMatch, err)
      if (err) throw err;
      if (!isMatch)
        return rejectLogin()

      var payload = { id: user._id }
      var token = authorization.getToken(payload)
      res.status(200).json( { user: user, token: token } )
    })
  })
})

//*************

router.get('/logout', (req, res) => {
  req.logout()
  return res.send(JSON.stringify(req.user))
})

//*************

router.get("/", function(req, res) {
  res.json({data: "Anyone can see uprotected route!"})
})

//*************

router.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res) {
  res.json({data: "Success! This is the secret data!"})
})

//*************

module.exports = router
