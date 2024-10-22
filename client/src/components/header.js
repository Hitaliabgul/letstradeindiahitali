import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  function my() {
    console.log(location.pathname);
    switch (location.pathname) {
      case '/':
        return 'Home';
      case '/about':
        return 'About';
      case '/dashboard':
        return 'Dashboard';
      case '/courses':
        return 'Course';
      case '/course1':
        return 'I F';
      case '/course2':
        return 'F&O';
      case '/course3':
        return 'Combo';
      case '/reg':
        return 'Login';
      default:
        return '404';
    }
  }

  return (
    <div className='bg-[#0f0f0f] text-white font-bold py-2 px-4 flex justify-between items-center shadow-[0_4px_10px_rgba(255,255,255,0.3)]'>
      {/* Logo */}
      <Link to='/' className="flex-shrink-0">
        <img src={logo} className="h-12 sm:h-14 ml-3" alt="logo" />
      </Link>
      
      {/* Sign In Button */}
      <div className='flex justify-end'>
        <Link to='/dashboard'>
          <button className='text-blue-500 border border-blue-500 px-3 sm:px-6 py-1 rounded-full hover:bg-blue-500 hover:text-white transition duration-300 text-sm sm:text-base mr-10'>
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
}
/*  middle page title
<div className='flex justify-center w-full'>
<div className='m-1 px-4 sm:px-20 bg-black-700 border-2 rounded-full text-[#216825] py-2 text-center text-lg sm:text-2xl max-sm:px-6'>
  {my()}
</div>
</div>
*/
export default Header;
