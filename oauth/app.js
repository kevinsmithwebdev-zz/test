const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')

const authRoutes = require('./routes/auth-routes')
const profileRoutes = require('./routes/profile-routes')

const passportSetup = require('./config/passport-setup')

const app = express()

// setup view engine
app.set('view engine', 'ejs')

// setup cookies
app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys: [process.env.SESSION_COOKIE_KEY]
}))

// initialize passport
app.use(passport.initialize())
app.use(passport.session())

// connect to mongo db
mongoose.connect(process.env.MONGO_DB, () => {
  console.log('connected mongo')
})

// setup routes
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)

// create home route
app.get('/', (req, res) => {
  res.render('home', { user: req.user })
})

app.listen(3000, () => {
  console.log('app now listening for requests on port 3000')
})
