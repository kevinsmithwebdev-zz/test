const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../../models/user.js');

const router = express.Router();

// remove secret data from users
// wowsers - cleanup - should subtract
const stripSecret = (user) => ({
  username: user.username,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email
})








// GET to /checksession

router.get('/checksession', (req, res) => {
  console.log(req.session.user)
  if (req.user) {
    return res.send(JSON.stringify(stripSecret(req.user)));
  }
  return res.send(JSON.stringify({}));
})














// GET to /logout
router.get('/logout', (req, res) => {
  req.logout();
  return res.send(JSON.stringify(req.user));
});







// POST to /login
router.post('/login', async (req, res) => {
  console.log('here1')
  const query = User.findOne({ email: req.body.email });
  const foundUser = await query.exec();


  // if they exist, they'll have a username, so add that to our body
  if (foundUser) { req.body.username = foundUser.username; }

  console.log('here2')
  passport.authenticate('local')(req, res, () => {
    // If logged in, we should have user info to send back
    console.log('here3')
    if (req.user) {
      console.log('here4')
      req.session.user = req.user
      req.cookie.user = req.user
      console.log('\n\n**************** login post\n\n')
      console.log(req.session)
      console.log('\n\n**************** login post\n\n')
      res.setHeader('Access-Control-Allow-Credentials', 'true')
      return res.send(JSON.stringify(stripSecret(req.user)));
    }

    console.log('here5')
    // Otherwise return an error
    return res.send(JSON.stringify({ error: 'There was an error logging in' }));
  });
});



// GET to /protected
router.get('/dashboard', (req, res) => {
  let dateObj = new Date();
  var dateStr = dateObj.toDateString();
  var timeStr = dateObj.toLocaleTimeString();
  console.log('\n\n**************** dashboard get\n\n')
  console.log(req.session)
  console.log('\n\n**************** dashboard get\n\n')

  if (!req.session.user)
    return res.status(401).json({ error: 'restricted API endpoint' })
  return res.status(200).json({ greeting: 'Welcome to secret!!!!!!!!!!', date: dateStr, time: timeStr })
})















// POST to /register
router.post('/register', (req, res) => {
  // Create a user object to save, using values from incoming JSON
  const newUser = new User(req.body);

  // Save, via Passport's "register" method, the user
  User.register(newUser, req.body.password, (err, user) => {
    // If there's a problem, send back a JSON object with the error
    if (err) {
      return res.send(JSON.stringify({ error: err }));
    }
    // Otherwise, for now, send back a JSON object with the new user's info
    return res.send(JSON.stringify(user));
  });
});

module.exports = router;
