const express = require('express');
const router = express.Router();
const { 
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  registerUser, 
  loginUser, 
  getMe 
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getUsers);
router.get('/me', protect, getMe);

router.route('/:id').get(protect, getUser).put(protect, updateUser).delete(protect, deleteUser);

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;