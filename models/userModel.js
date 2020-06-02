const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const slugify = require('slugify');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is required'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please Provide a valid email!']
  },
  photo: {
    type: String,
    default: 'default-avatar.svg'
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must not be less than 8 caracters'],
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      //! This only works on CREATE and SAVE and not on UPDATE
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  },
  changedPasswordAt: Date,
  role: {
    type: String,
    enum: ['user', 'startup', 'admin'],
    default: 'user'
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  posts: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Post'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  followers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ],
  following: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ],
  notifications: [
    {
      notifType: {
        type: String,
        enum: ['follow', 'like', 'comment']
      },
      user: {
        name: String,
        photo: String
      },
      post: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post'
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      job: {
        type: mongoose.Schema.ObjectId,
        ref: 'Job'
      }
    }
  ],
  messages: [
    {
      from: {
        name: String,
        photo: String
      },
      messageBody: String
    }
  ],
  youtube: String,
  twitter: String,
  facebook: String,
  linkedin: String,
  dribbble: String,
  devto: String,
  github: String,
  personal: String,
  skills: [String],
  interests: [String],
  resume: String,
  occupation: String,
  saved: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Post'
    }
  ],
  slug: String,
  // for startups
  location: String,

  cv: String,

  notifNum: {
    type: Number,
    default: 0
  },
  messagesNum: {
    type: Number,
    default: 0
  }
});

// document middlewares
// Password encryption
userSchema.pre('save', async function (next) {
  // only run this if the password is modified
  if (!this.isModified('password')) return next();

  // hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  this.slug = slugify(this.name, { lower: true });
  if (this.role === 'user' || this.role === 'admin') {
    this.location = undefined
  }
  if (this.role === 'user' || this.role === 'startup') {
    this.reports = undefined;
  }

  next();
});

// can't access the document before findOneAndUpdate
// so I used post
// userSchema.post('findOneAndUpdate', async function(next) {
//   // only run this if the password is modified
//   if (!this.isModified('password')) return next();

//   // hash password with cost of 12
//   this.password = await bcrypt.hash(this.password, 12);
//   this.passwordConfirm = undefined;
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

// Query Middlewares
userSchema.pre(/^find/, async function (next) {
  this.find({ active: true });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatPassword,
  userPassword
) {
  // compare Passwords
  return await bcrypt.compare(candidatPassword, userPassword);
};

userSchema.methods.passwordChanged = function (jwtTimeStamp) {
  if (this.changedPasswordAt) {
    const changeTimeStamp = parseInt(
      this.changedPasswordAt.getTime() / 1000,
      10
    );
    return jwtTimeStamp < changeTimeStamp;
  }
  return false;
};

userSchema.methods.createResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
