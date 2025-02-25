const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import the User model

// Update user details
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, city, state, telegram, pincode } = req.body;

  try {
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user details
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.city = city || user.city;
    user.state = state || user.state;
    user.telegram = telegram || user.telegram;
    user.pincode = pincode || user.pincode;

    await user.save();

    res.json({ message: 'User details updated successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
