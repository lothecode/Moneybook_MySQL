const express = require('express')
const router = express.Router()
const { authenticated } = require('../config/auth')

// Home
router.get('/', authenticated, (req, res) => {
  return res.redirect('/records')
})

module.exports = router