/**
*Module dependencies
*/
var
  express = require('express'),
  passport = require('../config/passport'),
  utilities = require('../models/utilities');
//==============================================================================
/**
*Create router instance
*/
var router = express.Router();
//==============================================================================
/**
*Module Variables
*/
//needed to protect the '/dashboard' route
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/login');
}

var
  errHandler = utilities.errHandler,
  validationErr = utilities.validationErr,
  cr8NewUser = utilities.cr8NewUser,
  findUser = utilities.findUser,
  viewAllUsers = utilities.viewAllUsers,
  updateUser = utilities.updateUser,
  deleteUser = utilities.deleteUser;
//==============================================================================
/**
*Middleware
*/
router.use(passport.initialize());
router.use(passport.session());
//==============================================================================
/**
*Routes
*/
//---------------------------Test route-----------------------------------------
router.get('/test', function (req, res) {
  return res.send('<marquee><h1>Welcome to the test page</h1></marquee>');
});

//*************

router.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    if (!user) {
      return res.status(409).render('pages/login', {errMsg: info.errMsg});
    }
    req.login(user, function(err){
      if(err){
        console.error(err);
        return next(err);
      }
      return res.redirect('/dashboard');
    });
  })(req, res, next);
});

//*************

router.post('/signup', function(req, res, next) {
  passport.authenticate('local-signup', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    if (!user) {
      return res.status(409).json({ msg: 'couldn\'t sign up' });
    }
    req.login(user, function(err){
      if(err){
        console.error(err);
        return next(err);
      }
      // To Write a Cookie
      console.log('cookies')
      res.set('set-cookie', 'pie=delicious')
      res.json({ msg: 'signed up' });
    });
  })(req, res, next);
});

//*************

router.get('/dashboard', isLoggedIn, function (req, res) {
  return res.render('pages/dashboard', {
    username: req.user.username,
    email: req.user.email
    });
});

//*************

router.get('/logout', function (req, res) {
  req.logout();
  req.session.destroy();
  return res.status(200).json({ msg: "logged out" });
});

//*************

module.exports = router;
//==============================================================================
