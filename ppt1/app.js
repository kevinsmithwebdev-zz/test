/**
*Module dependencies
*/
var
  express = require('express'),
  logger = require('morgan'),
  path = require('path'),
  bParser = require('body-parser'),
  session = require('express-session'),
  cookieParser = require('cookie-parser')
  mongoose = require('mongoose'),
  mongodbStore = require('connect-mongo')(session);
//==============================================================================
/**
*Create app instance
*/
var app = express();
//==============================================================================
/**
*Module Variables
*/
var
  config = require('./config/config'),
  port = process.env.PORT || 8080,
  env = config.env,
  router = require('./routes/routes'),
  dbURL = config.dbURL;
  app.locals.errMsg = app.locals.errMsg || null;
//==============================================================================
/**
*Module Settings and Config
*/
app.set('port', port);
app.set('env', env);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


mongoose.connect(dbURL);
var db = mongoose.connection;
db.on('error', function (err) {
  console.error('There was a db connection error');
  return  console.error(err.message);
});
db.once('connected', function () {
  return console.log('Successfully connected to ' + dbURL);
});
db.once('disconnected', function () {
  return console.error('Successfully disconnected from ' + dbURL);
});
//==============================================================================
/**
*Middleware
*/
app.use(logger('dev'));
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:8080");
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(bParser.json());
// app.use(cookieParser);

app.use(bParser.urlencoded({ extended: true }));

app.use(session({secret: 'qwertyuiop123456789', resave: false,
  saveUninitialized: false, cookie: {maxAge: 1000 * 60 * 15}}));

  app.use( function (req, res, next) {
    console.log('\n********* in middle')
    console.log('\n********* req.method', req.method)
    console.log('\n********* req.url', req.url)
    console.log('\n********* req.body', req.body)

      if ( req.method === 'POST' && (req.url === '/signin'||req.url === '/login') ) {
        if ( req.body.rememberme ) {
          req.session.cookie.maxAge = 2592000000; // 30*24*60*60*1000 Rememeber 'me' for 30 days
        } else {
          req.session.cookie.expires = false;
        }
      }
      next();
    });

//==============================================================================
/**
*Routes
*/
app.use('/', router);
//==============================================================================
/**
*Export Module
*/
module.exports = app;
//==============================================================================
