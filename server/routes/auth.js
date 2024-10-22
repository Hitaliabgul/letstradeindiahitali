// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router = express.Router();

// Generate a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  const { name, email, phone, password, referralCode } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({ name, email, phone, password, referralCode });
    await user.save();

    const token = generateToken(user._id);
    res.json({ message: 'User registered successfully', user, token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate a user & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = generateToken(user._id);
    res.json({ message: 'Login successful', user, token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/auth/update/:id
// @desc    Update user details
// @access  Public (Consider adding JWT authentication for security)
router.put('/update/:id', async (req, res) => {
  const { id } = req.params; // Extract user ID from the URL parameters
  const { name, email, phone, city, state, telegram, pincode } = req.body; // Extract the new data from the request body

  try {
      // Find the user by ID
      let user = await User.findById(id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Update user details with provided data or keep existing if not provided
      user.name = name !== undefined ? name : user.name;
      user.email = email !== undefined ? email : user.email;
      user.phone = phone !== undefined ? phone : user.phone;
      user.city = city !== undefined ? city : user.city;
      user.state = state !== undefined ? state : user.state;
      user.telegram = telegram !== undefined ? telegram : user.telegram;
      user.pincode = pincode !== undefined ? pincode : user.pincode;

      // Save the updated user data
      await user.save();

      // Send response with updated user data
      res.json({ message: 'User details updated successfully', user });
  } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).json({ message: 'Server error' }); // Send generic error message
  }
});



module.exports = router;
