// should be saved in a .env file to protect
process.env.MONGODB='mongodb://localhost/tvcpptut'
process.env.PORT=8080
process.env.CLIENT_URL='http://localhost:3000'
process.env.SESSION_SECRET='changeme'

// dependencies
var express = require('express')
var morgan = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
const cors = require('cors')


var auth = require('./routes/auth')
var data = require('./routes/data')

// *************

var app = express()

app.use(morgan('tiny'))
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(bodyParser.json())
app.use(require('express-session')({
  cookie: { httpOnly: false },
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', auth)
app.use('/data', data)


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
    console.log(baseUrl + "/test")
    console.log('\nOther available routes:\n')
    console.log(baseUrl + "/auth/register")
    console.log(baseUrl + "/auth/login")
    console.log(baseUrl + "/auth/logout")
    console.log(baseUrl + "/auth/checksession")
    console.log("")
    console.log(baseUrl + "/data/unprotected")
    console.log(baseUrl + "/data/protected")
    console.log("")
  }
}

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