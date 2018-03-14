const express = require('express')
const authorization = require('../config/authorization')
const passport = require("passport")

const router = express.Router()

router.get("/unprotected", function(req, res) {
  res.json({ data: "Anyone can see uprotected route." })
})

router.get("/protected", passport.authenticate('jwt', { session: false }), function(req, res) {
  res.json({ data: "Success! This is the protected data!" })
})

module.exports = router
