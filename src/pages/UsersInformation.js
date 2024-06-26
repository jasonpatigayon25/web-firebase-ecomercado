import React, {useState, useEffect} from "react";
import SidebarOptions from "./SidebarOptions";
import "../css/Admin.css";
import { db } from '../config/firebase';
import { collection, getDocs, query, orderBy, limit, where, updateDoc, deleteDoc, doc  } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaStoreAlt, FaBan, FaCheck } from "react-icons/fa"; 

function UsersInformation() {
  const navigate = useNavigate();
  const [recentFetchedUsers, setRecentFetchedUsers] = useState([]);
  const [recentFetchedSellers, setRecentFetchedSellers] = useState([]);
  const itemsPerPage = 10;
  const [userCurrentPage, setUserCurrentPage] = useState(1);
  const [sellerCurrentPage, setSellerCurrentPage] = useState(1);
  const [userCount, setUserCount] = useState(0);
  const [sellerCount, setSellerCount] = useState(0);
  const [bannedCount, setBannedCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = recentFetchedUsers.filter(user => {
    return (
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  })

  const filteredSellers = recentFetchedSellers.filter(user => {
    return (
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.registeredName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  })

  useEffect(() => {
    //registered users
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

    // registered sellers
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
  }, []);

  const totalUsersPages = Math.ceil(recentFetchedUsers.length / itemsPerPage);
  const totalSellersPages = Math.ceil(recentFetchedSellers.length / itemsPerPage);
  const currentUserPageUsers = filteredUsers.slice(
    (userCurrentPage - 1) * itemsPerPage,
    userCurrentPage * itemsPerPage
  );
  const currentUserPageSellers = filteredSellers.slice(
    (sellerCurrentPage - 1) * itemsPerPage,
    sellerCurrentPage * itemsPerPage
  );

  const handleUserPageChange = (newPage) => {
    setUserCurrentPage(newPage);
  };

  const handleSellerPageChange = (newPage) => {
    setSellerCurrentPage(newPage);
  };

  const handleUserClick = (email) => {
    navigate(`/user-activity/${email}`); 
  };

  useEffect(() => {
    // Count users
    getDocs(collection(db, 'users'))
      .then(snapshot => {
        setUserCount(snapshot.size);
      })
      .catch(err => {
        console.error("Error counting users: ", err);
      });

    // Count sellers
    getDocs(collection(db, 'registeredSeller'))
      .then(snapshot => {
        setSellerCount(snapshot.size);
      })
      .catch(err => {
        console.error("Error counting sellers: ", err);
      });

    // Count banned users
    const bannedQuery = query(collection(db, 'users'), where('banned', '==', true));
    getDocs(bannedQuery)
      .then(snapshot => {
        setBannedCount(snapshot.size);
      })
      .catch(err => {
        console.error("Error counting banned users: ", err);
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
      } catch (error) {
        console.error('Error canceling seller:', error);
        alert("Failed to cancel seller registration.");
      }
    }
  };

  const UserCard = ({ count }) => (
    <div className="counter-card">
      <h2>{count}</h2>
      <FaUsers className="icon" />
      <p>Users</p>
    </div>
  );
  
  const SellerCard = ({ count }) => (
    <div className="counter-card">
      <h2>{count}</h2>
      <FaStoreAlt className="icon" />
      <p>Sellers</p>
    </div>
  );
  
  const BannedCard = ({ count }) => (
    <div className="counter-card">
      <h2>{count}</h2>
      <FaBan className="icon" />
      <p>Banned Users</p>
    </div>
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  return (
    <div className="admin-dashboard">
      <SidebarOptions />
      <div className="admin-dashboard-content">
      <div className="admin-nav-cards">
          <UserCard count={userCount} />
          <SellerCard count={sellerCount} />
          <BannedCard count={bannedCount} />
        </div>
        <div className="search-bar-wrapper">
          <input
            type="text"
            placeholder="Search by email, first name, last name, or seller name..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-bar"
          />
        </div>
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
      );
    }

    export default UsersInformation;