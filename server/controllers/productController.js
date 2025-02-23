const razorpay = require("../razorpayInstance");
const crypto = require("crypto");
//console.log('Razorpay Instance in Controller:', razorpay);
const processPayment = async (req, res) => {


  try {
    const options = {
      amount: Number(req.body.amount) * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };
    console.log("Received amount from frontend:", req.body.amount);

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Payment order creation failed!" });
  }
};



const getKey = async (req, res) => {
  res.status(200).json({
    key: process.env.RAZORPAY_ID_KEY
  })
}

const paymentVerification = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
  const razorpaySecret = process.env.RAZORPAY_SECRET_KEY;
  if (!razorpaySecret) {
    return res.status(500).json({ success: false, message: 'Server error: Secret key is missing' });
  }

  if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
    console.log('Missing required parameters');
    return res.status(400).json({ success: false, message: 'Missing required parameters' });
  }

  console.log('Request Body:', req.body);
  console.log('Razorpay Secret Key:', razorpaySecret);

  const generatedSignature = crypto
    .createHmac('sha256', razorpaySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  console.log('Generated Signature:', generatedSignature);
  console.log('Received Signature:', razorpay_signature);
  const referralCode = razorpay_payment_id.slice(-6);
  if (generatedSignature === razorpay_signature) {
    console.log('Payment verified successfully');
    // res.redirect(`http://localhost:3000/#/paymentSuccess?reference=${razorpay_payment_id}&refer=${referralCode}`)
    const frontendURL = process.env.CLIENT_URL;
    res.redirect(`${frontendURL}/#/paymentSuccess?reference=${razorpay_payment_id}&refer=${referralCode}`);

  } else {
    console.log('Payment verification failed');
    return res.status(400).json({ success: false, message: 'Payment verification failed!' });
  }

};

module.exports = { processPayment, getKey, paymentVerification };