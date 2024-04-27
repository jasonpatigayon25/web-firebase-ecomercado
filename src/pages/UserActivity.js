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
  const [activeTab, setActiveTab] = useState('pending');
  const [products, setProducts] = useState([]);

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

  useEffect(() => {
    const fetchProducts = async (status, userEmail) => {
      if (!userEmail) return; 
      const productsRef = collection(db, "products");
      const q = query(
        productsRef,
        where("publicationStatus", "==", status),
        where("seller_email", "==", userEmail)  
      );
      const querySnapshot = await getDocs(q);
      const productList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() ? doc.data().createdAt.toDate() : new Date(),
      })).sort((a, b) => b.createdAt - a.createdAt);
      setProducts(productList);
    };

    if (userDetails && userDetails.email) {
      fetchProducts(activeTab, userDetails.email);
    }
  }, [activeTab, userDetails]);  

  const renderTabContent = () => {
    return (
      <div className="product-list-container">
        {products.length > 0 ? (
          <ul className="product-list">
            {products.map(product => (
              <li key={product.id} className="product-list-item">
                <img src={product.photo} alt={`${product.name} thumbnail`} className="product-list-photo" />
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                  <div className="product-detail">
                    <span className="product-price">₱{product.price}</span>
                    <span className="product-category">{product.category}</span>
                    <span className="product-qty">Qty: {product.quantity}</span>
                    <span className="product-seller">From: {product.seller_email}</span>
                    <span className="product-published-date">Published At: {product.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No {activeTab.replace(/([A-Z])/g, ' $1').toLowerCase()} found.</p>
        )}
      </div>
    );
  };

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
          <div onClick={() => setActiveTab('pending')} className={`tab ${activeTab === 'pending' ? 'active-tab' : ''}`}>Pending Products</div>
          <div onClick={() => setActiveTab('approved')} className={`tab ${activeTab === 'approved' ? 'active-tab' : ''}`}>Approved Products</div>
          <div onClick={() => setActiveTab('declined')} className={`tab ${activeTab === 'declined' ? 'active-tab' : ''}`}>Declined Products</div>
        </div>
        <div className="tab-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}

export default UserActivity;