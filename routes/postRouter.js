const express = require('express');
const {
  createImagePost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  getAllPosts,
  getPost,
  updateComment,
  deleteComment,
  savePost,
  unsavePost,
  uploadPostImage,
  resizePostPhoto,
  uploadPostVideo,
  createVideoPost,
  reportPost,
  getPostStats
} = require('../controllers/postController');
const { protect } = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(getAllPosts)
  .post(protect, uploadPostImage, resizePostPhoto, createImagePost);
router.route('/video').post(protect, uploadPostVideo, createVideoPost);
//router.route('/report').post(protect, reportPost);
router.route('/stats').get(protect, getPostStats);
router.get('/:id', getPost);

router
  .route('/:id')
  .patch(protect, updatePost)
  .delete(protect, deletePost);
router.get('/:id/like', protect, likePost);
router.get('/:id/unlike', protect, unlikePost);
router.get('/:id/save', protect, savePost);
router.get('/:id/unsave', protect, unsavePost);

router
  .route('/:id/comment')
  .post(protect, addComment)
  .patch(protect, updateComment)
  .delete(protect, deleteComment);

module.exports = router;
