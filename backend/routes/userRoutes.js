const express = require('express');
const router = express.Router();
const { getUsers, registerUser, loginUser, getMe } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getUsers);
router.get('/me', protect, getMe);
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;