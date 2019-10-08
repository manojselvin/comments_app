const Comment = require('../models/comment')
var mongoose = require('mongoose')
ObjectId = mongoose.Schema.Types.ObjectId

const getAll = (req, res, next) => {
  Comment.find({}).then(
    (comments) => {
      if (comments != null) {
        res.status(200).send({
          status: 'success',
          message: 'All Comments',
          data: { comments: comments }
        })
      } else {
        res.status(404).send({
          status: 'error',
          message: 'No comments found!',
          data: { comments: comments }
        })
      }
    },
    (err) => next(err)
  )
}

const getCommentsByColumn = (req, res, next) => {
  // if (req.body.post_id) {
  //   req.body.post_id = new ObjectId(req.body.post_id)
  // }
  console.log(req.body)
  Comment.find(req.body)
    .populate('author')
    .populate('parent_comment')
    .exec(
      function(err, comments) {
        if (comments != null) {
          res.status(200).send({
            status: 'success',
            message: 'All Comments',
            data: { comments: comments }
          })
        } else {
          res.status(404).send({
            status: 'error',
            message: 'No comments found!',
            data: { comments: comments }
          })
        }
      },
      (err) => next(err)
    )
}

const getById = (req, res, next) => {
  Comment.findById(req.params.id)
    .populate('author')
    .then(
      (comment) => {
        if (comment != null) {
          res.status(200).send({
            status: 'success',
            message: 'Comment with id ' + req.params.id,
            data: { comment: comment }
          })
        } else {
          res.status(404).send({
            status: 'error',
            message: 'Comment not found!',
            data: { comment: comment }
          })
        }
      },
      (err) => next(err)
    )
}

const createNew = (req, res, next) => {
  Comment.create(req.body).then(
    (comment) => {
      if (comment != null) {
        res.status(200).send({
          status: 'success',
          message: 'Comment created',
          data: { comment: comment }
        })
      } else {
        res.status(404).send({
          status: 'error',
          message: "Comment couldn't be created!",
          data: { comment: comment }
        })
      }
    },
    (err) => next(err)
  )
}

const updateById = (req, res, next) => {
  Comment.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  ).then(
    (comment) => {
      if (comment != null) {
        res.status(200).send({
          status: 'success',
          message: 'Comment updated',
          data: { comment: comment }
        })
      } else {
        res.status(404).send({
          status: 'error',
          message: "Comment couldn't be updated!",
          data: { comment: comment }
        })
      }
    },
    (err) => next(err)
  )
}

module.exports = {
  getAll,
  getCommentsByColumn,
  getById,
  createNew,
  updateById
}
