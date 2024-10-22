import { useState } from "react";

// import VideoPlayer from "../../components/CourseVideoComponents/VideoPlayer/VideoPlayer";
// import DetailDPComponent from "../../components/CourseVideoComponents/DetailDPComponent/DetailDPComponent";
// import CourseContentComponent from "../../components/CourseVideoComponents/CourseContentComponent/CourseContentComponent";
// import CourseViewTabComponent from "../../components/CourseVideoComponents/CourseViewTabComponents/CourseViewTabComponent/CourseViewTabComponent";

// import CourseVideoNavbar from "../../components/LayoutComponents/CourseVideoNavbar/CourseVideoNavbar";
import VideoPlayer from "../CourseVideoComponents/VideoPlayer/VideoPlayer"
import DetailDPComponent from "../CourseVideoComponents/DetailDPComponent/DetailDPComponent"
import CourseContentComponent from "../CourseVideoComponents/CourseContentComponent/CourseContentComponent"
import CourseViewTabComponent from "../CourseVideoComponents/CourseViewTabComponents/CourseViewTabComponent/CourseViewTabComponent"

import css from "./view.css";

import { courseData } from "./fakedata/fakedata";

const CourseViewPage = () => {
  const data = {
    title: "React - The Complete Guide (incl Hooks, React Router, Redux)",
  };

  const [playerFullWidth, setPlayerFullWidth] = useState(false);

  return (
    <div className={css.outterDiv}>
      <div className={css.bdy}>
        <div
          className={css.left}
          style={{ width: playerFullWidth ? "100%" : "75%" }}
        >
          <div
            className={css.content}
            style={{
              height: playerFullWidth ? "700px" : "600px",
            }}
          >
            <VideoPlayer
              data={{ autoplay: true }}
              playerWidthState={playerFullWidth}
              playerWidthSetter={setPlayerFullWidth}
            />
          </div>
          <CourseViewTabComponent />

        </div>
        <div
          className={css.right}
          style={{ display: playerFullWidth ? "none" : "block" }}
        >
          <DetailDPComponent
            title="Take a Udemy Assessment to check your skills"
            desc="Made by Udemy, this generalized assessment is a great way to check in on your skills."
            btnTxt="Launch Assessment"
          />
          <CourseContentComponent
            title="Course Content"
            data={courseData}
            playerWidthSetter={setPlayerFullWidth}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseViewPage;
