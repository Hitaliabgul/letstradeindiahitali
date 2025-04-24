import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react"; 
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie"; // Import the js-cookie library

const PaymentSuccess = () => {
  const queryParams = new URLSearchParams(useLocation().search);
  const referralCode = queryParams.get("refer");
  const paymentIdParam = queryParams.get("reference");

  const generatedReferralLink = `${window.location.origin}/#/?refer=${referralCode}`;

  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState(null); // State to store the email

  // Function to copy the referral link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedReferralLink)
      .then(() => {
        setCopied(true);
        toast.success("Referral Link Copied!");

        // Reset the button label after 2 seconds
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        toast.error("Failed to copy referral link.");
        console.error(err);
      });
  };

  // Fetch email from the cookie
  useEffect(() => {
    const userCookie = Cookies.get("user"); // Get the 'user' cookie
    if (userCookie) {
      const user = JSON.parse(userCookie); // Parse the JSON string
      setEmail(user.email); // Set email state
    }
  }, []);

  // Save the referral link to the backend once email is fetched
  useEffect(() => {
    if (!email) return;

    const saveReferralLink = async () => {
      try {
        const response = await axios.put("http://localhost:5000/api/auth/updateReferralLink", {
          email,
          referralLink: generatedReferralLink,
        });

        console.log("Referral link saved:", response.data);
      } catch (err) {
        console.error("Error saving referral link:", err);
        toast.error("Failed to save referral link");
      }
    };

    saveReferralLink();
  }, [generatedReferralLink, email]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <h1 className="text-2xl font-bold text-green-700">Payment Successful 🎉</h1>
      <p className="text-gray-600 mt-2">Thank you for your purchase!</p>

      {paymentIdParam && (
        <div className="mt-4 p-4 bg-white shadow-md rounded-md">
          <p className="text-gray-700 font-medium">Payment ID:</p>
          <p className="text-gray-900 font-bold">{paymentIdParam}</p>
        </div>
      )}

      {referralCode && (
        <div className="mt-4 p-4 bg-white shadow-md rounded-md">
          <p className="text-gray-700">Your Referral Link:</p>
          <input
            type="text"
            value={generatedReferralLink}
            readOnly
            className="w-full p-2 mt-2 border border-gray-300 rounded"
          />
          <button
            onClick={copyToClipboard}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {copied ? "Copied!" : "Copy Link"}
          </button>
          <div className="mt-4 flex flex-col items-center">
            <p className="text-gray-700">Scan QR Code:</p>
            <QRCodeCanvas value={referralCode} size={150} className="mt-2" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
