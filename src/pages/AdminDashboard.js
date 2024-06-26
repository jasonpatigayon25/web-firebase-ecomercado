import React, { useState, useEffect } from "react";
import SidebarOptions from "./SidebarOptions";
import { Link, useNavigate } from "react-router-dom";
import { db } from '../config/firebase';
import { collection, getDocs, limit, orderBy, query, where, deleteDoc, doc, updateDoc } from "firebase/firestore";
import "../css/Admin.css";
import { FaCheck } from "react-icons/fa"; 

function AdminDashboard() {
  const navigate = useNavigate();
  const [recentFetchedUsers, setRecentFetchedUsers] = useState([]);
  const [recentFetchedSellers, setRecentFetchedSellers] = useState([]);
  const itemsPerPage = 5;
  const [userCurrentPage, setUserCurrentPage] = useState(1);
  const [sellerCurrentPage, setSellerCurrentPage] = useState(1);
  const [pendingProductsCount, setPendingProductsCount] = useState(0);
  const [pendingDonationsCount, setPendingDonationsCount] = useState(0);
  const [pendingSellersCount, setPendingSellersCount] = useState(0);
  const [orderStatusCounts, setOrderStatusCounts] = useState({
    pending: 0,
    approved: 0,
    receiving: 0,
    completed: 0,
    cancelled: 0
  });
  const [currentOrderStatusIndex, setCurrentOrderStatusIndex] = useState(0);

  const [requestStatusCounts, setRequestStatusCounts] = useState({
    pending: 0,
    approved: 0,
    receiving: 0,
    completed: 0,
    declined: 0
  });
  const [currentRequestStatusIndex, setCurrentRequestStatusIndex] = useState(0);

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
    getDocs(query(collection(db, 'registeredSeller'), orderBy('registeredAt', 'desc')))
      .then(snapshot => {
        const fetchedSellers = snapshot.docs.map(doc => {
          const sellerData = doc.data();
          const registeredAt = sellerData.registeredAt.toDate().toLocaleString();
          return {
            id: doc.id,
            profilePhotoUri: sellerData.profilePhotoUri,
            sellerName: sellerData.sellerName,
            registeredName: sellerData.registeredName,
            email: sellerData.email,
            type: sellerData.type,
            status: sellerData.status || 'pending',
            registeredAt: registeredAt,
          };
        });
        setRecentFetchedSellers(fetchedSellers);
      })
      .catch(err => {
        console.error("Error fetching recent sellers: ", err);
      });

       // pending sellers count
      getDocs(query(collection(db, 'registeredSeller'), where('status', '==', 'pending')))
      .then(snapshot => {
        setPendingSellersCount(snapshot.size);
      })
      .catch(err => {
        console.error("Error fetching pending sellers count: ", err);
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

//Order counters
  useEffect(() => {
    const orderStatuses = ['Pending', 'Approved', 'Receiving', 'Completed', 'Cancelled'];
    const counts = {};
  
    orderStatuses.forEach(status => {
      getDocs(query(collection(db, 'orders'), where('status', '==', status)))
        .then(snapshot => {
          counts[status.toLowerCase()] = snapshot.size;
          if (Object.keys(counts).length === orderStatuses.length) { 
            setOrderStatusCounts(counts);
          }
        })
        .catch(err => {
          console.error(`Error fetching ${status} orders count: `, err);
        });
    });
  }, []);

  const handleApproveSeller = async (sellerId) => {
    const confirmApprove = window.confirm("Are you sure you want to approve this seller?");
    if (confirmApprove) {
      try {
        await updateDoc(doc(db, 'registeredSeller', sellerId), { status: 'approved' });
        setRecentFetchedSellers((prev) => prev.map((seller) =>
          seller.id === sellerId ? { ...seller, status: 'approved' } : seller
        ));
        alert("Seller approved successfully.");
        setPendingSellersCount((count) => count - 1);
      } catch (error) {
        console.error('Error approving seller:', error);
        alert("Failed to approve seller.");
      }
    }
  };
  
  const handleCancelSeller = async (sellerId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this seller registration?");
    if (confirmCancel) {
      try {
        await deleteDoc(doc(db, 'registeredSeller', sellerId));
        setRecentFetchedSellers((prev) => prev.filter((seller) => seller.id !== sellerId));
        alert("Seller registration canceled successfully.");
        setPendingSellersCount((count) => count - 1);
      } catch (error) {
        console.error('Error canceling seller:', error);
        alert("Failed to cancel seller registration.");
      }
    }
  };

  //Request Counters
  useEffect(() => {
    const requestStatus = ['Pending', 'Approved', 'Receiving', 'Completed', 'Declined'];
    const counts = {};
  
    requestStatus.forEach(status => {
      getDocs(query(collection(db, 'requests'), where('status', '==', status)))
        .then(snapshot => {
          counts[status.toLowerCase()] = snapshot.size;
          if (Object.keys(counts).length === requestStatus.length) { 
            setRequestStatusCounts(counts);
          }
        })
        .catch(err => {
          console.error(`Error fetching ${status} requests count: `, err);
        });
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
        setCurrentOrderStatusIndex(prevIndex => (prevIndex + 1) % 5);
    }, 3000);

    return () => clearInterval(timer);  
}, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRequestStatusIndex(prevIndex => (prevIndex + 1) % 5); 
    }, 3000);
  
    return () => clearInterval(timer);
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
    const orderStatuses = ['pending', 'approved', 'receiving', 'completed', 'cancelled'];
    const orderStatusLabels = ['TO PAY', 'TO DELIVER', 'TO RECEIVE', 'COMPLETED', 'CANCELLED'];
  
    const requestStatuses = ['pending', 'approved', 'receiving', 'completed', 'declined'];
    const requestStatusLabels = ['TO PAY', 'TO DELIVER', 'TO RECEIVE', 'COMPLETED', 'DECLINED'];
  
    const navOptions = [
      { label: 'Users Information', path: '/users-information', iconPath: 'user-information.png', count: pendingSellersCount },
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
              {option.path === '/orders-history' && (
                <div className="order-status-counter">
                  {orderStatusCounts[orderStatuses[currentOrderStatusIndex]]} {orderStatusLabels[currentOrderStatusIndex]}
                </div>
              )}
              {option.path === '/donation-history' && (
                <div className="order-status-counter">
                  {requestStatusCounts[requestStatuses[currentRequestStatusIndex]]} {requestStatusLabels[currentRequestStatusIndex]}
                </div>
              )}
              {option.count > 0 && option.path !== '/orders-history' && option.path !== '/donation-history' && (
                <div className="counter-badge">{option.count}</div>
              )}
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
                      src={seller.profilePhotoUri || `${process.env.PUBLIC_URL}/icons/user.png`}
                      alt={seller.sellerName}
                      className="user-list-photo"
                    />
                    <div>
                      <p className="user-full-name"><strong>{seller.sellerName}</strong></p>
                      <p className="user-email">{seller.email}</p>
                    </div>
                  </div>
                  <p className="user-date-registered">Registered At: {seller.registeredAt}</p>
                  {seller.status === 'approved' ? (
                    <div className="check-seller">
                    <FaCheck className="big-check-icon" />
                    </div>  
                  ) : (
                    <div className="modal-actions">
                      <button className="approve-button" onClick={() => handleApproveSeller(seller.id)}>Approve</button>
                      <button className="decline-button" onClick={() => handleCancelSeller(seller.id)}>Cancel</button>
                    </div>
                  )}
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
