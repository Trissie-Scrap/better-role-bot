/**
 * Middleware to ensure user is logged in.
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
module.exports = (req, res, next) => {
  if (!req.user) {
    res.status(401).send('Unauthenticated: You must be logged in to use this endpoint.')
  }

  next()
}
