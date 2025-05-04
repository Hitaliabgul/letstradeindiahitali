import React, { useEffect, useState } from 'react';
import { ReactComponent as CopyIcon } from './copy-icon.svg'; // Replace with your copy icon SVG
import logoutImg from './logout.svg'
import EditForm from './EditUser';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { toast } from 'react-toastify';
import Select from 'react-select';
import PaymentSuccess from '../paymentSuccess';
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';

const Dashboard = ({ handleLogout, data }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUserDetails] = useState({
    _id: data._id,
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    phone: data.phone,
    country: data.country || '', // Allow user to enter city
    city: data.city || '', // Allow user to enter city
    state: data.state || '', // Allow user to enter state
    telegram: data.telegram || '', // Allow user to enter telegram
    whatsapp: data.whatsapp || '', // Allow user to enter telegram

    pincode: data.pincode || '', // Allow user to enter pincode
    referralCode: data.Myrefer,
    referralLink: data.referralLink,
  });
  console.log(user);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  // Fetch countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countryList = response.data.map((country) => ({
          label: country.name.common,
          value: country.name.common,
        }));
        setCountries(countryList);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);

  // Fetch states when country is selected
  useEffect(() => {
    if (selectedCountry) {
      const fetchStates = async () => {
        try {
          const response = await axios.post(
            `https://countriesnow.space/api/v0.1/countries/states`,
            { country: selectedCountry.value }
          );
          const stateList = response.data.data.states.map((state) => ({
            label: state.name,
            value: state.name,
          }));
          setStates(stateList);
        } catch (error) {
          console.error('Error fetching states:', error);
        }
      };
      fetchStates();
    }
  }, [selectedCountry]);

  // Fetch user details when the component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${user._id}`);
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, [user._id]); // Runs when userId changes

  // Handle input change
  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (user.country) {
      setSelectedCountry({ label: user.country, value: user.country });
    }
    if (user.state) {
      setSelectedState({ label: user.state, value: user.state });
    }
  }, [user]); // Run this effect whenever `user` changes

  const handleSave = async () => {
    if (!user.firstname || !user.lastname || !user.email || !user.phone || !selectedCountry || !user.city || !selectedState || !user.telegram || !user.whatsapp || !user.pincode) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/update/${user._id}`, {
        ...user,
        country: selectedCountry.value,
        state: selectedState.value,
      });
      if (response.status === 200) {
        toast.success('Details updated successfully!');
        // Refetch updated user data
        const updatedUser = await axios.get(`http://localhost:5000/api/user/${user._id}`);
        setUserDetails(updatedUser.data);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update details!');
    }
  };
  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(user.referralLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };



  return (
    <div className="min-h-screen bg-black-100 py-6 flex flex-col justify-center sm:py-12 border-l-[rgb(50,50,50)] border-l-2">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <ToastContainer className="sticky" />
        {/* {!(user.state && user.city && user.pincode) && ( */}
        <div className=' text-green-700 mb-5 font-bold '>Let’s make this journey easier!</div>
        <div className=' text-green-700 mb-5 font-bold'>Reach out to Krunal Parab on WhatsApp at 9967611652 for any further processes. Your support is just a message away!</div>

        {/* // )} */}
        <div className="relative w-full mx-auto px-4 py-10 bg-black-100 shadow rounded-3xl sm:p-10 dashboard-main max-sm:rounded-none">
          <div className="flex justify-end">

            <button className="relative pt-3" onClick={handleLogout}>
              <img src={logoutImg} className="h-6 logout-img" alt="Logout" />
            </button>
          </div>
          <div className="max-w-md mx-auto">

            <div>
              {/* Display user details here */}
              <h2 className="text-3xl font-bold mb-4 text-white">Profile Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label className="mb-1 text-gray-800 font-bold text-white">First Name:</label>
                  <input className='field' value={user.firstname} />
                </div>
                <div className="col-span-1">
                  <label className="mb-1 text-gray-800 font-bold text-white">Last Name:</label>
                  <input className='field' value={user.lastname} />
                </div>

                <div className="col-span-1">
                  <label className="mb-1 text-gray-800 font-bold text-white">Email:</label>
                  <input className='field' value={user.email} />
                </div>

                <div className="col-span-1">
                  <label className="mb-1 text-gray-800 font-bold text-white">Phone:</label>
                  <input className='field' value={user.phone} />
                </div>

                <div className="col-span-1">
                  <label className="mb-1 text-gray-800 font-bold text-white">City:</label>
                  <input name="city" className='field' value={user.city} onChange={handleInputChange} />
                </div>

                <div className="col-span-1">
                  <label className="mb-1 text-gray-800 font-bold text-white">Telegram Number  :</label>
                  <input name="telegram" className='field' value={user.telegram} onChange={handleInputChange} />
                </div>
                <div className="col-span-1">
                  <label className="mb-1 text-gray-800 font-bold text-white">WhatsApp Number:</label>
                  <input name="whatsapp" className='field' value={user.whatsapp} onChange={handleInputChange} />
                </div>

                <div className="col-span-1">
                  <label className="mb-1 text-gray-800 font-bold text-white">State:</label>
                  <Select
                    className='field'
                    options={states}
                    value={selectedState}
                    onChange={setSelectedState}
                    placeholder="State"

                  />
                </div>
                <div className="col-span-1">
                  <label className="mb-1 text-gray-800 font-bold text-white">Country:</label>
                  <Select
                    className='field'

                    options={countries}
                    value={selectedCountry}
                    onChange={setSelectedCountry}
                    placeholder="Country..."
                  />
                </div>

                <div className="col-span-1">
                  <label className="mb-1 text-gray-800 font-bold text-white">Pincode:</label>
                  <input name="pincode" className='field' value={user.pincode} onChange={handleInputChange} />
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
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <label className="text-white font-bold">Your Referral Link:</label>
                <div className="flex items-center mt-1">
                  {user.referralLink ? (
                    <>
                      <input
                        type="text"
                        className="w-full mr-2 px-2 py-1 rounded border border-gray-300"
                        readOnly
                        value={user.referralLink}
                      />
                      <button
                        onClick={handleCopyReferralCode}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                      >
                        {isCopied ? 'Copied!' : 'Copy'}
                      </button>
                    </>
                  ) : (
                    <input
                      type="text"
                      className="w-full mr-2 px-2 py-1 rounded border border-gray-300"
                      readOnly
                      value="Buy the course first"
                    />
                  )}
                </div>
              </div>


            </div>
            {user.referralLink && (
  <div className="mt-8 text-center">
    <h3 className="text-white font-bold mb-2">Your Referral QR Code:</h3>
    <div className="inline-block bg-white p-4 rounded">
      <QRCodeCanvas
        value={user.referralLink}
        size={200} // Size of the QR code (in pixels)
        bgColor="#ffffff" // Background color
        fgColor="#000000" // QR code color
        level="H" // Error correction level (L, M, Q, H)
      />
    </div>
  </div>
)}


          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

