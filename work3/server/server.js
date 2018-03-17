// should be saved in a .env file to protect
process.env.MONGODB='mongodb://localhost/tvcpptut'
process.env.PORT=8080
process.env.SESSION_SECRET='changeme'



var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db');


// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});




// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());








// // const authRoute = require('./routes/auth')
// // const dataRoute = require('./routes/data')
//
// // ***************************************
// // ***************************************
// // ***************************************
//
// const mongoose = require('mongoose')
//
//
//
//
//
//
// var express = require('express');
// var passport = require('passport');
// var Strategy = require('passport-local').Strategy;
// var db = require('./db');
//
// passport.use(new Strategy(
//   function(username, password, cb) {
//     db.users.findByUsername(username, function(err, user) {
//       if (err) { return cb(err); }
//       if (!user) { return cb(null, false); }
//       if (user.password != password) { return cb(null, false); }
//       return cb(null, user);
//     });
//   }));
//
// passport.serializeUser(function(user, cb) {
//   cb(null, user.id);
// });
//
// passport.deserializeUser(function(id, cb) {
//   db.users.findById(id, function (err, user) {
//     if (err) { return cb(err); }
//     cb(null, user);
//   });
// });
//
//
//
// var app = express();
//
// app.use(require('morgan')('tiny'));
// app.use(require('cookie-parser')());
// app.use(require('body-parser').urlencoded({ extended: true }));
// app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
//
// // Initialize Passport and restore authentication state, if any, from the
// // session.
// app.use(passport.initialize());
// app.use(passport.session());
//
// // Define routes.
// app.get('/',
//   function(req, res) {
//     console.log('GET /')
//     res.send('GET /')
//   });
//
// app.post('/login',
//   passport.authenticate('local'),
//   function(req, res) {
//     console.log('POST /login')
//     res.send('POST /login')
//   });
//
//
// app.get('/logout',
//   function(req, res){
//     req.logout();
//     console.log('GET /logout')
//     res.send('GET /logout')
//   });
//
// app.get('/profile',
//   require('connect-ensure-login').ensureLoggedIn(),
//   function(req, res){
//     console.log('GET /profile')
//     res.send('GET /profile')
//   });









// Define routes.
// app.use('/auth', authRoute)
// app.use('/data', dataRoute)

// ***************************************
// ***************************************
// ***************************************

// starting app and DB

let runningExpress = false
let runningMongo = true // wowser

const confirmRunning = () => {
  const baseUrl = "http://localhost:" + process.env.PORT
  if (runningExpress && runningMongo) {
    console.log("\n*** Server and DB now running. You can confirm it by checking url:\n")
    console.log(baseUrl+ "/test")
    // console.log('\nOther available routes:\n')
    // console.log(baseUrl+ "/auth/register")
    // console.log(baseUrl+ "/auth/login")
    // console.log(baseUrl+ "/auth/logout")
    // console.log("")
    // console.log(baseUrl+ "/data/unprotected")
    // console.log(baseUrl+ "/data/protected")
    console.log("\n\n")
  }
}
console.log("\n")
// test route
app.get("/test", (req, res) => {
  res.json({ message: "Server up and running!", runningExpress, runningMongo })
})

// start app
app.listen(process.env.PORT)
.on('listening', () => {
  console.log("server listening on port:", process.env.PORT)
  runningExpress = true
  confirmRunning()
})
.on('error', (err) => {
  console.error("### error opening port:", process.env.PORT)
  console.error(err)
})

// start mongo
// mongoose.connect(process.env.MONGODB)
// .then(
//   () => {
//     console.log("mongo opened:", process.env.MONGODB)
//     runningMongo = true
//     confirmRunning()
//   },
//   err => {
//     console.error("### error starting mongo:", process.env.MONGODB)
//     console.error(err)
//   }
// )
