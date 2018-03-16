const express = require('express')
const authorization = require('../config/authorization')
const passport = require("passport")

const router = express.Router()

router.get("/unprotected", (req, res) => {
  res.json({ data: "Anyone can see uprotected route." })
})

// router.get("/protected", passport.authenticate('local'), (req, res) => {
//   res.json({ data: "Success! This is the protected data!" })
// })

router.get('/protected', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    console.log('in auth')
    if (err) {
      console.log(err)
      return next(err)
    }
    if (!user) {
      console.log("no user?")
      next()
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json({ msg: "YES!!!!!!" })
    })
  })(req, res, next);
});

module.exports = router
