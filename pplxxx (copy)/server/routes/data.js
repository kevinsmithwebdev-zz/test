const express = require('express')
// const authorization = require('../config/authorization')
const passport = require("passport")

const router = express.Router()

router.get("/unprotected", (req, res) => {
  console.log('\n\n**** req.cookies', req.cookies, '\n\n')
  res.json({ data: "Anyone can see uprotected route." })
})

router.get("/protected", passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ data: "Success! This is the protected data!" })
})


// router.get('/protected', (req, res, next) => {
//   passport.authenticate('jwt', (err, user, info) => {
//     if (err) { return next(err); }
//     console.log('user', user)
//     if (!user)
//       return res.status(200).json({ data: "Denied! No data for you!" })
//     req.logIn(user, (err) => {
//       if (err) {
//         return next(err);
//       }
//       return res.status(200).json({ data: "Success! This is the protected data!" })
//     });
//   })(req, res, next);
// });

module.exports = router
