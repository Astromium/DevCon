const express = require('express');
const { protect } = require('../controllers/authController')
const { createProject, uploadProjectImages, getPersonalProjects, resizeProjectImages, deleteProject } = require('../controllers/projectController')

const router = express.Router();

router.route('/').get(protect, getPersonalProjects).post(protect, uploadProjectImages, resizeProjectImages, createProject)
router.route('/:id').delete(protect, deleteProject);

module.exports = router


