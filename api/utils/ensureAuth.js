/**
 * Middleware to ensure user is logged in.
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
module.exports = (req, res, next) => {
  if (!req.user) {
    const err = new Error('Unauthenticated: You must be logged in to use this endpoint.')
    err.statusCode = 401

    return next(err)
  }

  next()
}
