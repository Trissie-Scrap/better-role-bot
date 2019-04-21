const bot = require('./bot')
const bodyParser = require('body-parser')
const config = require('config')
const cors = require('cors')
const debug = require('debug')('brb:api')
const express = require('express')
const session = require('express-session')

const primaryRouter = require('./routes')
const decodeUserMiddleware = require('./utils/decodeUser')
const errorHandlerMiddleware = require('./utils/errorHandler')

const API_SECRET = config.get('api.secret')
const PORT = config.get('api.port')

const app = express()

// app wide middleware
app.use(bodyParser.json())

app.use(cors({
  origin: true,
  credentials: true
}))
app.options('*', cors({
  origin: true,
  credentials: true
}))

// setup sessions
app.use(session({
  secret: API_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(decodeUserMiddleware)

// routes and routers
app.get('/healthz', (req, res) => {
  res.status(200).json({
    status: 'ready for requests'
  })
})

app.use('/', primaryRouter) // mount primary router for all requests
app.use(errorHandlerMiddleware) // clean errors for responses and log them

// Listen
app.listen(PORT, () => {
  debug(`listening for requests on ${PORT}`)
})
