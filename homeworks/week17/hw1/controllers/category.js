const db = require('../models')
const Category = db.Category
const Post = db.Post

const categoryController = {
  listCategory: (req, res, next) => {
    Category.findAll()
    .then( categories => {
      res.render('category', {
        categories
      })
    }).catch( error => {
      consoel.log(error)
      return next()
    })
  },
  handleAddCategory: (req, res, next) => {
    const { categoryName } = req.body
    if (!categoryName) {
      console.log('error')
      return next()
    }
    Category.create({
      categoryName 
    }).then ( () => {
      console.log('done')
    }).catch( err =>{
      consoel.log(error)
      return next()
    })
  },
  handleEditCategory: (req, res, next) => {
    const {categoryName} = req.body
    if (!categoryName) {
      console.log('No category name.')
      return next()
    }
    Category.update({categoryName}, {
      where: {
        id: req.params.id
      }
    }).then ( () => {
      console.log('done')
    }).catch( error =>{
      consoel.log(error)
      return next()
    })
  },
  handleDeleteCategory: (req, res, next) => {
    const categoryId = req.params.id
    Post.findAll({
      where: {
        categoryId
      }
    }).then ( posts => {
      if (posts.length !== 0){
        req.flash('errorMessage', 'Still have articles in this category!')
        return next()
      }
      Category.destroy({
        where: {
          id: req.params.id
        }
      }).then ( () => {
        console.log('done')
      }).catch( error =>{
        consoel.log(error)
        return next()
      })
    })
  }
}

module.exports = categoryController
