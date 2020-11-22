const express =             require('express')
const router =              express.Router()

// controllers
const postController =      require('../controllers/post')
const adminController =     require('../controllers/admin')
const categoryController =  require('../controllers/category')

function isAdmin(req, res, next) {
  if (res.locals.admin !== "admin") {
    req.flash('errorMessage', 'Please login.')
    return res.redirect('/login')
  }
  next()
}

router.get('/',                postController.index)
router.get('/about',           (req, res) => { res.render('about')})
router.get('/post/:id',        postController.showOnePost)
router.get('/archive',         postController.listPostTitles)
router.get('/category/:id',    postController.showCategoryPosts)
router.get('/category',        categoryController.listCategory)
router.get('/login',           adminController.loginPage)
router.get('/logout',          adminController.handleLogout)
router.get('/admin',           isAdmin, adminController.adminPage)
router.get('/editor',          isAdmin, postController.editor)
router.get('/editor/:id',      isAdmin, postController.postEditor)
router.get('/delete/:id',      isAdmin, postController.handleDelete)

router.post('/handle-login',               adminController.handleLogin)
router.post('/handle-add',                 isAdmin, postController.handleAdd)
router.post('/handle-edit/:id',            isAdmin, postController.handleEdit)
router.post('/handle-add-category',        isAdmin, categoryController.handleAddCategory)
router.post('/handle-edit-category/:id',   isAdmin, categoryController.handleEditCategory)
router.post('/handle-delete-category/:id', isAdmin, categoryController.handleDeleteCategory)

module.exports = router
