const express = require("express");
const { processPayment, getKey, paymentVerification } = require("../controllers/productController");
    
const router = express.Router();

// Payment processing route
router.route("/payment/process").post(processPayment);
router.route("/getKey").get(getKey);
router.route("/paymentVerification").post(paymentVerification);
module.exports = router;
