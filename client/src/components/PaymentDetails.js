import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentDetails = () => {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/v1/payment/details');
        setPaymentDetails(data.paymentDetails);
      } catch (err) {
        setError('Failed to fetch payment details');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Payment Details</h2>
      <p>Payment ID: {paymentDetails.razorpay_payment_id}</p>
      <p>Referral Code: {paymentDetails.referralCode}</p>
      <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${paymentDetails.referralCode}&size=200x200`} alt="QR Code" />
    </div>
  );
};

export default PaymentDetails;