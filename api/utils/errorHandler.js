const debug = require('debug')('brb:api')
const Sequelize = require('sequelize')

module.exports = (err, req, res, next) => {
  if (!err) next()

  if (err instanceof Sequelize.ValidationError) {
    err.statusCode = 422
    err.message = 'validation failed'
    err.detail = err.errors
  }

  if (err.statusCode >= 400 && err.statusCode < 500) {
    debug('%d %s %s %s', err.statusCode, req.method, req.url, err.message)

    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
      detail: err.detail || null
    })
  }

  debug('an error occurred handling a request to %s %s \n %O', req.method, req.originalUrl, err)
  res.status(500).json({
    status: 500,
    message: 'a server error occurred. sorry :)'
  })
}
