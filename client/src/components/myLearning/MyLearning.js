import React from "react";
import { NavLink } from "react-router-dom";

import css from "./MyLearning.module.css";

const MyCoursesPage = () => {
  const tabs = [
    { name: "All Courses", link: "learning" },
  ];
  return (
    <div>
      <div className={css.outerDiv}>
        <div className={css.topBar}>
          <div className={css.topBarTtl}>My Learning</div>
        </div>
        <div className={css.menuBar}>
          <div className={css.links}>
            {tabs?.map((item) => (
              <NavLink
                key={item.name}
                to={item.link}
                className={({ isActive }) =>
                  isActive ? [css.link, css.linkActive].join(" ") : css.link
                }
              >
                {item.name}
              </NavLink>
            ))}
            </div>
        </div>
      </div>
    </div>
    
  );
};

export default MyCoursesPage;
