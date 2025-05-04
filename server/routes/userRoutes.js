const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import the User model
const Payment = require('../models/paymentdetails'); // Import the Payment model

// Update user details
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email, phone, selectedCountry, city, selectedState, telegram, whatsapp, pincode } = req.body;

  try {
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user details
    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.country = selectedCountry || user.country;
    user.city = city || user.city;
    user.state = selectedState || user.state;
    user.telegram = telegram || user.telegram;
    user.whatsapp = whatsapp || user.whatsapp;
    user.pincode = pincode || user.pincode;

    await user.save();

    res.json({ message: 'User details updated successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch user details
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/purchased-courses/:userId
router.get('/purchased-courses/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ purchasedCourses: user.purchasedCourses });
  } catch (error) {
    console.error('Error fetching purchased courses:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;