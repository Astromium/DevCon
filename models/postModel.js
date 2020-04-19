const mongoose = require('mongoose');
const marked = require('marked');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const domPurify = createDomPurify(new JSDOM().window);

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
  // content: {
  //   type: String,
  // },
  markdown: {
    type: String
  },

  sanitizedHtml: {
    type: String
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

// compiling the body markdown into html
postSchema.pre('save', function (next) {
  if (this.markdown) {
    this.sanitizedHtml = domPurify.sanitize(marked(this.markdown));
  }
  next();

})

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'photo name slug notifications',
  });
  next();
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
