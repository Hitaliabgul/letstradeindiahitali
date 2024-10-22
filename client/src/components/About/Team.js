import React from "react";

export default function Team() {
  return (
    <div className="mt-10">
      <div className="text-4xl font-bold text-green-900 text-center">OUR TEAM</div>

      <div className="flex flex-col md:flex-row justify-center items-center mt-10">
        <div className="flex flex-col items-center md:w-1/2">
          <img
            src={`${process.env.PUBLIC_URL}/Images/profilePic.png`}
            className="w-[120px] md:w-[120px] rounded-full"
            alt="Profile Pic"
          />
          <div className="mt-4 text-xl font-medium text-center">Amitabh Bacchan</div>
          <p className="text-xl font-medium text-center">Founder</p>
        </div>
      </div>
    </div>
  );
}
