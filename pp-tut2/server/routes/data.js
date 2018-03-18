const express = require('express')
const authorization = require('../config/authorization')
const passport = require("passport")

const router = express.Router()

router.get("/unprotected", (req, res) => {
  res.json({ data: "Anyone can see uprotected route." })
})

// router.get("/protected", passport.authenticate('jwt', { session: false }), (req, res) => {
//   res.json({ data: "Success! This is the protected data!" })
// })


router.get('/protected', function(req, res, next) {
  passport.authenticate('jwt', {session: false}, function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      return res.status(200).json({ data: "Denied! No data for you!" })
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ data: "Success! This is the protected data!" })
    });
  })(req, res, next);
});

module.exports = router
