
import React, { useState} from 'react';
import { ReactComponent as CopyIcon } from './copy-icon.svg'; // Replace with your copy icon SVG
import logoutImg from './logout.svg'
import EditForm from './EditUser';
import { ToastContainer } from 'react-toastify';  
import axios from 'axios';
import { toast } from 'react-toastify';
const Dashboard = ({ handleLogout, data }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [user, setUserDetails] = useState({
    _id: data._id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    city: data.city || '', // Allow user to enter city
    state: data.state || '', // Allow user to enter state
    telegram: data.telegram || '', // Allow user to enter telegram
    pincode: data.pincode || '', // Allow user to enter pincode
    referralCode: data.Myrefer,
  });
  console.log(user);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...user, [name]: value });
  };
  
  const handleSave = async () => {
    if (!user.name || !user.email || !user.phone || !user.city || !user.state || !user.telegram || !user.pincode) {
      toast.error("All fields are required!");
      return;
    }
  
    try {
      const response = await axios.put(`http://localhost:5000/api/update/${user._id}`, {
        name: user.name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        state: user.state,
        telegram: user.telegram,
        pincode: user.pincode,
      });

      if (response.status === 200) {
        toast.success('Details updated successfully!');
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update details!');
    }
  };
 
  
  const handleCopyReferralCode = () => {
    if(user.referralCode){
    let text = 'http://localhost:3000/#/?refer=' + user.referralCode
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);}
    else{
      alert("Please purchess the course")
    }
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
                    <label className="mb-1 text-gray-800 font-bold text-white">Name:</label>
                    <input className='field' value={user.name}/>
                  </div>
                  <div className="col-span-1">
                    <label className="mb-1 text-gray-800 font-bold text-white">Email:</label>
                    <input className='field' value={user.email}/>
                  </div>

                  
                    <div className="col-span-1">
                      <label className="mb-1 text-gray-800 font-bold text-white">Phone:</label>
                      <input className='field' value={user.phone}/>
                    </div>
                  
                 
                    <div className="col-span-1">
                      <label className="mb-1 text-gray-800 font-bold text-white">City:</label>
                      <input name="city" className='field' value={user.city} onChange={handleInputChange}/>
                    </div>
                  
                  
                    <div className="col-span-1">
                      <label className="mb-1 text-gray-800 font-bold text-white">Telegram:</label>
                      <input name="telegram" className='field' value={user.telegram} onChange={handleInputChange}/>
                    </div>
                  
                  
                    <div className="col-span-1">
                      <label className="mb-1 text-gray-800 font-bold text-white">State:</label>
                      <input name="state" className='field' value={user.state} onChange={handleInputChange}/>
                    </div>
                
                    <div className="col-span-1">
                      <label className="mb-1 text-gray-800 font-bold text-white">Pincode:</label>
                      <input  name="pincode" className='field' value={user.pincode} onChange={handleInputChange} />
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
                <div className="mt-8">
                  <h2 className="text-2xl font-bold mb-4 flex items-center text-white">
                    Referral link
                    <button
                      className="ml-2 focus:outline-none"
                      onClick={handleCopyReferralCode }
                    >
                      {isCopied ? (
                        <span className="text-green-500">Copied!</span>
                      ) : (
                        <CopyIcon className="w-4 h-4" />
                      )}
                    </button>
                  </h2>
                  {user.referralCode ? (
                    <p
                      className="text-gray-800 cursor-pointer"
                    >
                      http://localhost:3000/#/?refer={user.referralCode}
                    </p>
                  ) : (
                    <p className='field'> Buy The Course First</p>
                  )}
                </div>
              </div>
            
          </div>
        </div>
      </div>  
    </div>
  );
};

export default Dashboard;
