// should be saved in a .env file to protect

process.env.MONGODB='mongodb://localhost/tvcpptut'
process.env.PORT=8080
process.env.SESSION_SECRET='changeme'

//*************

var express = require('express');
const mongoose = require('mongoose')
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
const cors = require('cors')
//*************
var db = require('./db/');

const authRoute = require('./routes/auth')
const dataRoute = require('./routes/data')

//*************

passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});



//*************

// Create a new Express application.
var app = express();
// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('tiny'));
app.use(require('cookie-parser')());
// app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());

app.use(cors({ origin: 'http://localhost:3000'}))

app.use(function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(require('express-session')({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Define routes.
app.use('/auth', authRoute)
app.use('/data', dataRoute)

// ***************************************
// ***************************************
// ***************************************

// starting app and DB

let runningExpress = false
let runningMongo = false

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
mongoose.connect(process.env.MONGODB)
.then(
  () => {
    console.log("mongo opened:", process.env.MONGODB)
    runningMongo = true
    confirmRunning()
  },
  err => {
    console.error("### error starting mongo:", process.env.MONGODB)
    console.error(err)
  }
)
