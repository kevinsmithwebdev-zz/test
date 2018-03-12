// should be saved in a .env file to protext
process.env.SESSION_SECRET="sessionsecret"
process.env.JWT_SECRET="jwtsecret"
process.env.MONGODB='mongodb://localhost/authBP'
process.env.PORT=8080
process.env.JWT_EXP = 60 // expiration time in seconds


var express = require("express");
var bodyParser = require("body-parser");
// var jwt = require('jsonwebtoken');

var passport = require("passport");
// var passportJWT = require("passport-jwt");
//
// var ExtractJwt = passportJWT.ExtractJwt;
// var JwtStrategy = passportJWT.Strategy;

const morgan = require('morgan')
const cors = require('cors')

// require('./config/authorization')

// var jwtOptions = {}
// jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
// jwtOptions.secretOrKey = 'tasmanianDevil';
//
// var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
//   console.log('payload received', jwt_payload);
//   // usually this would be a database call:
//   var user = users[_.findIndex(users, {id: jwt_payload.id})];
//   if (user) {
//     next(null, user);
//   } else {
//     next(null, false);
//   }
// });
//
// passport.use(strategy);

var app = express();
app.use(morgan('tiny'))
app.use(cors())
app.use(passport.initialize());

// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
  extended: true
}));

// parse application/json
app.use(bodyParser.json())

// import routes
const authRoute = require('./routes/auth')
const dataRoute = require('./routes/data')
// const indexRoute = require('./routes/index')

// define routes
app.use('/auth', authRoute)
app.use('/data', dataRoute)
// app.use('/', indexRoute)


// start app
app.listen(process.env.PORT)
.on('listening', () => {
  console.log("\n*** server listening on port:", process.env.PORT, "\n")
})
.on('error', (err) => {
  console.error("error opening port:", process.env.PORT)
  console.error(err)
})

// // start mongoose
// mongoose.connect(process.env.MONGODB)
// .then(
//   () => {
//     console.log("\n*** mongo opened:", process.env.MONGODB, '\n')
//   },
//   err => {
//     console.error("error starting mongo:", process.env.MONGODB)
//     console.error(err)
//   }
// )
