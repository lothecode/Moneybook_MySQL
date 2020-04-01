const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')

const port = 3000
const db = require('./models')
const Record = db.Record
const User = db.User

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(flash())
app.use(session({
  secret: 'secret key',
  resave: 'false',
  saveUninitialized: 'false',
}))

app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})



// Routes - CRUD
// Home
app.get('/', (req, res) => {
  return res.redirect('/records')
})

// List all
app.get('/records', (req, res) => {
  res.render('index')
})

// Add new GET
app.get('/records/new', (req, res) => {
  res.render('new')
})
// Add new POST
app.post('/records', (req, res) => {
  res.send(`<h1>NEW POST</h1>`)
})
// Edit one GET
app.get('/records/:id/edit', (req, res) => {
  res.render('edit')
})
// Edit one PUT
app.put('/records/:id', (req, res) => {
  res.send(`<h1>EDIT PUT</h1>`)
})
// Delete one
app.delete('/records/:id/delete', (req, res) => {
  res.send(`<h1>DELETE DELETE</h1>`)
})

// Routes - Sort by categories
app.get('/screen/?', (req, res) => {
  res.send(`<h1>Sort by categories</h1>`)
})

// Routers
app.use('/users', require('./routes/user'))

app.listen(port, () => {
  console.log(`APP is running on port ${port}`)
})