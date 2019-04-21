const router = require('express').Router()

const ensureAuthMiddleware = require('../utils/ensureAuth')

// require routes
const auth = require('./auth')
const user = require('./user')
const guilds = require('./guilds')

// apply routes
router.use('/auth', auth)
router.use('/users', ensureAuthMiddleware, user)
router.use('/guilds', ensureAuthMiddleware, guilds)

module.exports = router
