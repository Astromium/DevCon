const express = require('express');
const {
  getAllRooms,
  getRoom,
  createRoom,
  deleteRoom,
} = require('../controllers/roomController');

const router = express.Router();

router
  .route('/')
  .get(getAllRooms)
  .post(createRoom);
router
  .route('/:id')
  .get(getRoom)
  .delete(deleteRoom);

module.exports = router;
