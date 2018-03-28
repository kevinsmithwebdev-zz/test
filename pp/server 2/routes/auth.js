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
    console.log('back with user', user)
  })
  .catch(err => {
    console.log(err)
  })
  //let token = authentication.createToken({ id: user._id })
  // return res.json( { user, token, success: 'User logged in.' } )

  return res.json({ msg: "happy"})
  // const rejectLogin = () => res.status(400).json({ error: "username and/or password do/es not match"})
  //
  // let { username, password } = req.body
  //
  // if (!username || !password)
  //   return rejectLogin()
  //
  // User.getUserByUsername(username).exec()
  // .then(user => {
  //   if (!user)
  //     return rejectLogin()
  //   let pr = User.comparePassword(password, user.hash)
  //   console.log('*** pr')
  //   console.log(pr instanceof Promise)
  //   return User.comparePassword(password, user.hash)
  // })
  // .catch(err => {
  //   console.error('### error looking up userByUsername', err)
  //   return res.status(500).json({ error: 'error with DB looking up userName'})
  // })
  // .then(isMatch => {
  //   if (!isMatch)
  //     return rejectLogin()

  // })
  // .catch(err => {
  //   console.error('### error comparing passwords', err)
  //   return res.status(500).json({ error: 'error with DB looking up userName'})
  // })
})

//*************

router.get('/logout', (req, res) => {
  req.logout()
  res.status(200).send({ success: "User logged out." })
})

//*************

router.get('/checkjwt', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log('checkjwt req.user', req.user)
  res.status(200).json({ user: req.user })
})

//*************

module.exports = router
