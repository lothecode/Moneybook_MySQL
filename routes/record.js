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

// Add new expense
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
// Add new expense action
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

// edit one expense
router.get('/:id/edit', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error('User not found')
      return Record.findOne({
        where: {
          Id: req.params.id,
          UserId: req.user.id,
        }
      })
    })
    .then((record) => { return res.render('edit', { record: record.get() }) })
})
// edit one expense action
router.put('/:id', authenticated, (req, res) => {
  Record.findOne({
    where: {
      Id: req.params.id,
      UserId: req.user.id,
    }
  })
    .then((record) => {
      record.name = req.body.name
      record.category = req.body.category
      record.date = req.body.date
      record.amount = req.body.amount

      return record.save()
    })
    .then((record) => { return res.redirect(`/records`) })
    .catch((error) => { return res.status(422).json(error) })
})

// Delete one
router.delete('/:id/delete', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found")

      return Record.destroy({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        }
      })
    })
    .then((record) => { return res.redirect('/') })
    .catch((error) => { return res.status(422).json(error) })
})

module.exports = router