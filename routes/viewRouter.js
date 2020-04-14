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
  welcomeStartup
} = require('../controllers/viewController');
const { protect } = require('../controllers/authController');
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
router.get('/startups/welcome', protect, welcomeStartup);
router.get('/post/:id', protect, editPost);
router.get('/users/:slug', protect, userProfile);

module.exports = router;
