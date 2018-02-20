const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')

const User = require('../models/user-model')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: process.env.PP_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PP_GOOGLE_CLIENT_SECRET
  }, (accessToken, refreshToken, profile, done) => {

    // check if user already exists
    User.findOne({googleId: profile.id}).then((currentUser) => {
      if (currentUser) {
        // already have user
        done(null, currentUser)
      } else {
        // new user
        new User({
          username: profile.displayName,
          googleId: profile.id,
          thumbnail: profile._json.image.url
        }).save().then((newUser) => {
          done(null, newUser)
        })
      }
    }) // User.findOne
  }) // GoogleStrategy
)
