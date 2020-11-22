const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const cors = require('cors')
const routes = require('./routes')

const app = express()
const port = process.env.PORT || 888

app.set('view engine', 'ejs')

app.use(flash())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use( (req, res, next) => {
  res.locals.admin = req.session.admin
  res.locals.errorMessage = req.flash('errorMessage')
  next()
})
app.use(express.static(__dirname + '/public'))

app.listen(port, () => {
  console.log("Running!")
})

app.options('*', cors())
app.use('/', routes)
