const express = require('express')
const expressSession = require('express-session')
const clientSessions = require("client-sessions")
const bodyParser = require('body-parser')

const morgan = require('morgan')

var app = express()

app.use(morgan('tiny'))
app.use(bodyParser.json())

app.set('trust proxy', 1) // trust first proxy
app.use(expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly : false }
}))

app.use(clientSessions({
  cookieName: 'ksSession', // cookie name dictates the key name added to the request object
  secret: 'keyboad cat', // should be a large unguessable string
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}))

app.get('/', (req, res) => {
  res.send({ msg: "root route" })
})

app.post('/login', (req, res) => {
  console.log('req.body', req.body)
  req.session.test = 127
  res.cookie('test127', { "username": "asdf" }).send()
})

app.get('/dashboard', (req, res) => {
  console.log('session.test', req.session.test)
  res.cookie('test127a', { "username": "asdfa" })
  res.send({ msg: "dashboard" })
})

process.env.PORT = 8080

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.error("### Failed to open port", process.env.PORT, "\n\n")
    console.error(err)
    process.exit(1)
  } else
    console.log('\n*** app now listening:', process.env.PORT)
})
