import React from "react";
const abc={
  background: "linear-gradient(89.93deg, rgba(56, 142, 60, 0) -574.96%, rgba(105, 99, 168, 0.455) -574.88%, rgba(128, 124, 182, 0.46) -127.91%, rgba(255, 255, 255, 0.5) 250.37%)"
}
export default function TopAbout() {
  return (
    <div className="relative rounded-2xl p-6 shadow-xl" style={abc}>
      <div className="flex flex-col items-center">
        <div className="text-4xl font-bold text-green-900">WE ARE</div>
        <img
          src={`${process.env.PUBLIC_URL}/Images/logo3d.png`}
          className="max-w-full py-6 h-56"
          alt="Logo"
        />
        <div className="text-5xl font-bold text-indigo-900">LET’S TRADE INDIA</div>
        {/*
        <p className="text-xl text-center text-green-900 font-medium py-4">
          Learn about Stock Market |
          <span className="text-indigo-900">Be Perfect</span>
        </p>
        */}
      </div>
    </div>
  );
}
