const mongoose = require('mongoose')
const Schema = mongoose.Schema
//creating a non strict schema for Comment
//non strict means it 'Comment' document can also contain other attributes not defined in the schema.
const commentSchema = new Schema(
  {
    text: { type: String, required: true },
    parent_comment: { type: Schema.Types.ObjectId, ref: 'Comment' },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    post_id: { type: Schema.Types.ObjectId, ref: 'Post' }
  },
  {
    timestamps: true,
    strict: false
  }
)

var Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
