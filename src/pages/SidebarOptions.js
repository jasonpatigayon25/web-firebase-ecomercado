import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { 
  getDocs, 
  collection,
  where,
  query
} from 'firebase/firestore';
import { db } from '../config/firebase'; 
import { FaBell, FaCog, 
        FaUser } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import "../css/AdminOptions.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";

const auth = getAuth();

const CustomToggle = React.forwardRef(({ firstName }, ref) => (
  <Link to="/admin-profile" ref={ref} className="admin-user-link">
    <FaUser className="admin-icon" />
    <span className="admin-username">Admin {firstName}</span>
  </Link>
));

function SidebarOptions() {

  const location = useLocation();
  const navigate = useNavigate();
  const [pendingProductsCount, setPendingProductsCount] = useState(0);
  const [pendingDonationsCount, setPendingDonationsCount] = useState(0);
  const [pendingSellersCount, setPendingSellersCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

   useEffect(() => {
    const fetchAdminData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const adminEmail = currentUser.email;
        const querySnapshot = await getDocs(collection(db, "admin"));
        const adminDoc = querySnapshot.docs.find(doc => doc.data().email === adminEmail);
        if (adminDoc) {
          setFirstName(adminDoc.data().firstName || 'Admin');
        }
      }
    };
    fetchAdminData();
  }, []);

  useEffect(() => {
    const fetchPendingData = async () => {
      try {
        // Pending sellers count
        const pendingSellersSnapshot = await getDocs(query(collection(db, 'registeredSeller'), where('status', '==', 'pending')));
        setPendingSellersCount(pendingSellersSnapshot.size);
        const pendingSellers = pendingSellersSnapshot.docs.map(doc => {
          const { firstName, lastName } = doc.data();
          return `User ${firstName} ${lastName} pending for seller approval.`;
        });

        // Pending products count
        const pendingProductsSnapshot = await getDocs(query(collection(db, 'products'), where('publicationStatus', '==', 'pending')));
        setPendingProductsCount(pendingProductsSnapshot.size);
        const pendingProducts = pendingProductsSnapshot.docs.map(doc => {
          const { name, sellerName } = doc.data();
          return `Product created '${name}' by '${sellerName}'.`;
        });

        // Pending donations count
        const pendingDonationsSnapshot = await getDocs(query(collection(db, 'donation'), where('publicationStatus', '==', 'pending')));
        setPendingDonationsCount(pendingDonationsSnapshot.size);
        const pendingDonations = pendingDonationsSnapshot.docs.map(doc => {
          const { name, createdBy } = doc.data();
          return `Donation created '${name}' by '${createdBy}'.`;
        });

        // notif pendings
        setNotifications([...pendingSellers, ...pendingProducts, ...pendingDonations]);

      } catch (err) {
        console.error("Error fetching pending counts: ", err);
      }
    };

    fetchPendingData();
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleNotificationClick = (notification) => {
    setShowNotifications(false);
    if (notification.includes("Product created")) {
      navigate('/pending-seller');
    } else if (notification.includes("Donation created")) {
      navigate('/pending-donor');
    } else if (notification.includes("pending for seller approval")) {
      navigate('/users-information');
    }
  };
  
  const handleLogout = () => {
    const confirmLogout = window.confirm("Do you really want to logout?");
    if (confirmLogout) {
      signOut(auth).then(() => {

        window.location.href = "/";
      }).catch((error) => {

        console.error('Logout error:', error);
      });
    }
  };

  const [firstName, setFirstName] = useState('');

  return (
    <div>
      <div className="admin-navbar">
        <Link to="/admin-dashboard">
          <img src={`${process.env.PUBLIC_URL}/ecomercado-logo-white.png`} alt="Logo" className="admin-logo" />
        </Link>
        <div className="notification-container">
        <div onClick={toggleNotifications} className="notification-bell styled-bell">
            <FaBell />
            {notifications.length > 0 && <span className="notification-count">{notifications.length}</span>}
          </div>
          <button onClick={handleLogout} className="logout-link">Logout</button>
        </div>
      </div>
      <div className="admin-dashboard-sidebar">
      <CustomToggle firstName={firstName} />
        <div className="divider"></div>
        <ul className="admin-dashboard-nav">
          <li className={location.pathname === "/admin-dashboard" ? "active" : ""}>
            <Link to="/admin-dashboard">
              <img src={`${process.env.PUBLIC_URL}/icons/dashboard.png`} alt="Dashboard" className="sidebar-icon" />
              Dashboard
            </Link>
          </li>
          <li className={location.pathname === "/users-information" || location.pathname.startsWith("/user-activity/") ? "active" : ""}>
            <Link to="/users-information">
            <span className="link-content">
              <img src={`${process.env.PUBLIC_URL}/icons/user-information.png`} alt="Users Information" className="sidebar-icon" />
              Users Information
              </span>
              {pendingSellersCount > 0 && <span className="sidebar-counter">{pendingSellersCount}</span>}
            </Link>
          </li>
          <li className={location.pathname === "/approved-seller" ? "active" : ""}>
            <Link to="/approved-seller">
              <img src={`${process.env.PUBLIC_URL}/icons/approved-products.png`} alt="Approved Posts - Seller" className="sidebar-icon" />
              Approved Products
            </Link>
          </li>
          <li className={location.pathname === "/pending-seller" ? "active" : ""}>
           <Link to="/pending-seller" className="sidebar-link">
              <span className="link-content">
                <img src={`${process.env.PUBLIC_URL}/icons/pending-products.png`} alt="Pending for Approval - Seller" className="sidebar-icon" />
                Pending Products
              </span>
              {pendingProductsCount > 0 && <span className="sidebar-counter">{pendingProductsCount}</span>}
            </Link>
          </li>
          <li className={location.pathname === "/orders-history" ? "active" : ""}>
            <Link to="/orders-history">
              <img src={`${process.env.PUBLIC_URL}/icons/orders-history.png`} alt="Orders History" className="sidebar-icon" />
              Orders History
            </Link>
          </li>
          <li className={location.pathname === "/approved-donor" ? "active" : ""}>
            <Link to="/approved-donor">
              <img src={`${process.env.PUBLIC_URL}/icons/approved-donations.png`} alt="Approved Posts - Donor" className="sidebar-icon" />
              Approved Donations
            </Link>
          </li>
          <li className={location.pathname === "/pending-donor" ? "active" : ""}>
             <Link to="/pending-donor" className="sidebar-link">
              <span className="link-content">
                <img src={`${process.env.PUBLIC_URL}/icons/pending-donations.png`} alt="Pending for Approval - Donor" className="sidebar-icon" />
                Pending Donations
              </span>
              {pendingDonationsCount > 0 && <span className="sidebar-counter">{pendingDonationsCount}</span>}
            </Link>
          </li>
          <li className={location.pathname === "/donation-history" ? "active" : ""}>
            <Link to="/donation-history">
              <img src={`${process.env.PUBLIC_URL}/icons/donations-history.png`} alt="Donation Requests History" className="sidebar-icon" />
              Requests History
            </Link>
          </li>
          <li className={location.pathname === "/user-feedback" ? "active" : ""}>
            <Link to="/user-feedback">
              <img src={`${process.env.PUBLIC_URL}/icons/feedback.png`} alt="User Feedback" className="sidebar-icon" />
              Users Feedback
            </Link>
          </li>
        </ul>
        <div className="settings-dropdown settings-icon-container">
          <Dropdown drop="up">
            <Dropdown.Toggle as="div" className="settings-dropdown-icon" id="settings-dropdown-custom-components">
              <FaCog />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {/* <Dropdown.Item as={Link} to="/delete-profile">Ban User</Dropdown.Item> */}
              <Dropdown.Item as={Link} to="/admin-profile">Edit Profile</Dropdown.Item>
              <Dropdown.Item as={Link} to="/change-password">Change Password</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
    </div>
    <div className={`notification-modal ${showNotifications ? 'show' : ''}`}>
        <div className="notification-modal-content">
          <div className="notification-modal-header">
            <span>Notifications - Pending Approvals</span>
            <button className="notification-modal-close" onClick={toggleNotifications}>&times;</button>
          </div>
          <ul className="notification-list">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <li key={index} onClick={() => handleNotificationClick(notification)}>{notification}</li>
              ))
            ) : (
              <li className="no-pending">No pending notifications.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SidebarOptions;