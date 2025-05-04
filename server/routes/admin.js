// routes/admin.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET /api/admin/users - Return all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
