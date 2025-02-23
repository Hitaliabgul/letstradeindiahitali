import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Course1(data) {
  const [activeTab, setActiveTab] = useState("live");
  //const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(`/${path}`); // Assuming you're using React Router's `navigate` function
  };
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };
  // Retrieve user details from cookies
const userCookie = getCookie("user");

let storedUserDetails = null;
if (userCookie) {
  try {
    storedUserDetails = JSON.parse(decodeURIComponent(userCookie)); // Decode and parse the cookie
  } catch (error) {
    console.error("Error parsing user cookie:", error);
  }
}

console.log("Stored User Details from Cookie:", storedUserDetails);
  // Check if the user is logged in
  const checkLoginStatus = () => {
    {
      /*const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token);  // Debugging line
      setIsLoggedIn(!!token); // Update isLoggedIn state based on token presence
       */
      const userCookie = getCookie("user");  // Check for 'user' cookie
      console.log("User Cookie:", userCookie);  // Debugging line
      setIsLoggedIn(!!userCookie);  // Update state based on cookie presence

    }
  };

  // Check the login status whenever the component loads
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const loadRazorpay = async () => {
   console.log("Stored User Details:", storedUserDetails); // Debugging
    console.log("isLoggedIn status:", isLoggedIn);  // Debugging line
    if (!isLoggedIn) {
      alert("You need to log in first!");
      navigate("/dashboard");
      return;
    }
    // Check if Razorpay SDK is loaded
    if (!window.Razorpay) {
      console.error("Razorpay SDK is not loaded");
      alert("Razorpay failed to load. Please try again later.");
      return;
    }
    try {
      // Step 1: Create an order on the backend
     const {data:keyData}=await axios.get("http://localhost:5000/api/v1/getKey");
     console.log(keyData);
     const {key}=keyData;
     const {data:orderData}=await axios.post("http://localhost:5000/api/v1/payment/process", { amount: 9999 });
     console.log("Amount sent to backend:", 9999);
const {amount}=orderData;
     console.log(orderData);
   
    

      // Step 2: Initialize Razorpay with order details
      const options = {
        key, // Replace with your Razorpay Key ID
        amount,// Amount from the backend
        currency: "INR",
        name: "Institution Footprints",
        description: "Institution Footprints",
        image: "/Images/logo.png",
        order_id: orderData.id, // Razorpay order ID from the backend
        callback_url:"http://localhost:5000/api/v1/paymentVerification",
       


        



        prefill: {
          name: storedUserDetails.name,
          email: storedUserDetails.email,
          contact: storedUserDetails.contact,
        },
        theme: {
          color: "#F46262",
        },
      }


      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        alert(`Payment failed: ${response.error.description}`);
      });
      rzp.open();
    } catch (error) {
      console.error("Error loading Razorpay:", error);
      alert("Failed to initialize payment. Please try again.");
    }
    
  };


  return (
    <>
        <button
        className={`w-1/2 px-4 py-2 text-center rounded-full font-semibold transition-all duration-300 ${
          activeTab === "live"
            ? "bg-gray-600 text-white shadow-md"
            : "text-gray-700 hover:bg-gray-300"
        }`}
        onClick={() => handleClick("/Course1", "live")}
      >
        Live
      </button>

      <button
        className={`w-1/2 px-4 py-2 text-center rounded-full font-semibold transition-all duration-300 ${
          activeTab === "recorded"
            ? "bg-gray-600 text-white shadow-md"
            : "text-gray-700 hover:bg-gray-300"
        }`}
        onClick={() => handleClick("/recorded", "recorded")}
      >
        Recorded
      </button>
    <div className="w-100 h-[3px] bg-gray-400 mt-[-1px]"></div>

      <div className="flex justify-around pb-4 py-8 pt-20 max-sm:flex-col max-sm:p-0 max-sm:items-center">
        <div className="flex items-center pl-24 max-sm:p-0">
          <img
            src={process.env.PUBLIC_URL + "/Images/image-4.jpg"}
            className="rounded-2xl w-96 max-sm:rounded-none"
            alt=""
          />
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row flex-wrap p-3">
            <img
              src="/Images/image10.png"
              className="w-10 h-10 mx-4 inline-block pt-1"
              alt="duration"
            ></img>
            <div className="text-xl font-medium pt-2 text-[#000000]">
              Duration : <span className="px-20 font-normal max-sm:p-0">30 days</span>{" "}
            </div>
          </div>

          <div className="flex flex-row flex-wrap p-3">
            <img
              src="/Images/image11.png"
              className="w-10 h-10 mx-4 inline-block pt-1"
              alt="duration"
            ></img>
            <div className="text-xl font-medium pt-2 text-[#000000]">
              Language : <span className="px-20 font-normal max-sm:p-0">Hindi</span>{" "}
            </div>
          </div>

          <div className="flex flex-row flex-wrap p-3">
            <img
              src="/Images/image12.png"
              className="w-10 h-10 mx-4 inline-block pt-1"
              alt="duration"
            ></img>
            <div className="text-xl font-medium pt-2 text-[#000000]">
              Total Charges :{" "}
              <span className="px-10 text-[#216825] font-medium max-sm:p-0">₹9999</span>{" "}
            </div>
          </div>

          <div className="flex flex-row flex-wrap p-3 pt-6">
            {/*
          <Link to="/register?course=InstitutionFootprints" className="bg-[#327E36] hover:bg-[#1E2A55] text-white font-bold py-2 px-4 border-b-4 border-[#327E36] hover:border-[#1E2A55] rounded-xl max-sm:justify-center">
              Buy Now
            </Link>
          
          */}
            <button
              onClick={loadRazorpay}
              className="bg-[#327E36] text-white py-2 px-4 rounded text-white font-bold py-2 px-4 border-b-4 border-[#327E36] hover:border-[#1E2A55] rounded-xl max-sm:justify-center"
            >
              Buy Now
            </button>

          </div>
        </div>
      </div>

      {/* content */}
      <div className="flex flex-col p-12 max-sm:p-0 ">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold px-24 max-sm:p-0 max-sm:justify-center max-sm:flex">Content:</h2>
          <p className="text-xl font-medium px-24 pt-8 max-sm:px-4 max-sm:flex max-sm:justify-center">
            Part 1: Theory from 1990 To 2008.
          </p>
          <ol className="text-xl font-normal px-28 list-disc pt-4 max-sm:px-8 max-sm:text-base">
            <li>Stock Price Movement Theory.</li>
            <li>Basic & Core Concepts of Institutions.</li>
            <li> I. PO. (ROI) Theory using Doji Candlesticks.</li>
            <li>Complete, Incomplete & Takeover Candlesticks.</li>
            <li>L&B and E&B Candlesticks (Institutions Candlesticks).</li>
            <li>Supply & Demand Zones marking: Basic + Advanced (6 Types).</li>
            <li>Introduction to HRM, LRM & CM Methods using LBL Theory.</li>
            <li>NR & NRA Concepts & rules for Supply & Demand Zones Marking.</li>
          </ol>
          <p className="text-xl font-medium px-24 pt-8 max-sm:px-4 max-sm:flex max-sm:justify-center">
            Part 2: Theory from 2008 To 2013.
          </p>
          <ol className="text-xl font-normal px-28 list-disc pt-4 max-sm:px-8 max-sm:text-base">
            <li>Advanced NR, NRA & LBL Concepts.</li>
            <li>Multiple Time Frames Analysis.</li>
            <li>Institutions Peak & Valley Theory.</li>
            <li>Institutions Odd Enhancers (6 Types).</li>
            <li>Types of Entry, Exit & Targets (11 Concepts).</li>
          </ol>
          <p className="text-xl font-medium px-24 pt-8 max-sm:px-4 max-sm:flex max-sm:justify-center">
            Part 3: Theory from 2013 onwards.
          </p>
          <ul className="text-xl font-normal px-28 list-disc pt-4 max-sm:px-8 max-sm:text-base">
            <li>Flip Zones.</li>
            <li>Master Ema.</li>
            <li>Master Zones.</li>
            <li>Trend Analysis.</li>
            <li>Origin of Price Action.</li>
            <li>Breakout & Reversal Trading using Supply & Demand Zones.</li>
            <li>Intraday, Swing & Long Term Trading as per Supply & Demand Zones.</li>
            <li>Penny or Not Filtration using Advanced Supply & Demand Zones.</li>
            <li>Institutions Odd Enhancers (9 Types).</li>
            <li>How to Trade Against the Peak & Valley.</li>
            <li>Risk & Money Management, Human & Market Psychology & many more.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
