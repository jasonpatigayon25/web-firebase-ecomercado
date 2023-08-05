// SidebarOptions.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome, FaChartBar, FaUsers, FaCogs, FaComment, FaHandHoldingHeart, FaUser
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
  const location = useLocation();

  return (
    <div className="admin-dashboard-sidebar">
      <div className="admin-user">
        <div className="admin-user">
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/edit-profile">Edit Profile</Dropdown.Item>
              <Dropdown.Item as={Link} to="/delete-profile">Delete Profile</Dropdown.Item>
              <Dropdown.Item href="#/change-password">Change Password</Dropdown.Item>
              <Dropdown.Item href="#/change-account">Change Account</Dropdown.Item>
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
  );
}

export default SidebarOptions;
