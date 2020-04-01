const express = require('express')
const router = express.Router()
const categories = require('../data/categories.json')
const months = require('../data/months.json')
const { authenticated } = require('../config/auth')


const db = require('../models')
const User = db.User
const Record = db.Record

router.get('/?', authenticated, (req, res) => {
  const selectCategory = req.query.cat || ''
  const selectMonth = req.query.month || ''
  const selectOrder = req.query.sort
  const findMonth = new RegExp(selectMonth, 'g') // 含有selectMonth的字串, 'g'flag: global search
  let querys = {
    raw: true,
    nest: true,
    where: { UserId: req.user.id }
  }

  let showCategory = '類別 (全部)'
  let showMonth = '月份 (全部)'
  // // 用keywords作為判斷條件, 將要篩選or排序的條件加入querys的where{}中, 成為後面findAll的條件
  if (selectCategory === '' && selectMonth !== '') {
    console.log('1')

    showMonth = months[selectMonth].month_ch
  } else if (selectCategory !== '' && selectMonth === '') {
    console.log('2')
    querys = {
      raw: true,
      nest: true,
      where: { UserId: req.user.id, category: selectCategory }
    }
    showCategory = categories[selectCategory].category_ch
    // showCategory = categories[selectCategory].category_ch
  } else if (selectCategory !== '' && selectMonth !== '') {
    showCategory = categories[selectCategory].category_ch
    // querys = { userId, category: selectCategory, date: { $regex: findMonth } }
    // showCategory = categories[selectCategory].category_ch
    showMonth = months[selectMonth].month_ch
  }
  // let order = 'date DESC'
  // let showOrder = '時間或金額排序'
  // if (selectOrder === 'dateAsc') {
  //   order = 'date ASC'
  //   showOrder = '時間 (舊->新)'
  // } else if (selectOrder === 'dateDesc') {
  //   order = 'date DESC'
  //   showOrder = '時間 (新->舊)'
  // } else if (selectOrder === 'amountDesc') {
  //   order = 'amount DESC'
  //   showOrder = '金額 (多->少)'
  // } else if (selectOrder === 'amountAsc') {
  //   order = 'amount ASC'
  //   showOrder = '金額 (少->多)'
  // }

  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found")
      return Record.findAll(querys)
    })
    .then((records) => {
      console.log('then')
      let total = 0
      records.forEach(item => {
        total += item.amount
        item.icon = categories[item.category].icon
      })



      return res.render('index', { categories, records, total, showCategory, selectCategory, selectOrder })
    })
    .catch((error) => { return res.status(422).json(error) })
})

module.exports = router