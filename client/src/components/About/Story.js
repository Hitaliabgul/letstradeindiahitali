import React from "react";

export default function Story() {
  return (
    <div className="mt-10">
      <div className="text-4xl font-bold text-green-900 text-center">OUR STORY</div>

      <div className="flex flex-col md:flex-row justify-around items-center mt-10">
        <div className="py-6 md:pl-12 md:w-1/2">
          <p className="text-xl m-5">
          Welcome to Let's Trade India, Established on 14th May 2020, we are dedicated to empowering individuals with the knowledge and skills needed to navigate the financial markets confidently.  
          </p>

          <p className="m-5 text-xl ">
          Our core expertise lies in teaching the Supply and Demand Zone concepts, a proven set-up for understanding market trends and making informed trading decisions. At Let's Trade India, we simplify complex market dynamics, helping traders and investors achieve their financial goals.    </p>

          <p className="m-5 text-xl">
          Join us to explore the world of trading, unlock new opportunities, and transform your financial future with clarity and confidence. Let’s trade smart, Let’s trade right, Let’s Trade India!
          </p>
        </div>
        <div className="flex items-center px-3">
          <img
            src={`${process.env.PUBLIC_URL}/Images/story.png`}
            className="w-full md:w-2/3 rounded-2xl"
            alt="Story"
          />
        </div>
      </div>
    </div>
  );
}
