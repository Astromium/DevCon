const Message = require('../models/messageModel');
const catchAsync = require('../utils/catchAsync');

exports.createMessage = catchAsync(async (req, res, next) => {
  let messageData = {};
  messageData.sender = req.user.id;
  if (req.body.roomId) messageData.roomId = req.body.roomId;
  if (req.body.reciever) messageData.reciever = req.body.reciever;
  if (req.body.message) messageData.message = req.body.message;

  console.log(messageData);

  const message = await Message.create(messageData);
  res.status(201).json({
    status: 'success',
    message,
  });
});

exports.getAllMessages = catchAsync(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    status: 'success',
    messages,
  });
});

exports.deleteAllMessages = catchAsync(async (req, res, next) => {
  await Message.deleteMany();
  res.status(200).json({
    status: 'success',
    data: null,
  });
});
