const express = require('express');
const {
  getLandingPage,
  login,
  signup,
  startup,
  home,
  welcome,
  bookmarks,
  me,
  editPost,
  settings,
  userProfile,
  welcomeStartup,
  markdown,
  dashboard,
  getAllReports,
  getPost,
  allUsers
} = require('../controllers/viewController');
const { protect, restricTo } = require('../controllers/authController');
const { getFeed, getSuggestions } = require('../controllers/userController');

const router = express.Router();

router.get('/', getLandingPage);
router.get('/login', login);
router.get('/signup', signup);
router.get('/startups', startup);
router.get('/home', protect, getFeed, getSuggestions, home);
router.get('/welcome', protect, welcome);
router.get('/bookmarks', protect, getSuggestions, bookmarks);
router.get('/me', protect, me);
router.get('/settings', protect, settings);
router.get('/markdown', markdown);
router.get('/dashboard', protect, restricTo('admin'), dashboard);
router.get('/dashboard/allReports', protect, restricTo('admin'), getAllReports);
router.get('/dashboard/allUsers', protect, restricTo('admin'), allUsers);
router.get('/startups/welcome', protect, welcomeStartup);
router.get('/post/:id', protect, editPost);
router.get('/posts/:id', protect, getPost);
router.get('/users/:slug', protect, userProfile);

module.exports = router;
