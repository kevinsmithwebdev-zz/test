// should be saved in a .env file to protect
process.env.JWT_SECRET="jwtsecret"
process.env.MONGODB='mongodb://localhost/tvcpptut-jwt'
process.env.PORT=8080
// process.env.JWT_EXP = (7*24*60*60) // JWT expiration time in seconds
process.env.JWT_EXP = 900 // JWT expiration time in seconds

// *************

const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')

const authRoute = require('./routes/auth')
const dataRoute = require('./routes/data')

// *************

const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(passport.initialize())
app.use(bodyParser.json())

// routes

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
    console.log(baseUrl + "/test")
    console.log('\nOther available routes:\n')
    console.log(baseUrl + "/auth/register")
    console.log(baseUrl + "/auth/login")
    // console.log(baseUrl + "/auth/logout") // not needed with JWT?
    console.log(baseUrl + "/auth/checkjwt")
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
