process.env.PORT = 8080

// ***************************************
// ***************************************
// ***************************************

const express = require('express')
const expressSession = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')

const app = express()





// ***************************************
// ***************************************
// ***************************************

app.get("/test", (req, res) => {
  res.json({ message: "Server up and running!" })
})

// start app
app.listen(process.env.PORT)
.on('listening', () => {
  console.log("server listening on port:", process.env.PORT)
})
.on('error', (err) => {
  console.error("### error opening port:", process.env.PORT)
  console.error(err)
})
