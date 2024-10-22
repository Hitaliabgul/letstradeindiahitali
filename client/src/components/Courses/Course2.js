import React , {useEffect} from 'react';
import { Link } from 'react-router-dom';

export default function Course2(data) {
  useEffect(() => {
    console.log(window.location.hostname);
    const sectionId = "section1";
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
    const scrollToSection = () => {
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.onload = scrollToSection; 
  }, []);
  return (
    <>
      <div className="flex justify-around pb-4 py-8 pt-20 section1 max-sm:flex-col max-sm:p-0">
        <div class="flex items-center pl-24 max-sm:p-0">
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
              Duration : <span className="px-20 font-normal  max-sm:p-0">12 Days</span>{" "}
            </div>
          </div>

          <div className="flex flex-row flex-wrap p-3">
            <img
              src="/Images/image11.png"
              className="w-10 h-10 mx-4 inline-block pt-1"
              alt="duration"
            ></img>
            <div className="text-xl font-medium pt-2 text-[#000000]">
              Language : <span className="px-20 font-normal  max-sm:p-0">Hindi</span>{" "}
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
              <span className="px-10 text-[#216825] font-medium  max-sm:p-0">₹2,999</span>{" "}
            </div>
          </div>

          <div className="flex flex-row flex-wrap p-3 pt-6">
          <Link to="/reg?course=Future&Options" className="bg-[#327E36] hover:bg-[#1E2A55] text-white font-bold py-2 px-4 border-b-4 border-[#327E36] hover:border-[#1E2A55] rounded-xl max-sm:justify-center">
              Buy Now
            </Link>
          </div>
        </div>
      </div>

      {/* content */}
      <div className="flex flex-col p-12 max-sm:p-0 ">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold px-24 max-sm:p-0 max-sm:justify-center max-sm:flex">Content:</h2>
          <ol className="text-xl font-normal px-28 list-disc pt-4 max-sm:px-8 max-sm:text-base">
            <li>Difference between Equity, Futures & Options.</li>
            <li>Logic behind Future.</li>
            <li> Logic behind Call & Put Options.</li>
            <li>In-depth Terminology: LTP, Moneyness, Strike Price, Sopt Price, Underlying, OI, COI & Breakeven Point Calculations.</li>
            <li>Time Value & Intrinsic Value Calculation.</li>
            <li>Implied Volatility Calculation.</li>
            <li>Greeks Calculation: Delta, Gamma, Theta & Vega.</li>
            <li>Expiry & Strike Price calculation.</li>
            <li>Option Strategies: Single Leg & Multi Leg.</li>
            <li>Option Strategies adjustment as per Supply & Demand Zones.</li>
            <li>Rules for Index and Stock Options & Many more.</li>
          </ol>
        </div>
      </div>
    </>
  );
}
