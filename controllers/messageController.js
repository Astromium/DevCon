const Message = require('../models/messageModel');
const catchAsync = require('../utils/catchAsync');

exports.createMessage = catchAsync(async (req, res, next) => {
  let messageData = {};
  messageData.sender = req.user.id;
  if (req.body.roomId) messageData.roomId = req.body.roomId;
  if (req.body.reciever) messageData.reciever = req.body.reciever;
  if (req.body.message) messageData.message = req.body.message;

  const message = await Message.create(messageData);
  res.status(201).json({
    status: 'success',
    message,
  });
});
