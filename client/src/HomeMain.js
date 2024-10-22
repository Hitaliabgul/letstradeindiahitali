import React, { useEffect, useRef } from 'react';
import Navbar from './components/navbar';
import Header from './components/header';
import Footer from './components/Footer';
import { Outlet, useLocation } from 'react-router-dom';

function HomeMain() {
  const location = useLocation();
  const innerScrollRef = useRef(null);

  useEffect(() => {
    // Scroll to the top of the inner content when the route changes
    if (innerScrollRef.current) {
      innerScrollRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  return (
    <div>
      <Header />
      <div className="flex w-screen">
        <Navbar />
        <div className="overflow-y-scroll h-[91vh] w-full" ref={innerScrollRef}>
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default HomeMain;
