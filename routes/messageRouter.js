const express = require('express');
const {
  createMessage,
  getAllMessages,
  deleteAllMessages,
} = require('../controllers/messageController');
const { protect } = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(getAllMessages)
  .post(protect, createMessage)
  .delete(deleteAllMessages);

module.exports = router;
