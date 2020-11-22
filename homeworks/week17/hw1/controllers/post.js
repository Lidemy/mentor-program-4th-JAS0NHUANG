const session = require('express-session')

const db = require('../models')
const Post = db.Post
const Category = db.Category
const Admin = db.Admin

const postController = {
  index: (req, res) => {
    Post.findAll({
      include: Category
    }).then( posts => {
      res.render('index', {
        posts
      })
    }).catch( error => {
      console.log(error)
      return res.redirect('/')
    })
  },
  showOnePost: (req, res, next) => {
    Post.findOne({
      include: Category,
      where: {
        id: req.params.id
      }
    }).then( post => {
      if (!post) {
        req.flash('errorMessage', `Can not find post id:${req.params.id}`)
        return res.redirect('/')
      }
      res.render('index', {
        post
      })
    }).catch( error => {
      return next()
    })
  },
  showCategoryPosts: (req, res) => {
    Post.findAll({
      include: Category,
      where: {
        CategoryId: req.params.id
      }
    }).then( posts => {
      if (!posts || posts.length === 0) {
        req.flash('errorMessage', 'No post in this category.')
        return res.redirect('/')
      }
      res.render('index', {
        posts
      })
    }).catch( error => {
      return next()
    })
  },
  editor: (req, res) => {
    Category.findAll()
    .then( categories => {
      res.render('editor', {
        categories
      })
    }).catch( error => {
      console.log(error)
      return res.rediret('/')
    })
  },
  postEditor: (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      }
    }).then( (post) => {
      if (!post) {
        req.flash('errorMessage', `Can not find post id:${req.params.id}`)
        return res.redirect('/')
      }
      Category.findAll()
      .then( categories => {
        res.render('editor', {
          categories,
          post
        })
      })
    }).catch( error => {
      console.log(error)
      return res.redirect('/')
    })
  },
  handleAdd: (req, res) => {
    const {title, content, categoryId} = req.body
    Post.create({
      title,
      content,
      categoryId
    }).then( () => {
      res.redirect('/')
    }).catch( error => {
      console.log(error)
      return res.redirect('/')
    })
  },
  handleDelete: (req, res) => {
    Post.destroy({
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
  handleEdit: (req, res) => {
    const {title, content, categoryId} = req.body
    Post.update({title, content, categoryId}, {
      where: {
        id: req.params.id
      }
    }).then( () => {
      res.redirect('/')
    }).catch( error => {
      console.log(error)
      return res.redirect('/')
    })
  },
  listPostTitles: (req, res) => {
    Post.findAll({
      include: Category
    }).then( posts => {
      res.render('archive', {
        posts
      })
    }).catch( error => {
      console.log(error)
      return res.redirect('/')
    })
  }
}

module.exports = postController
