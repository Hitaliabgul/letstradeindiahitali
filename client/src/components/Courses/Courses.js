import React from "react";
import Card from "../Home/Card";
import CourseCard from "../Home/courseCard";

function createCard(coursep) {
  return (
    <Card
      img={coursep.img}
      title={coursep.title}
      price={coursep.price}
      offer={coursep.offer}
    />
  );
}
function Courses() {
  const Container = {
    margin: "0 auto",
    background:
      "linear-gradient(89.93deg, rgba(56, 142, 60, 0) -574.96%, rgba(105, 99, 168, 0.453133) -574.88%, rgba(128, 124, 182, 0.460452) -127.91%, rgba(255, 255, 255, 0.5) 250.37%)",
    borderRadius: "50px",
    filter: "drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25))",
  };
  return (
    <>
      <div className="relative inline-flex w-full justify-evenly pt-3 container-card">
        <div className=" flex flex-col justify-center space-y-4 ">
          <div style={Container} className=" w-[100%]  ">
            <div className="flex justify-around p-8 max-sm:flex-col-reverse ">
              <div className="py-3 pl-10 w-5/6">
                <p className="py-4 pb-10 text-[#2F2F2F] font-medium text-xl max-sm:text-justify  ">
                  Get Together Finance (GTF) is one of the best share market
                  institute in Jaipur. Currently, the share market education
                  courses are designed to suit learning requirements of the
                  students, traders, investors, and working professionals where
                  they can learn how to trade in stock market using the
                  technical analysis based on chart reading techniques (trading
                  in the zone). These stock trading techniques can be applied
                  perfectly on equity, forex, currency, commodities etc. to give
                  you better monetary returns or to generate wealth in the share
                  market.
                </p>
              </div>

              <div class="flex items-center px-3 pr-20 max-sm:p-0">
                <img
                  src={process.env.PUBLIC_URL + "/Images/image7.png"}
                  className="rounded-2xl px-4 pr-0 max-sm:p-0"
                  alt=""
                />
              </div>
            </div>
            {/* content */}
          </div>
          <div className=" flex flex-col justify-center items-center">
            <dl className="justify-center dictionary flex">
              {CourseCard.map(createCard)}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}

export default Courses;
