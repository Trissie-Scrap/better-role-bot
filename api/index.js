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
const whitelist = [config.get('api.frontendUrl'), config.get('api.apiUrl')]
app.use(cors({
  origin: true,
  credentials: true
}))
app.options('*', cors({
  origin: true,
  credentials: true
}))

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

// error handler
app.use((err, req, res, next) => {
  if (!err) next()

  if (err.statusCode >= 400 && err.statusCode < 500) {
    debug('%d %s %s %s', err.statusCode, req.method, req.url, err.message)

    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message
    })
  }

  debug('an error occurred handling a request to %s %s \n %O', req.method, req.originalUrl, err)
  res.status(500).json({
    status: 500,
    message: 'a server error occurred. sorry :)'
  })
})

// Listen
app.listen(PORT, () => {
  debug(`listening for requests on ${PORT}`)
})
