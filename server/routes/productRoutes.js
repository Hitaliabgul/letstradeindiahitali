const express = require('express');
const router = express.Router();
const { processPayment, getKey, paymentVerification } = require('../controllers/productController');

router.post('/payment/process', processPayment);
router.get('/getKey', getKey);
router.post('/paymentVerification', paymentVerification);


module.exports = router;