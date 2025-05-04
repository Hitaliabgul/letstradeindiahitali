import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function PurchasedCourses() {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const userCookie = Cookies.get('user');
        const user = userCookie ? JSON.parse(userCookie) : null;
        const userId = user?._id;
  
        if (!userId) return console.error("User ID not found in cookies");
  
        const res = await axios.get(`http://localhost:5000/api/purchased-courses/${userId}`);
        setPurchasedCourses(res.data.purchasedCourses);
      } catch (err) {
        console.error("Error fetching purchased courses:", err);
      } finally {
        setLoading(false);  // Set loading to false after the fetch completes
      }
    };
  
    fetchCourses();
  }, []);
  
  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '2em', color: '#333' }}>List of Your Enrolled Courses</h2>
      
      {purchasedCourses.length === 0 ? (
        <p>You have not purchased any courses yet.</p>
      ) : (
        <table 
          style={{ 
            width: '80%', 
            margin: '0 auto', 
            borderCollapse: 'collapse', 
            border: '2px solid #000',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#FFFFF', color: 'black', fontSize: '1.1em' }}>
             
              <th style={{ border: '1px solid #000', padding: '12px' }}>Enrolled Course</th>
              <th style={{ border: '1px solid #000', padding: '12px' }}>Payment ID</th>
              <th style={{ border: '1px solid #000', padding: '12px' }}>Enrolled Date</th>
              <th style={{ border: '1px solid #000', padding: '12px' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {purchasedCourses.map((course, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f1f1f1' : 'white' }}>
               
                <td style={{ border: '1px solid #000', padding: '12px' }}>{course.courseName}</td>
                <td style={{ border: '1px solid #000', padding: '12px' }}>{course.paymentId}</td>
                 <td style={{ border: '1px solid #000', padding: '12px' }}>
                 {new Date(course.purchaseDate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',  // This will give the month in abbreviated form (e.g., "May")
    year: 'numeric', // This will display the full year (e.g., 2025)
  })}
                </td>
                <td style={{ border: '1px solid #000', padding: '12px' }}>₹ {course.amount}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PurchasedCourses;
