const express = require('express')
const passport = require('passport')

const router = express.Router()

const authorization = require('../config/authorization')

const mongoose = require('mongoose')
const User = require('../models/user.js')






router.post("/register", function(req, res) {
  console.log('in auth/register')
  if (!req.body.username || !req.body.password) {
    console.log('setting...')
    return res.status(400).json({ error: "username and password required"} )
  }

  let { username, passpord, favoriteColor } = req.body

  User.count({ 'username': username }, function (err, count) {

    if (err) {
      console.error('### error checking DB for user count', err)
      throw err
    }
    if (count!==0)
      return res.status(400).json({ error: "username taken" })


    var newUser = new User({
      username,
      passpord,
      favoriteColor
    });
    User.createUser(newUser, function(err, user) { // wowsers
      if (err) {
        console.error('### error creating user', err)
        throw err
      }

      return res.status(200).json({ user })
    })

  })



  // if (req.body.username && req.body.password) {
  //   var username = req.body.username
  //   var password = req.body.password
  // }
  // // usually this would be a database call:
  // var user = authorization.getUser(username)
  // console.log('user', user)
  // if (!user) {
  //   res.status(401).json({message:"no such user found"})
  // }
  //
  // if (user.password === req.body.password) {
  //   // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
  //   var payload = { id: user.id }
  //   var token = authorization.getToken(payload)
  //   res.json( { user: user, token: token } )
  // } else {
  //   res.status(401).json({ message: "passwords did not match" })
  // }
})

router.post("/login", function(req, res) {

  if (req.body.username && req.body.password) {
    var username = req.body.username
    var password = req.body.password
  }
  // usually this would be a database call:
  var user = authorization.getUser(username)
  console.log('user', user)
  if (!user) {
    res.status(401).json({message:"no such user found"})
  }

  if (user.password === req.body.password) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    var payload = { id: user.id }
    var token = authorization.getToken(payload)
    res.json( { user: user, token: token } )
  } else {
    res.status(401).json({ message: "passwords did not match" })
  }
})

router.get('/logout', (req, res) => {
  req.logout()
  return res.send(JSON.stringify(req.user))
})

router.get("/", function(req, res) {
  res.json({data: "Anyone can see uprotected route!"})
})

router.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res) {
  res.json({data: "Success! This is the secret data!"})
})



module.exports = router
