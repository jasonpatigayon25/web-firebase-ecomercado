import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import SidebarOptions from "./SidebarOptions";
import "../css/Admin.css";
import { FaBan, FaUser, FaUserAlt, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

function UserActivity() {
  const { email } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      try {
        const q = query(collection(db, 'users'), where('email', '==', email));
        const querySnapshot = await getDocs(q);
        const userData = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              ...data,
              dateRegistered: data.dateRegistered ? data.dateRegistered.toDate() : null,
            };
          })[0];

        setUserDetails(userData);
      } catch (err) {
        console.error("Error fetching user details: ", err);
        setError("Failed to fetch user details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [email]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userDetails) {
    return <div>No user found.</div>;
  }

  const handleBanUser = () => {
    const confirmBan = window.confirm(`Are you sure you want to ban ${userDetails.firstName} ${userDetails.lastName}?`);
    if (confirmBan) {
      console.log('User banned:', userDetails.email);
    }
  };

  return (
    <div className="admin-dashboard">
      <SidebarOptions />
      <div className="admin-dashboard-content">
      <div className="user-details-card">
        <FaBan className="card-ban-icon" onClick={handleBanUser} />
        <div className="card-avatar">
          {userDetails.photoUrl ? (
            <img src={userDetails.photoUrl} alt="Profile" />
          ) : (
            <FaUser size={50} />
          )}
        </div>
        <div className="card-info">
          <h1><FaUserAlt className="info-icon" /> {userDetails.firstName} {userDetails.lastName}</h1>
          <p><FaEnvelope className="info-icon" /> {userDetails.email}</p>
          <p><FaMapMarkerAlt className="info-icon" /> {userDetails.address}</p>
          <p><FaCalendarAlt className="info-icon" /> {userDetails.dateRegistered ? new Date(userDetails.dateRegistered).toLocaleDateString() : 'N/A'}</p>
        </div>
      </div>
      </div>
    </div>
  );
}

export default UserActivity;
