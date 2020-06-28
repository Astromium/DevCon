const express = require('express');

const {
  signUp,
  login,
  protect,
  logout,
  restricTo,
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
  uploadCv,
  uploadUserCv,
  getUsersStats,
  deleteUser,
  acceptApplicant,
  declineApplicant,
  applyForJob,
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
router.route('/cv').patch(protect, uploadUserCv, uploadCv);
router.get('/feed', protect, getFeed);
router.get('/suggestions', protect, getSuggestions);
router.get('/stats', protect, getUsersStats);
router.get('/apply/:id', protect, restricTo('user'), applyForJob);
router.get('/follow/:user', protect, followUser);
router.get('/search/:query', protect, search);
router.get('/unfollow/:user', protect, unfollowUser);
// for startups when accepting or declining an applicant
router.post('/accept/:id', protect, acceptApplicant);
router.post('/decline/:id', protect, declineApplicant);
// --- *-* --- *-*
router
  .route('/:id')
  .get(getUser)
  .patch(protect, restricTo('admin'), updateUser)
  .delete(protect, restricTo('admin'), deleteUser);

module.exports = router;
