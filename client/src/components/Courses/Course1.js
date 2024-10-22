import React from 'react';
import { Link } from 'react-router-dom';

export default function Course1(data) {

  return (
    <>

      <div className="flex justify-around pb-4 py-8 pt-20 max-sm:flex-col max-sm:p-0 max-sm:items-center">
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
              <span className="px-10 text-[#216825] font-medium max-sm:p-0">₹4,999</span>{" "}
            </div>
          </div>

          <div className="flex flex-row flex-wrap p-3 pt-6">
            <Link to="/reg?course=InstitutionFootprints" className="bg-[#327E36] hover:bg-[#1E2A55] text-white font-bold py-2 px-4 border-b-4 border-[#327E36] hover:border-[#1E2A55] rounded-xl max-sm:justify-center">
              Buy Now
            </Link>
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
