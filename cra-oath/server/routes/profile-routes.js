const router = require('express').Router()

const authCheck = (req, res, next) => {
  if (!req.user)
    res.redirect('/auth/login')
  else
    next()
}

router.get('/', authCheck, (req, res) => {
  console.log('/profile/')
  console.log(req.user)
  // res.send('you are logged in, this is your profile - ' + req.user.username)
  res.render('profile', { user: req.user })
  // res.render('profile')
})

module.exports = router
