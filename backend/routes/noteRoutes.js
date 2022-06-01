const express = require('express');
const router = express.Router({ mergeParams: true });
const { getNotes, getNote, addNote } = require('../controllers/noteController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getNotes).post(protect, addNote);

router.route('/:id').get(protect, getNote);

module.exports = router;