const dotenv = require('dotenv').config()
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')

const express = require('express')
const cors = require('cors')
const expressSession = require('express-session')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('./models/user')

const index = require('./routes/index')
const api = require('./routes/api/index')
const users = require('./routes/api/users')
const auth = require('./routes/api/auth')

// Connect to Mongoose

mongoose.connect(process.env.MONGODB, { useMongoClient: true }, (err) => {
  if (err) {
    console.error("\n\n### Failed to load mongod db", process.env.MONGODB, "\n\n")
    console.error(err)
    process.exit(1)
  } else
  console.log('\n*** mongo db connected:', process.env.MONGODB)
})

mongoose.Promise = global.Promise

// start app and setup session

const app = express()

app.use(cors())


app.use(function(req, res, next) {
     res.header('Access-Control-Allow-Origin', req.headers.origin);
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
});



// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressSession({
  secret: 'asdfasdfasdf',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

// Routes

app.use('/api', api);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/*', index);

// Configure Passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.error("### Failed to open port", process.env.PORT, "\n\n")
    console.error(err)
    process.exit(1)
  } else
    console.log('\n*** app now listening:', process.env.PORT)
})
