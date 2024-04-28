import React, { useState, useEffect } from "react";
import SidebarOptions from "./SidebarOptions";
import { Link, useNavigate } from "react-router-dom";
import { db } from '../config/firebase';
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import "../css/Admin.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [recentFetchedUsers, setRecentFetchedUsers] = useState([]);
  const [recentFetchedSellers, setRecentFetchedSellers] = useState([]);
  const itemsPerPage = 5;
  const [userCurrentPage, setUserCurrentPage] = useState(1);
  const [sellerCurrentPage, setSellerCurrentPage] = useState(1);
  const [pendingProductsCount, setPendingProductsCount] = useState(0);
  const [pendingDonationsCount, setPendingDonationsCount] = useState(0);

  useEffect(() => {

    // Fetch recent registered users
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

    // Fetch recent registered sellers
    getDocs(query(collection(db, 'registeredSeller'), orderBy('registeredAt', 'desc'), limit(20)))
      .then(snapshot => {
        const fetchedSellers = snapshot.docs.map(doc => {
          const sellerData = doc.data();
          const registeredAt = sellerData.registeredAt.toDate().toLocaleString();
          return {
            profilePhotoUri: sellerData.profilePhotoUri,
            sellerName: sellerData.sellerName,
            registeredName: sellerData.registeredName,
            email: sellerData.email,
            type: sellerData.type,
            registeredAt: registeredAt
          };
        });
        setRecentFetchedSellers(fetchedSellers);
      })
      .catch(err => {
        console.error("Error fetching recent sellers: ", err);
      });

      //Pending products count
      getDocs(query(collection(db, 'products'), where('publicationStatus', '==', 'pending')))
      .then(snapshot => {
        setPendingProductsCount(snapshot.size);
      })
      .catch(err => {
        console.error("Error fetching pending products count: ", err);
      });

       //Pending donations  count
       getDocs(query(collection(db, 'donation'), where('publicationStatus', '==', 'pending')))
       .then(snapshot => {
        setPendingDonationsCount(snapshot.size);
       })
       .catch(err => {
         console.error("Error fetching pending donation count: ", err);
       });
  }, []);

  const totalUsersPages = Math.ceil(recentFetchedUsers.length / itemsPerPage);
  const totalSellersPages = Math.ceil(recentFetchedSellers.length / itemsPerPage);
  const currentUserPageUsers = recentFetchedUsers.slice(
    (userCurrentPage - 1) * itemsPerPage,
    userCurrentPage * itemsPerPage
  );
  const currentUserPageSellers = recentFetchedSellers.slice(
    (sellerCurrentPage - 1) * itemsPerPage,
    sellerCurrentPage * itemsPerPage
  );

  const handleUserPageChange = (newPage) => {
    setUserCurrentPage(newPage);
  };

  const handleSellerPageChange = (newPage) => {
    setSellerCurrentPage(newPage);
  };

  function AdminNavigation() {
    const navOptions = [
      { label: 'Users Information', path: '/users-information', iconPath: 'user-information.png' },
      { label: 'Approved Products', path: '/approved-seller', iconPath: 'approved-products.png' },
      { label: 'Pending Products', path: '/pending-seller', iconPath: 'pending-products.png', count: pendingProductsCount },
      { label: 'Orders History', path: '/orders-history', iconPath: 'orders-history.png' },
      { label: 'Approved Donations', path: '/approved-donor', iconPath: 'approved-donations.png' },
      { label: 'Pending Donations', path: '/pending-donor', iconPath: 'pending-donations.png', count: pendingDonationsCount },
      { label: 'Requests History', path: '/donation-history', iconPath: 'donations-history.png' },
      { label: 'Users Feedback', path: '/user-feedback', iconPath: 'feedback.png' }
    ];

    return (
      <div className="admin-nav-cards">
        {navOptions.map((option, index) => (
          <div className="admin-nav-card" key={index} style={{ position: 'relative' }}>
            <Link to={option.path}>
              <img src={`${process.env.PUBLIC_URL}/icons/${option.iconPath}`} alt={option.label} className="admin-nav-icon" />
              <p className="admin-nav-label">{option.label}</p>
              {option.count > 0 && (
                <div className="counter-badge">{option.count}</div>
              )}
            </Link>
          </div>
        ))}
      </div>
    );
  }

  const handleUserClick = (email) => {
    navigate(`/user-activity/${email}`); 
  };

  return (
    <div className="admin-dashboard">
      <SidebarOptions />
      <div className="admin-dashboard-content">
        <AdminNavigation />
        <div>
          <h1>Recent Registered Users</h1>
          <div className="user-list-container">
            {currentUserPageUsers.map((user, index) => (
              <div key={index} className="user-list-item" onClick={() => handleUserClick(user.email)}>
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
                  <p className="user-date-registered">Registered At: {user.dateRegistered}</p>
                </div>
              </div>
            ))}
            <div className="pagination-controls">
              {Array.from({ length: totalUsersPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handleUserPageChange(i + 1)}
                  disabled={userCurrentPage === i + 1}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
          <h1>Recent Registered Sellers</h1>
          <div className="user-list-container">
            {currentUserPageSellers.map((seller, index) => (
              <div key={index} className="user-list-item" onClick={() => handleUserClick(seller.email)}>
                <div className="user-info">
                  <div className="user-detail">
                    <img 
                      src={seller.profilePhotoUri ? seller.profilePhotoUri : `${process.env.PUBLIC_URL}/icons/user.png`} 
                      alt={seller.sellerName}
                      className="user-list-photo"
                    />
                    <div>
                      <p className="user-full-name"><strong>{seller.sellerName}</strong></p>
                      <p className="user-email">{seller.email}</p>
                    </div>
                  </div>
                  <p className="user-date-registered">Registered At: {seller.registeredAt}</p>
                </div>
              </div>
            ))}
            <div className="pagination-controls">
              {Array.from({ length: totalSellersPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handleSellerPageChange(i + 1)}
                  disabled={sellerCurrentPage === i + 1}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
