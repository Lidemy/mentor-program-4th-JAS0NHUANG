const bcrypt = require('bcrypt')
const db = require('../models')
const Admin = db.Admin
const Prize = db.Prize

const adminController = {
  sendPrizeList: (req, res) => {
    Prize.findAll()
    .then( prizes => {
      res.status(200).json(prizes)
    })
  },
  handleAddPrize: (req, res) => {
    const {name, photo, weight} = req.body
    Prize.create({
      name,
      photo,
      weight
    }).then( () => {
      res.redirect('/admin')
    }).catch( error => {
      console.log(error)
      return res.redirect('admin')
    })
  },
  editPrize: (req, res) => {
    Prize.findOne({
    where: {
      id: req.params.id
    }
    }).then( prize => {
      if (!prize) {
        req.flash('errorMessage', 'No such prize')
        return res.redirect('/')
      }
      res.render('addPrize', {
        prize
      })
    }).catch( error => {
      console.log(error)
      return res.redirect('/')
    })
  },
  handleEditPrize: (req, res) => {
    const {name, photo, weight} = req.body
    Prize.update({name, photo, weight}, {
      where: {
        id: req.params.id
      }
    }).then( () => {
      res.redirect('/admin')
    }).catch( error => {
      console.log(error)
      return res.redirect('/admin')
    })
  },
  handleDeletePrize: (req, res) => {
    Prize.destroy({
    where: {
      id:req.params.id
    }
    }).then( () => {
      res.redirect('/admin')
    }).catch( error => {
      console.log(error)
      return res.redirect('/admin')
    })
  },
  handleLogin: (req, res) => {
    const {admin, password} = req.body
    if (!admin || !password) {
      req.flash('errorMessage', 'Invalid admin name or password.')
      return res.redirect('/login')
    }
    Admin.findOne({
    where: {
      admin
    }
    }).then( admin => {
    if (!admin) {
      req.flash('errorMessage', 'Invalid admin name or password.')
      return res.redirect('/login')
    }
    bcrypt.compare(password, admin.password, function(error, isSuccess) {
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
