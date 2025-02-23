import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details from localStorage or from your API
    const storedUserDetails = JSON.parse(localStorage.getItem("user"));

    if (!storedUserDetails) {
      alert("You need to log in first!");
      navigate("/login");  // Redirect to login if no user details found
      return;
    }

    setUserDetails(storedUserDetails);
  }, [navigate]);

  return (
    <div className="profile-page">
      {userDetails ? (
        <div className="profile-container">
          <h2>User Profile</h2>
          <div className="profile-details">
            <p><strong>Name:</strong> {userDetails.name}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Contact:</strong> {userDetails.contact}</p>
            <p><strong>Address:</strong> {userDetails.address || "N/A"}</p>
            {/* Add more user details here */}
          </div>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default Profile;
