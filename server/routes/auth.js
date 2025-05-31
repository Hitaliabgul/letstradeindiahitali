// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const path = require('path');
const router = express.Router();
const fs = require('fs');
const app = express();
require('dotenv').config();
// Generate a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
// Get user details by ID
app.use(express.json());
router.post('/register', async (req, res) => {
   console.log("Received data:", req.body);
  try {
    const { firstname, lastname, email, phone, password, referralCode } = req.body;


    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create and save the new user
    const newUser = new User({ firstname, lastname, email, phone, password, referralCode: referralCode === "null" ? null : referralCode });
    await newUser.save();

    return res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      // Handle duplicate key error
      const field = Object.keys(error.keyValue)[0];
      const errorMessage = `Duplicate key error: ${field} already exists`;
      res.status(400).json({ success: false, message: errorMessage });
    } else {
      // Handle other errors
      res.status(500).json({ success: false, message: error.message });
    }
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
      secure: false,//process.env.NODE_ENV === 'production',  // HTTPS only in production
      sameSite: 'strict',
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
  const { firstname, lastname, email, contact, address, language, paperQuality, date } = req.body;

  // Validate required fields
  if (!firstname || !lastname || !email || !contact || !address || !date) {
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

Name: ${firstname}
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

// routes/auth.js


router.put("/updateReferralLink", async (req, res) => {
  const { email, referralLink } = req.body;

  if (!email || !referralLink) {
    return res.status(400).json({ message: "Email and referral link are required." });
  }

  try {
    // First, find the user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if referralLink already exists
    if (user.referralLink) {
      // If referralLink already exists, don't update it
      return res.status(200).json({
        message: "Referral link already exists. No update needed.",
        referralLink: user.referralLink
      });
    }

    // If referralLink does NOT exist, update it
    user.referralLink = referralLink;
    await user.save();

    res.status(200).json({
      message: "Referral link generated successfully.",
      referralLink: user.referralLink
    });

  } catch (error) {
    console.error("Error updating referral link:", error);
    res.status(500).json({ message: "Server error." });
  }
});

router.post('/contact', async (req, res) => {
  const { firstName, lastName, contactNumber, whatsappNumber, email, subject } = req.body;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false  // Disables certificate validation
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECEIVER_EMAIL,
    subject: `Contact Form Submission: ${subject}`,
    text: `
      Name: ${firstName} ${lastName}
      Contact Number: ${contactNumber}
      WhatsApp Number: ${whatsappNumber}
      Email: ${email}
      Message: ${subject}
    `,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});
module.exports = router;


