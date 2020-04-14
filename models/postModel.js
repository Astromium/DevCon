const mongoose = require('mongoose');
const User = require('./userModel');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  postType: {
    type: String,
    required: [true, 'Posts Must have a specific type'],
    enum: ['article', 'image', 'video'],
  },
  content: {
    type: String,
  },
  image: {
    type: String,
  },
  video: {
    type: String,
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  numLikes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      user: {
        type: Object,
      },
      text: {
        type: String,
        required: [true, 'you can not create an empty comment'],
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  numComments: {
    type: Number,
    default: 0,
  },
  tag: {
    type: String,
    required: [true, 'A post must have a tag'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Query Middleware
// postSchema.pre(/^find/, function(next) {
//   this.numLikes = this.likes.length;
//   this.numComments = this.comments.length;
//   next();
// });

postSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'photo name slug notifications',
  });
  next();
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
