const router = require('express').Router()
const passport = require('passport')

// auth login
router.get('/login', (req, res) => {
  res.render('login', { user: req.user })
})


// auth logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

// callback route for google to redirect
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  // res.redirect('/profile')

  res.json(req.user)
})
// auth with google
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}))
// auth with google
router.post('/google', passport.authenticate('google', {
  scope: ['profile']
}))

module.exports = router
