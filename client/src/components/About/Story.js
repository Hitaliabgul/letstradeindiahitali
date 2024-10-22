import React from "react";

export default function Story() {
  return (
    <div className="mt-10">
      <div className="text-4xl font-bold text-green-900 text-center">OUR STORY</div>

      <div className="flex flex-col md:flex-row justify-around items-center mt-10">
        <div className="py-6 md:pl-12 md:w-1/2">
          <p className="text-xl">
            LTI is a Share market education platform. Since March 24, 2020, we've been assisting learners of all ages
            in learning the trendiest courses in any field with diversified bundles.
          </p>

          <p className="mt-6 text-xl">
            LTI keeps culture and learning at the root of everything it does. We’re entrenched in creating a difference.
            Therefore, we strive to make a distinction in the way people approach entrepreneurship and education.
          </p>

          <p className="mt-6 text-xl">
            We deliver courses and bundles designed, created, and produced with real-world statistical data input for
            the folks we highly believe in.
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
