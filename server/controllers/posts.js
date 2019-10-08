const Post = require('../models/post')
const auth = require('../_helpers/auth')
let user = null

const getAll = (req, res, next) => {
  user = auth.getUser(req).sub
  Post.find({ author: user._id }).then(
    (posts) => {
      if (posts != null) {
        res.status(200).send({
          status: 'success',
          message: 'All Posts',
          data: { posts: posts }
        })
      } else {
        res.status(404).send({
          status: 'error',
          message: 'No posts found!',
          data: { posts: posts }
        })
      }
    },
    (err) => next(err)
  )
}

const getById = (req, res, next) => {
  Post.findById(req.params.id).then(
    (post) => {
      if (post != null) {
        res.status(200).send({
          status: 'success',
          message: 'Post with id ' + req.params.id,
          data: { post: post }
        })
      } else {
        res.status(404).send({
          status: 'error',
          message: 'Post not found!',
          data: { post: post }
        })
      }
    },
    (err) => next(err)
  )
}

const createNew = (req, res, next) => {
  if (req.body.author) {
    delete req.body.author
  }

  req.body.author = auth.getUser(req).sub._id

  console.log(req.body)

  Post.create(req.body).then(
    (post) => {
      if (post != null) {
        res.status(200).send({
          status: 'success',
          message: 'Post created',
          data: { post: post }
        })
      } else {
        res.status(404).send({
          status: 'error',
          message: "Post couldn't be created!",
          data: { post: post }
        })
      }
    },
    (err) => next(err)
  )
}

const updateById = (req, res, next) => {
  Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).then(
    (post) => {
      if (post != null) {
        res.status(200).send({
          status: 'success',
          message: 'Post updated',
          data: { post: post }
        })
      } else {
        res.status(404).send({
          status: 'error',
          message: "Post couldn't be updated!",
          data: { post: post }
        })
      }
    },
    (err) => next(err)
  )
}

module.exports = {
  getAll,
  getById,
  createNew,
  updateById
}
