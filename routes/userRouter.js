const express = require('express');

const {
  signUp,
  login,
  protect,
  logout,
} = require('../controllers/authController');
const {
  getAllUsers,
  getUser,
  getMe,
  updateMe,
  uploadUserPhoto,
  resizeUserPhoto,
  getFeed,
  followUser,
  updateUser,
  unfollowUser,
  getSuggestions,
  search,
} = require('../controllers/userController');

const router = express.Router({ mergeParams: true });

router.get('/', getAllUsers);
router.post('/signup', signUp);
router.post('/login', login);
router.get('/logout', logout);
router
  .route('/profile')
  .get(protect, getMe)
  .patch(protect, uploadUserPhoto, resizeUserPhoto, updateMe);
router.get('/feed', protect, getFeed);
router.get('/suggestions', protect, getSuggestions);
router.get('/follow/:user', protect, followUser);
router.get('/search/:query', search);
router.get('/unfollow/:user', protect, unfollowUser);
router
  .route('/:id')
  .get(getUser)
  .patch(updateUser);

module.exports = router;
