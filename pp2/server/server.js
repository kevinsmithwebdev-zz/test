require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')

const authRoute = require('./routes/auth')
const dataRoute = require('./routes/data')
const userRoute = require('./routes/user')

// *************

const app = express()

// middleware

app.use(cors())
app.use(morgan('tiny'))
app.use(passport.initialize())
app.use(bodyParser.json())

// routes

app.use('/auth', authRoute)
app.use('/data', dataRoute)
app.use('/user', userRoute)

//***************************************


// starting app and DB

let runningExpress = false
let runningMongo = false

const confirmRunning = () => {
  if (runningExpress && runningMongo && process.env.MODE === 'DEV') {
    console.log("\n*** Server and DB now running. You can confirm it by checking url:\n")
    console.log(process.env.SERVER_URL + ":" + process.env.PORT + "/")
    console.log("")
  }
}

const message = () => (
  "<h1>TVC Passport Tutorial</h1>" +
  "<h2>Server running: " + true +
  "<h2>Database running: " + runningMongo +
  "<h2>Available routes:" +
  "<h3>&nbsp&nbsp" + process.env.SERVER_URL + "/auth/register</h3>" +
  "<h3>&nbsp&nbsp" + process.env.SERVER_URL + "/auth/login</h3>" +
  "<h3>&nbsp&nbsp" + process.env.SERVER_URL + "/auth/logout</h3>" +
  "<h3>&nbsp&nbsp" + process.env.SERVER_URL + "/auth/checkjwt</h3>" +
  "<br />" +
  "<h3>&nbsp&nbsp" + process.env.SERVER_URL + "/data/unprotected</h3>" +
  "<h3>&nbsp&nbsp" + process.env.SERVER_URL + "/data/protected</h3>" +
  "<br />" +
  "<h2>Happy hunting!<h2/>"
)
// test route
app.get("/", (req, res) => {
  res.send(message())
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
