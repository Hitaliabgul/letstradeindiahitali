// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const path = require('path');
const router = express.Router();
const fs = require('fs');
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
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if the password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate and send token if login is successful
    const token = generateToken(user._id);
    res.json({ message: 'Login successful', user, token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/auth/update/:id
// @desc    Update user details edit function
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
/*
router.put('/updatePassword', async (req, res) => { 
  const { email, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password and prevent double hashing
    user.password = hashedPassword;
    user.isModified = () => false; // Prevent `pre-save` from hashing again
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
*/

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Generate reset token and expiration
    const resetToken = user.setResetPasswordToken();
    await user.save(); // Save the token and expiration

    // Send the reset token to user's email (you can customize this with your email service)
    // Example using nodemailer to send email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'hitaliabgul@gmail.com',//process.env.EMAIL_USER,  // Make sure EMAIL_USER is configured in .env
        pass: 'tqnkqoermijmlyvi' //process.env.EMAIL_PASS,  // Make sure EMAIL_PASS is configured in .env
      },
      tls: {
        rejectUnauthorized: false, // Disable certificate validation (not recommended for production)
      },
    });

    const mailOptions = {
      from: 'hitaliabgul@gmail.com',
      to: user.email,
      subject: 'Password Reset',
      html: `<a href="http://localhost:3000/#/reset-password?token=${resetToken}">Click here to reset your password.</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Error sending email' });
      }
      res.json({ message: 'Password reset email sent' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/reset-password', async (req, res) => {
  const { token, newPassword, confirmPassword } = req.body;

  // Validate if both passwords match
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // Validate if password meets criteria (optional)
  if (newPassword.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  try {
    // Find the user by reset token
    const user = await User.findOne({ resetPasswordToken: token });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Check if token is valid
    if (!user.isResetTokenValid(token)) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Temporarily set the flag to avoid double hashing
    user.isResettingPassword = true;

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user password
    user.password = hashedPassword;
    user.resetPasswordToken = undefined; // Clear reset token
    user.resetPasswordExpire = undefined; // Clear expiration
    await user.save();

    res.json({ message: 'Password successfully reset' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/notes/download/:language', (req, res) => {
  const { language } = req.params;

  // Map language to Google Drive links
  const driveLinks = {
    english: 'https://drive.google.com/file/d/1pd_BWlzs9Mhd_xcc2xiQHydvwpofYUkD/preview',
    hindi: 'https://drive.google.com/file/d/1pd_BWlzs9Mhd_xcc2xiQHydvwpofYUkD/view?usp=drive_link',
  };

  const driveLink = driveLinks[language];
  if (!driveLink) {
    return res.status(400).send('Invalid language');
  }

  // Respond with the Google Drive link
  res.json({ link: driveLink });
});


// Route to request physical notes


router.post('/notes/request-physical', (req, res) => {
  const { name, email, contact, address, language, paperQuality, date } = req.body;
  
  // Validate required fields
  if (!name || !email || !contact || !address || !date) {
    return res.status(400).send('All fields are required');
  }

  // Validate address fields
  const { addressLine1, addressLine2, landmark, city, state, postalCode, country } = address || {};
  if (!addressLine1 || !city || !state || !postalCode || !country) {
    return res.status(400).send('Address details are incomplete');
  }

  // Set up the email transporter (use an email service like SendGrid for production)
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'hitaliabgul@gmail.com',
      pass: 'tqnkqoermijmlyvi', // Never hard-code sensitive information in production
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Ensure language and paper quality are extracted correctly
   language ? language.label : 'None'; // If language is not selected, use 'None'
   paperQuality ? paperQuality.label : 'None'; // If paper quality is not selected, use 'None'

  const mailOptions = {
    from: 'hitaliabgul@gmail.com',
    to: 'hitaliabgul@gmail.com', // Send this to the admin email
    subject: 'New Physical Notes Request',
    text: `Hello,

A new request for physical notes has been received with the following details:

Name: ${name}
User Email: ${email}
Contact: ${contact}

Address:
  - Address Line 1: ${addressLine1}
  - Address Line 2: ${addressLine2 || 'N/A'}
  - Landmark: ${landmark || 'N/A'}
  - City: ${city}
  - State/Province: ${state}
  - Postal/Zip Code: ${postalCode}
  - Country: ${country}


Requested Low Paper Quality: ${paperQuality}
Requested High Paper Quality: ${language}
Date: ${new Date(date).toLocaleDateString()}
      
Please process this request accordingly.

Thank you`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Error sending email');
    }

    console.log('Email sent:', info.response);
    res.status(200).send('Physical notes request received. An email has been sent with the details.');
  });
});









module.exports = router;