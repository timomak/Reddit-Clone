const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = global.Promise;

const PostSchema = new Schema({
  createdAt     :  { type: Date },
  updatedAt     :  { type: Date },
  author        :  { type: Schema.Types.ObjectId, ref: 'User', required: true },
  authorUsername:  { type: String },
  title         :  { type: String, required: true },
  url           :  { type: String, required: true },
  summary       :  { type: String, required: true },
  subreddit     :  { type: String, required: true },
  comments      :  [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
})

PostSchema.pre('save', (next) => {
  // SET createdAt AND updatedAt
  const now = new Date()
  this.updatedAt = now
  if (!this.createdAt) {
    this.createdAt = now
  }
// console.log("this.author: ", this.author);
//   User.findById(this.author).then((authorName) => {
//     console.log("authorUsername: ", authorName);
//     authorUsername = authorName.username;
//   })

  next()
})

module.exports = mongoose.model('Post', PostSchema)
