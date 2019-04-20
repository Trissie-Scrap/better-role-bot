const router = require('express').Router()

const ensureAuthMiddleware = require('../utils/ensureAuth')

// Require routes
const auth = require('./auth')
const user = require('./user')

// Apply routes
router.use('/auth', auth)
router.use('/user', ensureAuthMiddleware, user)

module.exports = router
