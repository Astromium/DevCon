const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reportType: {
    type: 'String',
    enum: ['post', 'bug', 'user']
  },
  user: Object,
  post: {
    type: mongoose.Schema.ObjectId
  },
  reasons: [String],
  issuedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['reviewed', 'not reviewed'],
    default: 'not reviewed'
  }
});



const Report = mongoose.model('Report', reportSchema);
module.exports = Report;
