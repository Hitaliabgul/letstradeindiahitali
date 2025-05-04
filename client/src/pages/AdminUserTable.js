// src/pages/AdminUserTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminUserTable.css';
const AdminUserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Error fetching users:', err))
      .finally(() => setLoading(false));
  }, []);   

  return (
    <div className="admin-table-container">
      <h2>User Database</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Telegram</th>
            <th>WhatsApp</th>
            <th>Country</th>
            <th>Pincode</th>
            <th>State</th>
            <th>City</th>
            <th>Referral Code</th>
            <th>Referral Link</th>
            <th>Courses Purchased</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="12" style={{ textAlign: 'center' }}>Loading...</td>
            </tr>
          ) : users.length > 0 ? (
            users.map(user => (
              <tr key={user._id}>
                <td>{user.firstname} {user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.telegram}</td>
                <td>{user.whatsapp}</td>
                <td>{user.country}</td>
                <td>{user.pincode}</td>
                <td>{user.state}</td>
                <td>{user.city}</td>
                <td>{user.referralcode}</td>
                <td>{user.referralLink}</td>
                <td>
                  {user.purchasedCourses.length > 0 ? (
                    <ul style={{ paddingLeft: '16px', margin: 0 }}>
                      {user.purchasedCourses.map((course, idx) => (
                        <li key={idx}>
                          {course.courseName} - ₹{course.amount} - {course.paymentId}<br />
                          <small style={{ color: 'gray' }}>
                            ({new Date(course.purchaseDate).toLocaleDateString()})
                          </small>
                        </li>
                      ))}
                    </ul>
                  ) : 'None'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" style={{ textAlign: 'center' }}>No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
  
};

export default AdminUserTable;
