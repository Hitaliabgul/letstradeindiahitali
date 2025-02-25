const Razorpay = require("razorpay");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});


module.exports = razorpay;
