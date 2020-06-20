const Room = require('../models/roomModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllRooms = catchAsync(async (req, res, next) => {
  const rooms = await Room.find();

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
  console.log(req.body);
  if (req.body.users) roomData.users = req.body.users;

  const user = await User.findById(req.body.users[0]).select('name');
  const room = await Room.create(roomData);

  res.status(201).json({
    status: 'success',
    room,
    user,
  });
});

exports.deleteRoom = catchAsync(async (req, res, next) => {
  await Room.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    data: null,
  });
});
