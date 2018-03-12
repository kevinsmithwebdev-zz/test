// should be saved in a .env file to protect
process.env.JWT_SECRET="jwtsecret"
process.env.MONGODB='mongodb://localhost/authBP'
process.env.PORT=8080
process.env.JWT_EXP = 60 // JWT expiration time in seconds

// *************

var express = require('express')
var bodyParser = require('body-parser')

var passport = require('passport')
const mongoose = require('mongoose')


const morgan = require('morgan')
const cors = require('cors')

var app = express()

app.use(morgan('tiny'))
app.use(cors())

app.use(passport.initialize())

app.use(bodyParser.urlencoded({
  extended: true
}))

// parse application/json
app.use(bodyParser.json())

// import routes
const authRoute = require('./routes/auth')
const dataRoute = require('./routes/data')
// const indexRoute = require('./routes/index')

// define routes
app.use('/auth', authRoute)
app.use('/data', dataRoute)


// *************

// start app
app.listen(process.env.PORT)
.on('listening', () => {
  console.log("\n*** server listening on port:", process.env.PORT, "\n")
})
.on('error', (err) => {
  console.error("error opening port:", process.env.PORT)
  console.error(err)
})

// start mongoose
mongoose.connect(process.env.MONGODB)
.then(
  () => {
    console.log("\n*** mongo opened:", process.env.MONGODB, '\n')
  },
  err => {
    console.error("error starting mongo:", process.env.MONGODB)
    console.error(err)
  }
)
