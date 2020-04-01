const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
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

// Handlebars Helper 
Handlebars.registerHelper('ifCond', function (v1, op, v2, options) {
  switch (op) {
    case '===':
      return (v1 === v2) ? options.fn(this) : options.inverse(this)
    case '!==':
      return (v1 !== v2) ? options.fn(this) : options.inverse(this)
    default:
      return options.inverse(this);
  }
})

// Routers
app.use('/users', require('./routes/user'))
app.use('/records', require('./routes/record'))
app.use('/', require('./routes/home'))
app.use('/screen', require('./routes/screen'))

app.listen(port, () => {
  console.log(`APP is running on port ${port}`)
})