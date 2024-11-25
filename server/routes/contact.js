const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Load environment variables
require('dotenv').config();

// Email sending route
router.post('/', async (req, res) => {
    const { firstName, lastName, contactNumber, whatsappNumber, email, subject, message } = req.body;

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