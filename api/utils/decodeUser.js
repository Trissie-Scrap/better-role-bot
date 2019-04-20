/**
 * Middleware to decode user from session.
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
module.exports = (req, res, next) => {
  if (req.session.userData) {
    const userData = req.session.userData

    req.user = {
      avatarHash: userData.avatar,
      snowflake: userData.id,
      username: userData.username
    }
  }

  next()
}
