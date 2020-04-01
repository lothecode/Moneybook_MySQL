const express = require('express')
const router = express.Router()

// Home
router.get('/', (req, res) => {
  return res.redirect('/records')
})

module.exports = router