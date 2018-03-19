const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')

const router = express.Router()

const authorization = require('../config/authorization')

const User = require('../models/user.js')

const sanitizeUser = user => {
  // wowsers - better way to do this? remove hash and salt instead?
  return {
    username: user.username,
    zipCode: user.zipCode
  }
}

//*************

router.post("/register", (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ error: "username and password required"} )
  }

  let { username, password, zipCode } = req.body

  User.count({ 'username': username }, (err, count) => {

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

    User.createUser(newUser, (err, user) => {
      if (err) {
        console.error('### error creating user', err)
        return res.status(500).json({ error: 'error creating user' })
      }
      return res.json({ user: sanitizeUser(user) })
    })
  })
})

//*************

router.post("/login", (req, res) => {

  const rejectLogin = () => {
    res.status(400).json({ error: "username and/or password do/es not match"})
  }

  if (req.body.username && req.body.password) {
    var username = req.body.username
    var password = req.body.password
  }

  let user = User.getUserByUsername(username, (err, user) => {
    if (err) {
      console.error('### error looking up userByUsername', err)
      res.status(500).json({ error: 'error with DB looking up userName'})
    }

    if (!user)
      return rejectLogin()

    User.comparePassword(password, user.hash, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch)
        return rejectLogin()

      var payload = { id: user._id }
      var token = authorization.getToken(payload)
      res.json( { user: sanitizeUser(user), token: token } )
    })
  })
})

//*************

// wowsers - is this necessary with JWT?
// router.get('/logout', (req, res) => {
//   // req.logout()
//   return res.send(JSON.stringify(req.user))
// })

//*************

router.get('/checkjwt', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).json({ user: sanitizeUser(req.user) })
})

//*************

module.exports = router
