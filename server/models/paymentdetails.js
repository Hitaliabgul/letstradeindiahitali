const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  
  razorpay_payment_id: { type: String, required: true },
  razorpay_order_id: { type: String, required: true },
  razorpay_signature: { type: String, required: true },
  referralCode:{type: String},

  
 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", PaymentSchema);