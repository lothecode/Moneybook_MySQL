const express = require('express')
const router = express.Router()
const categories = require('../data/categories.json')

const db = require('../models')
const User = db.User
const Record = db.Record
// 載入 auth middleware
const { authenticated } = require('../config/auth')

// List all
router.get('/', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found")

      return Record.findAll({
        raw: true,
        nest: true,
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
router.get('/new', authenticated, (req, res) => {
  {
    const today = new Date
    const year = today.getFullYear()
    let month = today.getMonth() + 1
    let day = today.getDate()
    if (month < 10) {
      month = `0${month}`
    }
    if (day < 10) {
      day = `0${day}`
    }
    const date = `${year}-${month}-${day}`
    return res.render('new', { categories, date })
  }
})
// Add new POST
router.post('/', authenticated, (req, res) => {
  console.log(req.body)
  Record.create({
    name: req.body.name,
    date: req.body.date,
    category: req.body.category,
    amount: req.body.amount,
    UserId: req.user.id
  })
    .then((record) => {
      return res.redirect('/')
    })
    .catch((error) => { return res.status(422).json(error) })
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