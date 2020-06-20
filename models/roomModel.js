const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
