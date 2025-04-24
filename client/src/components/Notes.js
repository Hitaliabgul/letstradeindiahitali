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

const ComingSoonModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg text-center w-11/12 max-w-md shadow-lg relative animate-fadeIn">
        {/* Close Icon */}
        <div
          className="absolute top-1 right-4 text-gray-500 hover:text-gray-700 font-bold text-3xl cursor-pointer"
          onClick={onClose}
        >
          &times;
        </div>
        {/* Modal Title */}
        <div className="text-xl font-bold mb-2">Coming Soon!</div>
      </div>
    </div>
  );
};

const Notes = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleDownload = (language) => {
    // Show the Coming Soon modal
    setShowModal(true);

    // Later when notes are ready:
    // axios.get(...) etc.
  };

  const handlePhysicalNotesClick = () => {
    setShowModal(true);
   // navigate('/request-physical-notes');
  };

  return (
    <div>
      <div className="notes-topheader">
        <p>Dive into our comprehensive notes, crafted to cover all the key concepts you need</p>
        <p>Download now to keep your resources handy, anytime, anywhere!</p>
      </div>

      <div className="main-notes-container flex-col sm:flex-row gap-4">
        <div className="notes-container">
          <h2 className="notes-head2">Download Notes</h2>
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

        <div className="vertical-divider"></div>
        <div className="divider sm:divider w-full h-[1px] bg-gray-300 sm:w-[1px] sm:h-auto"></div>

        <div className="notes-container">
          <h2 className="notes-head2">Request Physical Notes</h2>
          <div className="notes-card-container flex flex-col sm:flex-row gap-4">
            <NotesCard
              title="Physical Notes"
              imageSrc="Images/image-4.jpg"
              onDownload={handlePhysicalNotesClick}
              buttonLabel="Request"
            />
          </div>
        </div>
      </div>

      <ComingSoonModal show={showModal} onClose={() => setShowModal(false)} />
      <ToastContainer />
    </div>
  );
};

export default Notes;