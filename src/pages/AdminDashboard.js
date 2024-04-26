import React, { useState, useEffect } from "react";
import SidebarOptions from "./SidebarOptions";
import { Link } from "react-router-dom";
import { db } from '../config/firebase';
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import "../css/Admin.css";

function AdminDashboard() {
  const [recentFetchedUsers, setRecentFetchedUsers] = useState([]);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getDocs(query(collection(db, 'users'), orderBy('dateRegistered', 'desc'), limit(20)))
      .then(snapshot => {
        const fetchedUsers = snapshot.docs.map(doc => {
          const userData = doc.data();
          const dateRegistered = userData.dateRegistered.toDate().toLocaleString();
          return {
            email: userData.email,
            fullName: `${userData.firstName} ${userData.lastName}`,
            dateRegistered: dateRegistered,
            photoUrl: userData.photoUrl 
          };
        });
        setRecentFetchedUsers(fetchedUsers);
      })
      .catch(err => {
        console.error("Error fetching recent users: ", err);
      });
  }, []);

  const totalPages = Math.ceil(recentFetchedUsers.length / itemsPerPage);
  const currentUsers = recentFetchedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  function AdminNavigation() {
    const navOptions = [
      { label: 'Users Information', path: '/users-information', iconPath: 'user-information.png' },
      { label: 'Approved Products', path: '/approved-seller', iconPath: 'approved-products.png' },
      { label: 'Pending Products', path: '/pending-seller', iconPath: 'pending-products.png' },
      { label: 'Orders History', path: '/orders-history', iconPath: 'orders-history.png' },
      { label: 'Approved Donations', path: '/approved-donor', iconPath: 'approved-donations.png' },
      { label: 'Pending Donations', path: '/pending-donor', iconPath: 'pending-donations.png' },
      { label: 'Requests History', path: '/donation-history', iconPath: 'donations-history.png' },
      { label: 'Users Feedback', path: '/user-feedback', iconPath: 'feedback.png' }
    ];

    return (
      <div className="admin-nav-cards">
        {navOptions.map((option, index) => (
          <div className="admin-nav-card" key={index}>
            <Link to={option.path}>
              <img src={`${process.env.PUBLIC_URL}/icons/${option.iconPath}`} alt={option.label} className="admin-nav-icon" />
              <p className="admin-nav-label">{option.label}</p>
            </Link>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <SidebarOptions />
      <div className="admin-dashboard-content">
        <AdminNavigation />
        <div>
          <h1>Recent Registered Users</h1>
          <div className="user-list-container">
            {currentUsers.map((user, index) => (
              <div key={index} className="user-list-item">
                <div className="user-info">
                  <div className="user-detail">
                    <img 
                      src={user.photoUrl ? user.photoUrl : `${process.env.PUBLIC_URL}/icons/user.png`} 
                      alt={user.fullName}
                      className="user-list-photo"
                    />
                    <div>
                      <p className="user-full-name"><strong>{user.fullName}</strong></p>
                      <p className="user-email">{user.email}</p>
                    </div>
                  </div>
                  <div className="user-registered-info"> 
                    <p className="user-date-registered">Registered At: {user.dateRegistered}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination-controls">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                disabled={currentPage === i + 1}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;