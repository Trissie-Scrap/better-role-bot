const bot = require('./bot')
const config = require('config')
const cors = require('cors')
const debug = require('debug')('brb:api')
const express = require('express')
const session = require('express-session')

const primaryRouter = require('./routes')
const decodeUserMiddleware = require('./utils/decodeUser')

const API_SECRET = config.get('api.secret')
const PORT = config.get('api.port')

const app = express()

// App wide middleware
app.use(cors())

app.use(session({
  secret: API_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(decodeUserMiddleware)

// Routes and Routers

app.get('/healthz', (req, res) => {
  res.status(200).json({
    status: 'ready for requests'
  })
})

app.use('/', primaryRouter) // Mount primary router for all requests

app.use((err, req, res, next) => {
  if (!err) next()

  debug('an error occurred handling a request to %s %s \n %O', req.method, req.originalUrl, err)

  res.status(500).json({
    moreErrorData: true // TODO: Put appropriate error info here!
  })
})

// Listen

app.listen(PORT, () => {
  debug(`listening for requests on ${PORT}`)
})
