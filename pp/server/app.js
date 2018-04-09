const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')

const loggers = require('./logger')

const authRoute = require('./routes/auth')
const dataRoute = require('./routes/data')
const userRoute = require('./routes/user')

// *************

const app = express()

// middleware

app.use(loggers)
app.use(cors())
app.use(passport.initialize())
app.use(bodyParser.json())

// routes

app.use('/auth', authRoute)
app.use('/data', dataRoute)
app.use('/user', userRoute)

module.exports = app.listen(process.env.PORT)
