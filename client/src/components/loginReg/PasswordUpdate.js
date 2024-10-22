import React, { useState } from 'react';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
function PasswordUpdate() {
  const [formData, setFormData] = useState({
    email: '',
    currentPassword: '',
    newPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to your Express backend to update the password
      const response = await axios.put('https://testlt.onrender.com/updatePassword', formData);
      console.log(response.data);
      toast.success("Password Updated Successfully")

      setTimeout(() => {
        window.location.href = "https://letstradeindia.co/#/dashboard";
      }, 2000);
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error(error)
      // Handle errors, e.g., display an error message to the user
    }
  };

  return (
    <>
      <ToastContainer className="sticky" />
      <div className="max-w-md mx-auto mt-6 p-4 bg-white rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Password Update</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Current Password:</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">New Password:</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded w-full"
          >
            Update Password
          </button>
        </form>
      </div>
    </>
  );
}

export default PasswordUpdate;
