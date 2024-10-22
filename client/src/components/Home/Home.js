import React, { useEffect } from "react";
import ImageSlider from "./ImageSlider";
import Card from "./Card";
import CourseCard from "./courseCard";
import img1 from "./image-1.jpg";
import img2 from "./image-2.jpg";
import img3 from "./image-3.png";
import img4 from "./image-4.jpg";
import { useSearchParams } from "react-router-dom";

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

function Home() {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    localStorage.setItem("refer", searchParams.get("refer"));
    console.log(searchParams);
  }, [searchParams]);

  useEffect(() => {
    if(searchParams.size){
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

  return () => {
    window.onload = null; }
  };

  }, [searchParams]);

  


  const slides = [
    { url: img4, title: "logo" },
    // { url: img1, title: "beach" },
    // { url: img2, title: "boat" },
    // { url: img3, title: "forest" },
  ];

  const containerStyles = {
    margin: "0 auto",
    borderRadiusTop:"",
  };

  const titleStyles = {
    color: "#000",
  };


  return (
    <>
      <div className="flex flex-wrap justify-evenly max-sm:mt-0 max-sm:pt-0">
        <div className="flex flex-col justify-center space-y-4 py-8 max-sm:p-0">
          <div
            style={containerStyles}
            className="w-[90vw] h-[80vh] max-sm:w-[100vw] max-sm:h-[50vh] "
          >
            <ImageSlider slides={slides}  className="slides-img"/>
          </div>

          <div className="flex flex-col justify-center items-center sel" id="section1">
            <div
              style={titleStyles}
              className="mt-8 h-auto rounded-none text-center font-mulish text-4xl font-bold leading-tight tracking-normal text-[#000]  max-sm:text-xl max-sm:w-72 max-sm:m-2"
            >
              We Offer The Following Mentorship Programs
            </div>
            <dl className="justify-center dictionary flex my-0 max-sm:mt-0">
              {CourseCard.map(createCard)}
            </dl>
          </div>

          {/* <div className="flex flex-col items-center text-center">
            <div
              style={titleStyles}
              className="m-8 h-auto rounded-none font-mulish text-4xl font-bold leading-tight tracking-normal text-[rgba(45, 85, 47, 1)] max-sm:text-xl max-sm:w-72 max-sm:m-2"
            >
              WHY YOU SHOULD JOIN LET'S TRADE INDIA?
            </div>
            <Middle />
          </div>

          <div className="flex flex-col items-center text-center m-4">
            <div
              style={titleStyles}
              className="m-8 h-auto rounded-none font-mulish text-4xl font-bold leading-tight tracking-normal text-[rgba(45, 85, 47, 1)]  max-sm:text-xl max-sm:w-72 max-sm:m-2"
            >
              HOW DOES IT WORK?
            </div>
            <div style={paraStyle} className="max-sm:text-xl max-sm:w-72 max-sm:m-2">
              Here are simple steps to start your journey with LTI
            </div>
            <Steps />
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Home;
