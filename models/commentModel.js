const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post'
  },
  text: {
    type: String,
    required: [true, 'Comment must not be empty']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

commentSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name photo'
  });
  next();
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
