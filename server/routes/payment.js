const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");
const protect = require("../middleware/authMiddleware"); // JWT verification middleware

// Save payment route
router.post("/save-payment", protect, async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, referralCode } = req.body;

    const newPayment = new Payment({
      userId: req.user.id, // extracted from JWT
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      referralCode,
    });

    await newPayment.save();

    res.status(200).json({ success: true, message: "Payment saved successfully" });
  } catch (err) {
    console.error("Error saving payment:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
