const router = require('express').Router()

router.get('/me', (req, res) => {
  res.status(200).json(req.user)
})

module.exports = router
