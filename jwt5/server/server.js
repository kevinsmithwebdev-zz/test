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

let runningExpress = false
let runningMongo = false

const confirmRunning = () => {
  if (runningExpress && runningMongo)
    console.log("\n*** Server and DB now running. You can confirm it by checking url \"http://localhost:" + process.env.PORT + "/test\" ")
}

app.get("/test", function(req, res) {
  res.json({ message: "Express up and running!", runningExpress, runningMongo })
})

// start app
app.listen(process.env.PORT)
.on('listening', () => {
  console.log("\nserver listening on port:", process.env.PORT, "\n")
  runningExpress = true
  confirmRunning()
})
.on('error', (err) => {
  console.error("### error opening port:", process.env.PORT)
  console.error(err)
})

// start mongoose
mongoose.connect(process.env.MONGODB)
.then(
  () => {
    console.log("\nmongo opened:", process.env.MONGODB, '\n')
    runningMongo = true
    confirmRunning()
  },
  err => {
    console.error("### error starting mongo:", process.env.MONGODB)
    console.error(err)
  }
)



// const processExitHandler = async (error) => {
//   await this.destroy();
//   if(error) console.log(error);
//   process.exit(error ? 1 : 0);
// };
//
// process.on('exit', processExitHandler);
// process.on('SIGINT', processExitHandler); // Catches ctrl+c
// process.on('SIGUSR1', processExitHandler); // SIGUSR1 and SIGUSR2 are for `kill pid` (ex: nodemon restart)
// process.on('SIGUSR2', processExitHandler);
// process.on('uncaughtException', processExitHandler);
