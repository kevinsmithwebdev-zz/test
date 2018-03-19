const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const router = express.Router();

router.post('/register', (req, res, next) => {
  Account.register(new Account({ username : req.body.username }), req.body.password, (err, account) => {
    if (err) {
      return res.status(201).json({ error : err.message });
    }

    passport.authenticate('local')(req, res, () => {
      req.session.save((err) => {
        if (err) {
          return next(err);
        }
        res.status(200).json({ msg: "registered", user: account });
      });
    });
  });
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  req.session.save((err) => {
    if (err) {
      return next(err);
    }
    console.log('req.session', req.session)
    console.log('req.user', req.user)
    res.session = { cookie: req.session.cookie }
    res.cookie('userid', req.user._id, { maxAge: 2592000000 });
    res.status(200).json({ msg: "logged in", user: req.user });
  });
});

router.get('/logout', (req, res, next) => {
  req.logout();
  req.session.save((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ msg: "logged out" });
  });
});

router.get('/ping', (req, res) => {
  res.status(200).send("pong!");
});

router.get("/unprotected", (req, res) => {
  console.log('\n\n**** req.cookies', req.cookies, '\n\n')
  console.log('\n\n**** req.session', req.session, '\n\n')
  res.json({ data: "Anyone can see uprotected route." })
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.sendStatus(401);
}

router.get('/protected', isLoggedIn, function(req, res) {
  console.log('in auth')
  res.json({ data: "Success! This is the protected data!" })
});

module.exports = router;
