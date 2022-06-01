const dotenv = require('dotenv').config();
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

// @desc Get users
// @route GET /api/users
// @access Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// @desc Get current user
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
    isStaff: req.user.isStaff,
    isAdmin: req.user.isAdmin
  }
  res.status(200).json(user);
});

// @desc Get user
// @route GET /api/users/:id
// @access Private
const getUser = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }
  res.status(200).json(user);
});

// @desc Register a new user
// @route POST /api/users/register
// @access
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please include all fields');
  }

  // Find if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isStaff: user.isStaff,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc Update user
// @route PUT /api/users/:id
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const { name, email, password, isAdmin } = req.body;

  // Validation
  if (!name && !email && !password && !isAdmin) {
    res.status(400);
    throw new Error('Please include at least one field');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  let hashedPassword = null;
  if (password) {
    hashedPassword = await bcrypt.hash(password, salt);
  }

  // Create user
  const updatedUser = await User.findByIdAndUpdate(req.params.id, {
    name: name || user.name,
    email: email || user.email,
    password: hashedPassword || user.password,
    isAdmin: isAdmin || user.isAdmin
  }, { new: true });

  if (updatedUser) {
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isStaf: updatedUser.isStaff,
      isAdmin: updatedUser.isAdmin
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  await user.remove();

  res.status(200).json({ success: true });
});

// @desc Log in user
// @route POST /api/users/login
// @access
const loginUser = asyncHandler(async (req, res) => {
  const { email, password, authLen } = req.body;
  const user = await User.findOne({ email });
  
  // Check user and password match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isStaff: user.isStaff,
      isAdmin: user.isAdmin,
      token: generateToken(user._id, authLen || null)
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

// Generate token
const generateToken = (id, authLen) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.NODE_ENV === 'development' ? (authLen || '15m') : '12h'
  });
}

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
  getMe,
}