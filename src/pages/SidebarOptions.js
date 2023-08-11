import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome, FaChartBar, FaUsers, FaCogs, FaComment, FaHandHoldingHeart, FaUser, FaBell
} from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import "../css/Admin.css";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <FaUser
    className="admin-icon"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </FaUser>
));

function SidebarOptions() {
  const [notifications, setNotifications] = useState([
    { message: "User1 officially registered at ECOMercado" },
    { message: "Product ID 42 has been updated" },
    { message: "Order ID 123 has been shipped" },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const deleteNotification = (index) => {
    const updatedNotifications = [...notifications];
    updatedNotifications.splice(index, 1);
    setNotifications(updatedNotifications);
  };

  const deleteAllNotifications = () => {
    setNotifications([]);
  };

  const muteNotification = (index) => {
    //
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Do you really want to logout?");
    if (confirmLogout) {
      //
      window.location.href = "/";
    }
  };

  return (
    <div>
      <div className="admin-navbar">
        <Link to="/admin-dashboard">
          <img src={`${process.env.PUBLIC_URL}/ecomercado-logo.png`} alt="Logo" className="admin-logo" />
        </Link>
        <div className="notification-container">
          <div onClick={toggleNotifications} className="notification-bell styled-bell">
            <FaBell />
            {showNotifications && (
              <div className="notifications-list">
                {notifications.length === 0 ? (
                  <p className="no-notifications">No notifications yet</p>
                ) : (
                  <>
                    <button className="delete-all" onClick={deleteAllNotifications}>Delete All</button>
                    {notifications.map((notif, index) => (
                      <div key={index} className="notification-item">
                        <p>{notif.message}</p>
                        <div>
                          <button onClick={() => deleteNotification(index)}>Delete</button>
                          <button onClick={() => muteNotification(index)}>Mute</button>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
          <button onClick={handleLogout} className="logout-link">Logout</button>
        </div>
      </div>
    <div className="admin-dashboard-sidebar">
      <div className="admin-user">
        <div className="admin-user">
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/edit-profile">Edit Profile</Dropdown.Item>
              <Dropdown.Item as={Link} to="/delete-profile">Delete Profile</Dropdown.Item>
              <Dropdown.Item href="#/change-password">Change Password</Dropdown.Item>
              <Dropdown.Item as={Link} to="/switch-account">Switch Account</Dropdown.Item>
              <Dropdown.Item href="/">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
        <li className={location.pathname === "/product-viewer" ? "active" : ""}>
          <Link to="/product-viewer">
            <FaChartBar />
            Product Viewer
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
    </div>
    </div>
  );
}

export default SidebarOptions;
