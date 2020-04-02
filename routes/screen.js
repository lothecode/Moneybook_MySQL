const express = require('express')
const router = express.Router()
const { authenticated } = require('../config/auth')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const sort = require('../sort')
const categories = require('../data/categories.json')
const months = require('../data/months.json')
const orders = require('../data/order.json')

const db = require('../models')
const User = db.User
const Record = db.Record

router.get('/?', authenticated, (req, res) => {
  const selectCategory = req.query.cat
  const selectMonth = req.query.month
  const selectOrder = req.query.sort
  let querys = {
    raw: true,
    nest: true,
    order: sort(selectOrder)
  }
  let showCategory = '類別 (全部)'

  if (!selectMonth && selectCategory) {
    querys.where = {
      UserId: req.user.id,
      category: selectCategory
    }
    showCategory = categories[selectCategory].category_ch
  } else if (selectMonth && !selectCategory) {
    querys.where = {
      UserId: req.user.id,
      date: { [Op.like]: `%${selectMonth}%` }
    }
  } else if (selectMonth && selectCategory) {
    querys.where = {
      UserId: req.user.id,
      category: selectCategory,
      date: { [Op.like]: `%${selectMonth}%` }
    }
    showCategory = categories[selectCategory].category_ch
  } else {
    querys.where = { UserId: req.user.id }
  }

  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found")
      return Record.findAll(querys)
    })
    .then((records) => {
      let total = 0
      records.forEach(item => {
        total += item.amount
        item.icon = categories[item.category].icon
      })
      return res.render('index', {
        categories,
        records,
        total,
        selectCategory,
        showCategory,
        selectMonth,
        showMonth: months[selectMonth],
        selectOrder,
        showOrder: orders[selectOrder]
      })
    })
    .catch((error) => { return res.status(422).json(error) })
})

module.exports = router