const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')

const router = express.Router()

const authentication = require('../config/authentication')

const User = require('../models/user.js')

//*************

router.post("/register", (req, res) => {
  let { username, password, zipCode } = req.body

  if (!username || !password)
    return res.status(400).json({ error: "username and password required"} )

  let newUser = new User({
    username,
    zipCode
  })

  User.count({ username }).exec()
  .then(count => {
    if (count!==0)
      throw { status: 400, message: "username taken" }
    let newUser = new User({
      username,
      password,
      zipCode
    })
    return User.register(newUser, password)
  })
  .then(user => {
    return res.status(200).json({ user: user })
  })
  .catch(err => res.status(err.status || 500).json({ error: err.message }))
})

//*************

router.post('/update', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.findByIdAndUpdate(req.user.id, { $set: req.body }, { new: false })
  .then(user => {
    console.log('in update', user)
    res.status(200).json(user);
  })
  .catch(err => {
    console.error(err)
    res.status(500).json('### Error in database.')
  })
})


//*************

module.exports = router
