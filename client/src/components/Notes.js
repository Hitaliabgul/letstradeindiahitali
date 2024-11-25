import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const NotesCard = ({ title, imageSrc, onDownload, buttonLabel = "Download" }) => (
  <div className="notes-card">
    <img src={imageSrc} alt={`${title} Cover`} className="notes-image" />
    <h3>{title}</h3>
    <button onClick={onDownload} className="download-button">
      {buttonLabel}
    </button>
  </div>
);
const Notes = () => {

  const handleDownload = (language) => {
    axios
      .get(`http://localhost:5000/api/auth/notes/download/${language}`)
      .then((response) => {
        const { link } = response.data;

        if (!link) {
          toast.error('Failed to fetch the link. Please try again.');
          return;
        }

        // Open the Google Drive link in a new tab
        window.open(link, '_blank');
        toast.success(`${language.charAt(0).toUpperCase() + language.slice(1)} notes opened in a new tab!`);
      })
      .catch((error) => {
        console.error('There was an error fetching the link', error);
        toast.error('Failed to open notes. Please try again.');
      });
  };



  const navigate = useNavigate();

  const handlePhysicalNotesClick = () => {
    navigate('/request-physical-notes');
  };
  return (
    <div >
      <div className='notes-topheader'>
        <p>Dive into our comprehensive notes, crafted to cover all the key concepts you need </p>
        <p>  Download now to keep your resources handy, anytime, anywhere!</p>
      </div>
      <div className="main-notes-container flex-col sm:flex-row gap-4">

        <div className="notes-container ">
          <h2 className='notes-head2'>Download Notes</h2>
          <div className="notes-card-container flex flex-col sm:flex-row gap-4">
            <NotesCard
              title="English Notes"
              imageSrc="Images/image-4.jpg"
              onDownload={() => handleDownload('english')}
            />
            <NotesCard
              title="Hindi Notes"
              imageSrc="Images/image-4.jpg"
              onDownload={() => handleDownload('hindi')}
            />
          </div>
        </div>


        {/* Responsive Divider */}
        <div className="vertical-divider"></div>

        <div className=" divider sm:divider w-full h-[1px] bg-gray-300 sm:w-[1px] sm:h-auto"></div>


        <div className="notes-container">
          <h2 className='notes-head2'>Request Physical Notes</h2>
          <div className="notes-card-container flex flex-col sm:flex-row gap-4 ">
            <NotesCard
              title="Physical Notes"
              imageSrc="Images/image-4.jpg"
              onDownload={handlePhysicalNotesClick}
              buttonLabel="Request" // Set button text to "Request"

            />
          </div>

        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Notes;
