const express = require('express');
const { createReport, getAllReports } = require('../controllers/reportController');
const { protect, restricTo } = require('../controllers/authController')

const router = express.Router({ mergeParams: true });

router.route('/').get(protect, restricTo('admin'), getAllReports).post(protect, createReport)

module.exports = router;