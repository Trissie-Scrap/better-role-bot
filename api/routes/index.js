const router = require('express').Router()

// Require routes
const auth = require('./auth')

// Apply global middleware

// Apply routes
router.use('/auth', auth)

module.exports = router
