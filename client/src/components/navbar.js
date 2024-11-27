
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaAward, FaStickyNote, FaTimes } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import {
  FaTh,
  FaHome,
  FaBars,
  FaBookmark,
  FaBookReader,
  FaInfoCircle,
  FaPhoneAlt,
} from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  // State for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');

  //submit button
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const openContactModal = () => {
    setShowContactModal(true);
  };

  const closeContactModal = () => {
    setShowContactModal(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isSubmitting) return; // Prevent double submission
  
    setIsSubmitting(true);
  

     // Validate if all fields are empty
  if (!firstName || !lastName || !contactNumber || !whatsappNumber || !email || !subject) {
    toast.error('Please fill in all fields.');
    setIsSubmitting(false); // Reset submitting state after showing the message
    return;
  } 
   // Show "Processing your request..." toast when form submission starts
toast.info("Processing your request...");
    // If all validations pass, proceed with form submission
    const formData = {
      firstName,
      lastName,
      contactNumber,
      whatsappNumber,
      email,
      subject,
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        toast.success('Email sent successfully!');
        // Clear form fields after successful submission
        setFirstName('');
        setLastName('');
        setContactNumber('');
        setWhatsappNumber('');
        setEmail('');
        setSubject('');
      } else {
        toast.error('Failed to send email. Please try again.');
      }
    } catch (error) {


      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false); // Reset submitting state after processing
    }
  };
  

  const manuItem = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: <FaTh className="dashboard-icon" />,
    },
    {
      path: '/',
      name: 'Home',
      icon: <FaHome className="home-icon" />,
    },
    {
      path: '/playlist',
      name: 'MY Learning',
      icon: <FaBookmark />,
    },
    {
      path: '/courses',
      name: 'Course',
      icon: <FaBookReader />,
    },
    {
      path: '/notes',
      name: 'Notes',
      icon: <FaStickyNote />,
    },
    {
      path: '/about',
      name: 'About',
      icon: <FaInfoCircle />,
    },
    {
      path: '/reviews',
      name: 'Reviews',
      icon: <FaAward />,
    },
    {
      name: 'Contact Us',
      icon: <FaPhoneAlt />,
      onClick: openContactModal,
    },
  ];

  return (
    <>
      {/* Menu Toggle Button */}
      <button onClick={toggleVisibility} className="fabbut" aria-label="Menu">
        <FaBars />
      </button>

      {/* Sidebar Navbar */}
      <div className="my-6 mx-2 bg-[#424242] w-48 h-full text-center rounded-3xl left-12 resNav max-h-[75vh] flex-wrap z-10">
        <div className="p-5">
          {manuItem.map((item, index) => (
            <div key={index}>
              {item.path ? (
                <NavLink
                  to={item.path}
                  key={item.name}
                  className="link flex items-center py-4 px-3 text-white hover:bg-[#1a1a1a] rounded-lg whitespace-nowrap"
                  activeClassName="bg-[#1a1a1a]"
                >
                  <div className="text-2xl mr-3">{item.icon}</div>
                  <span>{item.name}</span>
                </NavLink>
              ) : (
                <button
                  onClick={item.onClick}
                  className="link flex items-center py-4 px-3 text-white hover:bg-[#1a1a1a] rounded-lg whitespace-nowrap"
                >
                  <div className="text-2xl mr-3">{item.icon}</div>
                  <span>{item.name}</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Full-Screen Menu for Small Devices */}
      {isVisible && (
        <div className="p-5 h-screen w-screen bg-[#09092c] flow-root absolute z-10 text-center text-xl p-4">
          {manuItem.map((item, index) => (
            item.path ? (
              <NavLink
                to={item.path}
                key={item.name}
                className="link flex items-center py-3 px-4 text-white hover:bg-[#1a1a1a] rounded-lg whitespace-nowrap"
                onClick={toggleVisibility}
              >
                <div className="text-xl mr-3">{item.icon}</div> {/* Icon */}
                <span>{item.name}</span> {/* Text */}
              </NavLink>
            ) : (
              <button
                key={index}
                onClick={() => {
                  toggleVisibility();
                  item.onClick && item.onClick(); // Call onClick only if defined
                }}
                className="link flex items-center py-3 px-4 text-white hover:bg-[#1a1a1a] rounded-lg whitespace-nowrap"
              >
                <div className="text-xl mr-3">{item.icon}</div> {/* Icon */}
                <span>{item.name}</span> {/* Text */}
              </button>
            )
          ))}
        </div>
      )}
      {showContactModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-30">
          <div className="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 p-6 flex flex-col relative modal-container">

            {/* Close Icon */}
            <button
              onClick={closeContactModal}
              className="cross absolute top-5 right-5 text-gray-500 hover:text-gray-700"
              aria-label="Close Modal"
            >
              <FaTimes className="fatimeicon text-2xl" />
            </button>

            {/* Top Section with "Let's Trade" Text */}
            <div className="w-full text-center mb-2">
              <h2 className="text-xl font-bold text-black-600 mb-2">Get in touch with us</h2>
              <p className=" text-md">Need help or have questions? Fill out the form below, and we’ll get back to you soon. </p>
              <p className="mb-2 text-md"> Thanks for reaching out!</p> 
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-12">
              {/* Call Icon and Number */}
              <div className="flex flex-col items-center text-center">
                <FaPhoneAlt className="text-black-100 text-xl" />
                <span className="text-md font-semibold text-black-700">Contact</span>
                
                <a href="https://wa.me/919967611652?text=Hi" target="_blank" rel="noopener noreferrer">
                Mobile: <span className="text-md font-semibold text-blue-500 hover:underline" >+91 9967611652</span>
</a>

              </div>

              {/* Mail Icon and Email */}
              <div className="flex flex-col items-center text-center">
                <FaEnvelope className="text-black-100 text-xl" />
                <span className="text-md font-semibold text-black-700">E-mail</span>
                <a
                  href="mailto:hitaliabgul@gmail.com"
                 
                >
                  Enquiry:<span  className="text-md font-semibold text-blue-500 hover:underline"> hitaliabgul@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Right Section with Contact Form */}
            <div className="bg-white-200 rounded-xl p-6 ">
              <h2 className="text-xl text-black-600 font-bold mb-3">Send us a message</h2>
              <form className="space-y-4" onSubmit={handleSubmit}>

                {/* First Name and Last Name */}
                <div className="flex flex-col md:flex-row md:space-x-4">
                  <div className="flex-1 form-group">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="First Name"
                        className="floating-input w-full p-2 mb-4 md:mb-2 border border-gray-300 rounded"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value.replace(/[^A-Za-z]/g, ''))}
                      />
                      <label className="floating-label">First Name*</label>
                    </div>
                  </div>
                  <div className="flex-1 form-group">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="floating-input w-full p-2 border border-gray-300 rounded"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value.replace(/[^A-Za-z]/g, ''))}
                      />
                      <label className="floating-label">Last Name*</label>
                    </div>
                  </div>
                </div>

                {/* Contact and WhatsApp Numbers */}
                <div className="flex flex-col md:flex-row md:space-x-4">
                  <div className="flex-1 form-group">
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="Contact No."
                        className="floating-input w-full p-2 mb-4 md:mb-2 border border-gray-300 rounded"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value.replace(/\D/g, ''))}
                      />
                      <label className="floating-label">Contact No.*</label>
                    </div>
                  </div>
                  <div className="flex-1 form-group ">
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="WhatsApp No."
                        className="floating-input w-full p-2 border border-gray-300 rounded"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                      />
                      <label className="floating-label">WhatsApp No.*</label>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="form-group">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Email*"
                      className="floating-input w-full p-2 md:mb-2  border border-gray-300 rounded"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="floating-label">Email*</label>
                  </div>
                </div>

                {/* Subject */}
                <div className="form-group">
                  <div className="relative">
                    <textarea
                      placeholder="Subject"
                      className="floating-input w-full p-2 border border-gray-300 rounded"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      rows="3"
                    ></textarea>
                    <label className="floating-label">Subject*</label>
                  </div>
                </div>

                {/* Submit and Close Buttons */}
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    onClick={closeContactModal}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
            <ToastContainer />
          </div>
        </div>
      )}

    </>
  );
};

export default Navbar;
