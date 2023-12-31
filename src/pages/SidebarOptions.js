import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  getDocs, 
  deleteDoc, 
  doc,
  writeBatch,
  updateDoc,
  collection
} from 'firebase/firestore';
import { db } from '../config/firebase'; 
import { notificationForAdminCollection } from '../config/firebase'; 
import { FaHome, FaUsers, FaCogs, FaComment, FaHandHoldingHeart, FaUser, FaBell, FaCog } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import "../css/Admin.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";

const auth = getAuth();

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <Link to="/admin-profile" onClick={onClick}>
    <FaUser className="admin-icon" ref={ref}>
      {children}
    </FaUser>
  </Link>
));

function SidebarOptions() {
  const [notifications, setNotifications] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchAdminMuteStatus = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const adminEmail = currentUser.email; 
        const querySnapshot = await getDocs(collection(db, "admin"));
        
        const adminDoc = querySnapshot.docs.find(doc => doc.data().email === adminEmail);
        
        if (adminDoc) {
          setIsMuted(adminDoc.data().isMuted || false);
        }
      }
    };
  
    fetchAdminMuteStatus();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (!isMuted) {
          const querySnapshot = await getDocs(notificationForAdminCollection);
          const fetchedNotifications = [];
          querySnapshot.forEach((doc) => {
            fetchedNotifications.push({ id: doc.id, ...doc.data() });
          });
          setNotifications(fetchedNotifications);
        } else {
          setNotifications([]);
          setShowNotifications(false); 
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [isMuted]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const deleteNotification = async (notifId) => {
    try {
      await deleteDoc(doc(db, 'notificationForAdmin', notifId));
      setNotifications(prevNotifications => 
        prevNotifications.filter(notif => notif.id !== notifId)
      );
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const deleteAllNotifications = async () => {
    const batch = writeBatch(db);
  
    try {
      const querySnapshot = await getDocs(notificationForAdminCollection);
      querySnapshot.forEach((docSnapshot) => {
        batch.delete(docSnapshot.ref);
      });
  
      await batch.commit();
      setNotifications([]);
    } catch (error) {
      console.error('Error deleting all notifications:', error);
    }
  };
  

  const muteNotificationsForCurrentUser = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const adminEmail = currentUser.email;
      const querySnapshot = await getDocs(collection(db, "admin"));

      const adminDoc = querySnapshot.docs.find(doc => doc.data().email === adminEmail);
      
      if (adminDoc) {
        const adminDocRef = doc(db, "admin", adminDoc.id);
        await updateDoc(adminDocRef, {
          isMuted: true
        });
        setIsMuted(true);
      }
    }
  };

  const unmuteNotificationsForCurrentUser = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const adminEmail = currentUser.email;
      const querySnapshot = await getDocs(collection(db, "admin"));
      
      const adminDoc = querySnapshot.docs.find(doc => doc.data().email === adminEmail);
      
      if (adminDoc) {
        const adminDocRef = doc(db, "admin", adminDoc.id);
        await updateDoc(adminDocRef, {
          isMuted: false
        });
        setIsMuted(false);
      }
    }
  };

  const handleMuteAllClick = () => {
    muteNotificationsForCurrentUser();
    setIsMuted(true); 
  };
  
  const handleUnmuteAllClick = () => {
    unmuteNotificationsForCurrentUser();
    setIsMuted(false); 
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

  return (
    <div>
      <div className="admin-navbar">
        <Link to="/admin-dashboard">
          <img src={`${process.env.PUBLIC_URL}/ecomercado-logo-white.png`} alt="Logo" className="admin-logo" />
        </Link>
        <div className="notification-container">
        <div onClick={toggleNotifications} className="notification-bell styled-bell">
          <FaBell />
          {showNotifications && (
            <div className="notifications-list">
              {isMuted ? (
                <p style={{ color: 'black' }}>Muted</p>
              ) : (
                notifications.length === 0 ? (
                  <p style={{ color: 'black' }}>No notifications yet</p>
                ) : (
                  notifications.map((notif, index) => (
                    <div key={notif.id} className="notification-item">
                      <p style={{ color: '#000000', fontSize: '14px' }}>{notif.text}</p>
                      <div>
                        <button className="delete" onClick={() => deleteNotification(notif.id)}>Delete</button>
                      </div>
                    </div>
                  ))
                )
              )}
              <div className="notifications-actions">
                {isMuted ? (
                  <button className="mute-all" onClick={handleUnmuteAllClick}>Unmute All</button>
                ) : (
                  <>
                    <button className="delete-all" onClick={deleteAllNotifications}>Delete All</button>
                    <button className="mute-all" onClick={handleMuteAllClick}>Mute All</button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
          <button onClick={handleLogout} className="logout-link">Logout</button>
        </div>
      </div>
    <div className="admin-dashboard-sidebar">
      <div className="admin-user">
        <div className="admin-user">
          <CustomToggle/>
          <span className="admin-dashboard-divider-alt"></span> 
        </div>
        <span className="admin-username">ADMIN</span>
      </div>
      <div className="divider"></div>
      <ul className="admin-dashboard-nav">
        <li className={location.pathname === "/admin-dashboard" ? "active" : ""}>
          <Link to="/admin-dashboard">
            <FaHome />
            Home
          </Link>
        </li>
        <li className={location.pathname === "/user-statistics" ? "active" : ""}>
          <Link to="/user-statistics">
            <FaUsers />
            User Statistics
          </Link>
        </li>
        <li className={location.pathname === "/product-metrics" ? "active" : ""}>
          <Link to="/product-metrics">
            <FaCogs />
            Product Metrics
          </Link>
        </li>
        <li className={location.pathname === "/donations" ? "active" : ""}>
          <Link to="/donations">
            <FaHandHoldingHeart />
            Donations
          </Link>
        </li>
        <li className={location.pathname === "/user-feedback" ? "active" : ""}>
          <Link to="/user-feedback">
            <FaComment />
            User Feedback
          </Link>
        </li>
      </ul>
      <div className="settings-dropdown settings-icon-container">
        <Dropdown drop="up">
          <Dropdown.Toggle as="div" className="settings-dropdown-icon" id="settings-dropdown-custom-components">
            <FaCog />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/delete-profile">Ban User</Dropdown.Item>
            <Dropdown.Item as={Link} to="/admin-profile">Edit Profile</Dropdown.Item>
            <Dropdown.Item as={Link} to="/change-password">Change Password</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
    </div>
  );
}

export default SidebarOptions;
