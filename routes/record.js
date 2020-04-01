const express = require('express')
const router = express.Router()
const categories = require('../data/categories.json')

const db = require('../models')
const User = db.User
const Record = db.Record


// List all
router.get('/', (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      // console.log(req.user.id)
      if (!user) throw new Error("user not found")
      return Record.findAll({
        where: { UserId: req.user.id }
      })
    })
    .then((records) => {
      let total = 0
      records.forEach(item => {
        total += item.amount
        item.icon = categories[item.category].icon
      })
      return res.render('index', { categories, records, total })
    })
    .catch((error) => { return res.status(422).json(error) })
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