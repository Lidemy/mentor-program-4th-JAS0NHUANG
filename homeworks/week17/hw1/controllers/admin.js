const session = require('express-session')
const bcrypt = require('bcrypt')

const db = require('../models')
const Post = db.Post
const Category = db.Category
const Admin = db.Admin

const adminController = {
  adminPage: (req, res) => {
    Post.findAll({
      include: Category 
    }).then( posts => {
      res.render('admin', { posts })
    }).catch( error => {
      console.log(error)
      return next()
    })
  },
  loginPage: (req, res) => {
    res.render('login')
  },
  handleLogin: (req, res, next) => {
    const {admin, password} = req.body 
    if (!admin || !password) {
      req.flash('errorMessage', 'Invalid admin name or password.')
      return res.redirect('/login')
    }
    Admin.findOne({
      where: { admin }
    }).then( admin => {
      if (!admin) {
        req.flash('errorMessage', 'Invalid admin name or password.')
        return res.redirect('/login')
      }
      bcrypt.compare(password, admin.password, (error, isSuccess) => {
        if (error || !isSuccess) {
          req.flash('errorMessage', 'Invalid admin name or password.')
          return res.redirect('/login')
        }
        req.session.admin = admin.admin
        res.redirect('/admin')
      })
    }).catch( error => {
      console.log(error)
      return next()
    })
  },
  handleLogout: (req, res) => {
    req.session.admin = null
    res.redirect('/')
  }
}

module.exports = adminController
