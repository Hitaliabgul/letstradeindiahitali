import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

const Header = () => {
  return (
    <div className="bg-[#0f0f0f] text-white font-bold py-2 px-4 flex justify-between items-center shadow-[0_4px_10px_rgba(255,255,255,0.3)]">
      {/* Logo */}
      <Link to="/" className="flex-shrink-0">
        <img src={logo} className="h-12 sm:h-14 ml-3" alt="logo" />
      </Link>

      {/* Conditional Button 
      <div className="flex justify-end">
      
        
          <Link to="/reg">
            <button className="text-blue-500 border border-blue-500 px-3 sm:px-6 py-1 rounded-full hover:bg-blue-500 hover:text-white transition duration-300 text-sm sm:text-base mr-10">
              Sign In
            </button>
          </Link>
          
         
      </div>*/}  
    </div>
  );
};

export default Header;


