const express = require('express')
const router = express.Router()

const db = require('../models')
const User = db.User
const Record = db.Record

// List all
router.get('/', (req, res) => {
  res.render('index')
})

// Add new GET
router.get('/new', (req, res) => {
  res.render('new')
})
// Add new POST
router.post('/', (req, res) => {
  res.send(`<h1>NEW POST</h1>`)
})
// Edit one GET
router.get('/:id/edit', (req, res) => {
  res.render('edit')
})
// Edit one PUT
router.put('/:id', (req, res) => {
  res.send(`<h1>EDIT PUT</h1>`)
})
// Delete one
router.delete('/:id/delete', (req, res) => {
  res.send(`<h1>DELETE DELETE</h1>`)
})

module.exports = router