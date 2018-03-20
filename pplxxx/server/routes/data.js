const express = require('express')
const authorization = require('../config/authorization')
const passport = require("passport")

const router = express.Router()

router.get("/unprotected", (req, res) => {
  res.status(200).json({ data: "Anyone can see uprotected route." })
})

router.get('/protected', authorization.isLoggedIn, function(req, res) {
  console.log('in auth')
  res.status(200).json({ data: "Success! This is the protected data!" })
})

module.exports = router
