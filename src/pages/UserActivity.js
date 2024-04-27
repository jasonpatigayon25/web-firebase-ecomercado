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

  const [activeTab, setActiveTab] = useState('pendingProducts');

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
  
  const fetchPendingProducts = () => { /* ... */ };
  const fetchPendingDonations = () => { /* ... */ };
  const fetchApprovedProducts = () => { /* ... */ };
  const fetchApprovedDonations = () => { /* ... */ };
  const fetchDeclinedProducts = () => { /* ... */ };
  const fetchDeclinedDonations = () => { /* ... */ };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'pendingProducts':
        return fetchPendingProducts();
      case 'pendingDonations':
        return fetchPendingDonations();
      case 'approvedProducts':
        return fetchApprovedProducts();
      case 'approvedDonations':
        return fetchApprovedDonations();
      case 'declinedProducts':
        return fetchDeclinedProducts();
      case 'declinedDonations':
        return fetchDeclinedDonations();
      default:
        return <div>Select a category to view its contents.</div>;
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
              <FaUser size={120} />
            )}
          </div>
          <div className="card-info">
            <h1><FaUserAlt className="info-icon" /> {userDetails.firstName} {userDetails.lastName}</h1>
            <p><FaEnvelope className="info-icon" /> {userDetails.email}</p>
            <p><FaMapMarkerAlt className="info-icon" /> {userDetails.address}</p>
            <p><FaCalendarAlt className="info-icon" /> {userDetails.dateRegistered ? new Date(userDetails.dateRegistered).toLocaleDateString() : 'N/A'}</p>
          </div>
        </div>
        <div className="tabs">
          <div onClick={() => setActiveTab('pendingProducts')} className={`tab ${activeTab === 'pendingProducts' ? 'active-tab' : ''}`}>Pending Products</div>
          <div onClick={() => setActiveTab('pendingDonations')} className={`tab ${activeTab === 'pendingDonations' ? 'active-tab' : ''}`}>Pending Donations</div>
          <div onClick={() => setActiveTab('approvedProducts')} className={`tab ${activeTab === 'approvedProducts' ? 'active-tab' : ''}`}>Approved Products</div>
          <div onClick={() => setActiveTab('approvedDonations')} className={`tab ${activeTab === 'approvedDonations' ? 'active-tab' : ''}`}>Approved Donations</div>
          <div onClick={() => setActiveTab('declinedProducts')} className={`tab ${activeTab === 'declinedProducts' ? 'active-tab' : ''}`}>Declined Products</div>
          <div onClick={() => setActiveTab('declinedDonations')} className={`tab ${activeTab === 'declinedDonations' ? 'active-tab' : ''}`}>Declined Donations</div>
        </div>
        <div className="tab-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}

export default UserActivity;
