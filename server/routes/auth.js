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
    // Check if a user already exists with the same email or phone
    let existingUser = await User.findOne({ 
      $or: [{ email: email }, { phone: phone }]
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or phone number already exists' });
    }

    // Create new user
    const user = new User({ name, email, phone, password, referralCode });
    await user.save();

    // Generate token for authentication
    const token = generateToken(user._id);

    res.status(201).json({ message: 'User registered successfully', user, token });
  } catch (err) {
    console.error(err);
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

    // Store token or user info in cookie with httpOnly flag
    res.cookie('user', token, {
      httpOnly: true,  // Cookie cannot be accessed by JS
      secure:false ,//process.env.NODE_ENV === 'production',  // HTTPS only in production
      sameSite:'strict',
      maxAge: 3600000,  // Set cookie expiry time (1 hour)
    });

    res.json({ message: 'Login successful', user, token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/auth/update/:id
// @desc    Update user details edit function
// @access  Public (Consider adding JWT authentication for security)


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
        user: process.env.EMAIL_USER,//process.env.EMAIL_USER,  // Make sure EMAIL_USER is configured in .env
        pass: process.env.EMAIL_PASS, //process.env.EMAIL_PASS,  // Make sure EMAIL_PASS is configured in .env
      },
      tls: {
        rejectUnauthorized: false, // Disable certificate validation (not recommended for production)
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
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
    english: 'null',
    hindi: 'null',
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
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Never hard-code sensitive information in production
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Ensure language and paper quality are extracted correctly
   language ? language.label : 'None'; // If language is not selected, use 'None'
   paperQuality ? paperQuality.label : 'None'; // If paper quality is not selected, use 'None'

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_PASS, // Send this to the admin email
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