import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react"; 
import axios from "axios";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [referralLink, setReferralLink] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.hash);
    const referralCode = queryParams.get("refer");

    if (referralCode) {
      const generatedLink = `http://localhost:3000/#/?refer=${referralCode}`;
      setReferralLink(generatedLink);

      // Send referral link to the backend
      saveReferral(referralCode, generatedLink);
    }
  }, [navigate]);

  const saveReferral = async (referralCode, referralLink) => {
    try {
      await axios.post("http://localhost:5000/api/v1/save-referral", {
        referralCode,
        referralLink,
      });
      console.log("Referral link saved successfully");
    } catch (error) {
      console.error("Error saving referral:", error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral Link Copied!");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <h1 className="text-2xl font-bold text-green-700">Payment Successful 🎉</h1>
      <p className="text-gray-600 mt-2">Thank you for your purchase!</p>

      {referralLink && (
        <div className="mt-4 p-4 bg-white shadow-md rounded-md">
          <p className="text-gray-700">Your Referral Link:</p>
          <input
            type="text"
            value={referralLink}
            readOnly
            className="w-full p-2 mt-2 border border-gray-300 rounded"
          />
          <button
            onClick={copyToClipboard}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Copy Link
          </button>
          {/* QR Code Section */}
          <div className="mt-4 flex flex-col items-center">
            <p className="text-gray-700">Scan QR Code:</p>
            <QRCodeCanvas value={referralLink} size={150} className="mt-2" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
