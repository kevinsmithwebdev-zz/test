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
// router.get('/google', passport.authenticate('google', { scope: ['profile']})
// )
router.get('/google', passport.authenticate('google', { scope: ['profile']}), (req, res) => {
  console.log('back from google?')
  console.log(req.user)
})

// auth with google
router.post('/google', passport.authenticate('google', {
  scope: ['profile']
}))

// auth check
router.get('/check', (req, res) => {
  console.log('GET auth/check')
  console.log(req)
  if (req.user)
    res.json({ user: req.user })
  else
    res.json({ user: 0 })

})

module.exports = router
