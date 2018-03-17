const express = require('express')
const passport = require("passport")

const router = express.Router()

const authentication = require('../config/authentication')

router.get("/unprotected", (req, res) => {
  console.log('cookies', req.cookies)
  res.json({ data: "Anyone can see uprotected route." })
})

router.get('/protected',
  authentication.ensureLoggedIn(),
  function(req, res) {
    console.log('in protected route')
    res.json({ data: "protected page" })
  });

module.exports = router
