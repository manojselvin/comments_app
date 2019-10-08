const mongoose = require('mongoose')
require('mongoose-type-email')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    hash: { type: String, required: true }
  },
  {
    timestamps: true,
    strict: false
  }
)

userSchema.set('toJSON', { virtuals: true })

var User = mongoose.model('User', userSchema)
module.exports = User
