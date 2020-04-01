const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

const db = require('../models')
const User = db.User

// Routes - login/register
// Login GET
router.get('/login', (req, res) => {
  res.render('login')
})
// Login POST
router.post('/login', (req, res) => {
  res.send(`<h1>User Login POST</h1>`)
})
// Register GET
router.get('/register', (req, res) => {
  res.render('register')
})
// Register POST
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  User.findOne({ where: { email: email } }).then(user => {
    if (user) {
      console.log('User already exists')
      res.render('register', {
        name,
        email,
        password,
        password2
      })
    } else {
      const newUser = new User({
        name,
        email,
        password
      })
      newUser
        .save()
        .then(user => {
          res.rendirect('/')
        })
        .catch(err => console.log(err))
    }
  })
})

// Logout GET
router.get('/logout', (req, res) => {
  res.send(`<h1>Logout</h1>`)
})

module.exports = router