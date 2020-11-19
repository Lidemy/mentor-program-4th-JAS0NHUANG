const express = require('express')
const router = express.Router()

const luckyController = require('../controllers/lucky')
const adminController = require('../controllers/admin')

function isAdmin(req, res, next) {
  if (req.session.admin !== "admin") {
    req.flash('errorMessage', 'Please login.')
    return res.redirect('/login')
  }
  next()
}

router.get('/',                          (req, res) => { res.render('index') })
router.get('/get-lucky',                 luckyController.getLucky)
router.get('/login',                     (req, res) => { res.render('login') })
router.get('/handle-logout',             adminController.handleLogout)
router.get('/admin',                     isAdmin, (req, res) => { res.render('admin') })
router.get('/create-admin',              isAdmin, (req, res) => { res.render('createAdmin') })
router.get('/add-prize',                 isAdmin, (req, res) => { res.render('addPrize') })
router.get('/edit-prize/:id',            isAdmin, adminController.editPrize)
router.get('/handle-delete-prize/:id',   isAdmin, adminController.handleDeletePrize)
router.get('/prize-list',                isAdmin, adminController.sendPrizeList)

router.post('/handle-login',             adminController.handleLogin)
router.post('/handle-edit-prize/:id',    isAdmin, adminController.handleEditPrize)
router.post('/handle-add-prize',         isAdmin, adminController.handleAddPrize)

module.exports = router
