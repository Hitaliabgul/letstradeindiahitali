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
      courseUrl={coursep.courseUrl}
    />
  );
}
function Courses() {
  const Container = {
    margin: "0 50px",
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
               <h1 className="text-5xl justify-center items-center ">LET'S TRADE INDIA</h1>
              </div>

              <div clasName="flex items-center px-3 pr-20 max-sm:p-0">
                
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
