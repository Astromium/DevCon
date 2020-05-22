const express = require('express');
const { protect, restricTo } = require('../controllers/authController');
const { getAllJobs, getjob, createJob, updateJob, deleteJob } = require('../controllers/jobController');

const router = express.Router();

router.route('/').get(protect, getAllJobs).post(protect, restricTo('startup'), createJob)
router.route('/:id').get(protect, getjob).patch(protect, restricTo('startup'), updateJob).delete(protect, restricTo('startup'), deleteJob);

module.exports = router;