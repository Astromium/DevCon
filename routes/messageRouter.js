const express = require('express');
const { createMessage } = require('../controllers/messageController');
const { protect } = require('../controllers/authController');

const router = express.Router();

router.route('/').post(protect, createMessage);

module.exports = router;
