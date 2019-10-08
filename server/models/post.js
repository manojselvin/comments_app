const mongoose = require('mongoose')
const Schema = mongoose.Schema
//creating a non strict schema for Posts
//non strict means it 'Posts' document can also contain other attributes not defined in the schema.
const postSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    parent_post_id: { type: Schema.Types.ObjectId, ref: 'Post' },
    author: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true,
    strict: false
  }
)

var Post = mongoose.model('Post', postSchema)
module.exports = Post
