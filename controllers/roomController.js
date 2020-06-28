const Room = require('../models/roomModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllRooms = catchAsync(async (req, res, next) => {
  const rooms = await Room.find().populate('users', 'name');

  res.status(200).json({
    status: 'success',
    rooms,
  });
});

exports.getRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    room,
  });
});

exports.createRoom = catchAsync(async (req, res, next) => {
  let roomData = {};
  if (req.body.users) roomData.users = req.body.users;
  let users1 = [req.body.users[0], req.body.users[1]];
  let users2 = [req.body.users[1], req.body.users[0]];

  const room = await Room.findOne({
    $or: [{ users: users1 }, { users: users2 }],
  });
  if (room) {
    return res.status(200).json({
      status: 'success',
      room,
    });
  } else {
    const newRoom = await Room.create(roomData);
    return res.status(201).json({
      status: 'success',
      room: newRoom,
    });
  }
});

// when you follow a user , a room will be created between both of the users
exports.createWithFollow = catchAsync(async (req, res, next) => {
  let roomData = {};
  if (req.body.users) roomData.users = req.body.users;
  let users1 = [req.body.users[0], req.body.users[1]];
  let users2 = [req.body.users[1], req.body.users[0]];
  await Room.findOne({ $or: [{ users: users1 }, { users: users2 }] });
  await Room.create(roomData);
  next();
});

exports.deleteRoom = catchAsync(async (req, res, next) => {
  await Room.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    data: null,
  });
});
