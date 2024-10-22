import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const EditForm = ({ user, onSave, onCancel }) => {
  const [editedUser, setEditedUser] = useState(user);
  const navigate=useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  const handleSave = async(e) => {
    e.preventDefault();   
    console.log("hii")
    if (editedUser.email.endsWith('gmail.com')) {
      if (editedUser.name && editedUser.email) {
        try {
          const res = await axios.put(`http://localhost:5000/api/auth/update/${onSave}`, editedUser);
        
          if (res.data.message === 'User details updated successfully') {
            toast.success(res.data.message);
            navigate('/'); // Redirect to the home page after successful update

          } else if (res.data.message === 'User not found') {
            toast.error('User not found');
          } else {
            toast.error('Something went wrong');
          }
        } catch (error) {
          toast.error('Something went wrong');
        }
      } else {
        toast.error('Please fill in all required fields');
      }
    } else {
      toast.error('Invalid email address');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg edit-user">
      <h2 className="text-3xl font-bold mb-4 text-white">Edit Profile</h2>
      <ToastContainer className="sticky" />
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <input
            className="w-full p-2 border rounded-lg field2"
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            className="w-full p-2 border rounded-lg field2"
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Phone:</label>
          <input
            className="w-full p-2 border rounded-lg field2"
            type="text"
            name="phone"
            value={editedUser.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Telegram No.:</label>
          <input
            className="w-full p-2 border rounded-lg field2"
            type="text"
            name="telegram"
            value={editedUser.telegram}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">City:</label>
          <input
            className="w-full p-2 border rounded-lg field2"
            type="text"
            name="city"
            value={editedUser.city}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">State:</label>
          <input
            className="w-full p-2 border rounded-lg field2"
            type="text"
            name="state"
            value={editedUser.state}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Pincode:</label>
          <input
            className="w-full p-2 border rounded-lg field2"
            type="text"
            name="pincode"
            value={editedUser.pincode}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
  


