const express = require('express')
const router = express.Router()
const categories = require('../data/categories.json')
const months = require('../data/months.json')

const db = require('../models')
const User = db.User
const Record = db.Record

router.get('/?', (req, res) => {
  res.send(`<h1>Sort by categories</h1>`)
})

module.exports = router