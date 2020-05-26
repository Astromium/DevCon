const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  applicants: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  jobLocation: {
    type: String,
    required: true,
  },
  accepted: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  declined: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

jobSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'applicants',
    select: 'photo name slug cv',
  });
  this.populate({
    path: 'author',
    select: 'name photo location slug _id',
  });
  next();
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
