import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTh,
  FaHome,
  FaBars,
  FaBookmark,
  FaBookReader,
  FaInfoCircle,
} from 'react-icons/fa';
//import logo from '../images/logo.png'; // Assuming you have a logo file

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const manuItem = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: <FaTh className="dashboard-icon"/>,
    },
    {
      path: '/',
      name: 'Home',
      icon: <FaHome className="home-icon"/>,
    },
    {
      path: '/MyLearning',
      name: 'MY Learning',
      icon: <FaBookmark />,
    },
    {
      path: '/courses',
      name: 'Course',
      icon: <FaBookReader />,
    },
    {
      path: '/about',
      name: 'About',
      icon: <FaInfoCircle />,
    },
  ];

  return (
    <>
      {/* Menu Toggle Button */}
      <button onClick={toggleVisibility} className='fabbut ' aria-label="Menu">
        <FaBars />
      </button>

      {/* Sidebar Navbar */}
      <div className='my-6 mx-2 bg-[#424242] w-48 h-full text-center rounded-3xl left-12 resNav max-h-[75vh] flex-wrap '>
        
      

        {/* Navigation Links */}
        <div className='p-5'>
          {manuItem.map((item) => (
            <NavLink 
              to={item.path} 
              key={item.name} 
              className="link flex items-center py-4 px-3 text-white hover:bg-[#1a1a1a] rounded-lg whitespace-nowrap"
              activeClassName="bg-[#1a1a1a]"
            >
              <div className='text-2xl mr-3'>{item.icon}</div> {/* Icon on the left */}
              <span>{item.name}</span> {/* Name of the menu item */}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Full-Screen Menu for Small Devices */}
      {isVisible && (
        <div className='p-5 h-screen w-screen bg-[#09092c] flow-root absolute z-10 text-center text-xl p-4'>
          {manuItem.map((item) => (
            <NavLink 
              to={item.path} 
              key={item.name} 
              className="link flex items-center py-3 px-4 text-white hover:bg-[#1a1a1a] rounded-lg whitespace-nowrap"
              onClick={toggleVisibility}
            >
              <div className='text-xl mr-3'>{item.icon}</div> {/* Icon */}
              <span>{item.name}</span> {/* Text */}
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
