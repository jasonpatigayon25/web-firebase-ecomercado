import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
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
import { FaHome , FaHistory, FaUserFriends, FaComments, FaBell, FaCog, 
        FaUser, FaRegListAlt, FaClipboardCheck, FaClipboardList } from "react-icons/fa";
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

   const [unreadCount, setUnreadCount] = useState(0);

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
          let unread = 0;
  
          querySnapshot.forEach((doc) => {
            const notificationData = { id: doc.id, ...doc.data() };
            fetchedNotifications.push(notificationData);
            if (!notificationData.isRead) {
              unread++;
            }
          });
  
          fetchedNotifications.sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());
  
          setNotifications(fetchedNotifications);
          setUnreadCount(unread);
        } else {
          setNotifications([]);
          setShowNotifications(false);
          setUnreadCount(0);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
  
    fetchNotifications();
  }, [isMuted]);

  const toggleNotifications = async () => {
    setShowNotifications(!showNotifications);

    if (!showNotifications) {
      const batch = writeBatch(db);
      let updatedNotifications = notifications.map(notif => {
        if (!notif.isRead) {
          const notifRef = doc(db, 'notificationForAdmin', notif.id);
          batch.update(notifRef, { isRead: true });
          return { ...notif, isRead: true };
        }
        return notif;
      });

      try {
        await batch.commit();
        setNotifications(updatedNotifications);
        setUnreadCount(0); 
      } catch (error) {
        console.error('Error updating notifications:', error);
      }
    }
  };

  const navigate = useNavigate();

  const handleNotificationClick = (notifId) => {
    markNotificationAsRead(notifId);
    navigate('/user-feedback');
  };

  const markNotificationAsRead = async (notifId) => {
    const notifRef = doc(db, 'notificationForAdmin', notifId);
    await updateDoc(notifRef, {
      isRead: true
    });
  
    setNotifications(prevNotifications =>
      prevNotifications.map(notif => {
        if (notif.id === notifId) {
          return { ...notif, isRead: true };
        }
        return notif;
      })
    );
  
    const notification = notifications.find(notif => notif.id === notifId);
    if (notification && !notification.isRead) {
      setUnreadCount(prevUnreadCount => prevUnreadCount - 1);
    }
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
          {unreadCount > 0 && <span className="unread-count">{unreadCount}</span>}
          {showNotifications && (
            <div className="notifications-list">
              {isMuted ? (
                <p style={{ color: 'black' }}>Muted</p>
              ) : (
                notifications.length === 0 ? (
                  <p style={{ color: 'black' }}>No notifications yet</p>
                ) : (
                  notifications.map((notif, index) => (
                    <div 
                        key={notif.id} 
                        className={`notification-item ${notif.isRead ? 'read' : 'unread'}`}
                        onClick={() => handleNotificationClick(notif.id)}
                      >
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
            <CustomToggle />
            <span className="admin-dashboard-divider-alt"></span> 
          </div>
          <span className="admin-username">ADMIN</span>
        </div>
        <div className="divider"></div>
        <ul className="admin-dashboard-nav">
          <li className={location.pathname === "/admin-dashboard" ? "active" : ""}>
            <Link to="/admin-dashboard">
              <FaHome />
              Dashboard
            </Link>
          </li>
          <li className={location.pathname === "/users-information" || location.pathname.startsWith("/user-activity/") ? "active" : ""}>
            <Link to="/users-information">
              <FaUserFriends />
              Users Information
            </Link>
          </li>
          <li className={location.pathname === "/approved-seller" ? "active" : ""}>
            <Link to="/approved-seller">
              <FaClipboardCheck />
              Approved Posts - SELLER
            </Link>
          </li>
          <li className={location.pathname === "/pending-seller" ? "active" : ""}>
            <Link to="/pending-seller">
              <FaClipboardList />
              Pending for Approval - SELLER
            </Link>
          </li>
          <li className={location.pathname === "/item-history" ? "active" : ""}>
            <Link to="/item-history">
              <FaHistory />
              Items History
            </Link>
          </li>
          <li className={location.pathname === "/approved-donor" ? "active" : ""}>
            <Link to="/approved-donor">
              <FaRegListAlt />
              Approved Posts - DONOR
            </Link>
          </li>
          <li className={location.pathname === "/pending-donor" ? "active" : ""}>
            <Link to="/pending-donor">
              <FaClipboardList />
              Pending for Approval - DONOR
            </Link>
          </li>
          <li className={location.pathname === "/donation-history" ? "active" : ""}>
            <Link to="/donation-history">
              <FaHistory />
              Donation History
            </Link>
          </li>
          <li className={location.pathname === "/user-feedback" ? "active" : ""}>
            <Link to="/user-feedback">
              <FaComments />
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
