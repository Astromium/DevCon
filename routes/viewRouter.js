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
  allUsers,
  allStartups,
  startupProfile,
  startupSettings,
  popularPosts,
  jobOffers,
  room,
  messages,
  jobSearchResults,
  project,
  createProject
} = require('../controllers/viewController');
const { protect, restricTo } = require('../controllers/authController');
const { getFeed, getSuggestions } = require('../controllers/userController');
const { route } = require('./projectRouter');

const router = express.Router();

router.get('/', getLandingPage);
router.get('/login', login);
router.get('/signup', signup);
router.get('/startups', startup);
router.get('/home', protect, restricTo('user'), getFeed, getSuggestions, home);
router.get('/welcome', protect, restricTo('user'), welcome);
router.get(
  '/bookmarks',
  protect,
  restricTo('user', 'startup'),
  getSuggestions,
  bookmarks
);
router.get('/me', protect, restricTo('user'), me);
router.get('/messages', protect, messages);
router.get('/settings', protect, restricTo('user'), settings);
router.get('/markdown', protect, restricTo('user'), markdown);
router.get('/popular-posts', protect, popularPosts);
router.get('/job-offers', protect, restricTo('user'), jobOffers);
router.get('/add-project', protect, createProject)
router.get('/job-offers/:query', protect, jobSearchResults);
router.get('/dashboard', protect, restricTo('admin'), dashboard);
router.get('/dashboard/allReports', protect, restricTo('admin'), getAllReports);
router.get('/dashboard/allUsers', protect, restricTo('admin'), allUsers);
router.get('/dashboard/allStartups', protect, restricTo('admin'), allStartups);
router.get('/startups/welcome', protect, restricTo('startup'), welcomeStartup);
router.get('/startups/me', protect, restricTo('startup'), startupProfile);
router.get(
  '/startups/settings',
  protect,
  restricTo('startup'),
  startupSettings
);
router.get('/post/:id', protect, editPost);
router.get('/posts/:id', protect, getPost);
router.get('/users/:slug', protect, userProfile);
router.get('/messages/:id', protect, room);
router.get('/projects/:id', protect, project);

module.exports = router;
