import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome, FaChartBar, FaUsers, FaCogs, FaComment, FaHandHoldingHeart,
  FaUser,
  FaUserCheck
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

function AdminProductMetrics() {
  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-sidebar">
      <div className="admin-user">
        <div className="admin-user">
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />
            <Dropdown.Menu>
              <Dropdown.Item href="#/change-password">Change Password</Dropdown.Item>
              <Dropdown.Item href="#/change-account">Change Account</Dropdown.Item>
              <Dropdown.Item href="#/help">Help</Dropdown.Item>
              <Dropdown.Item href="#/logout">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <span className="admin-dashboard-divider-alt"></span> 
        </div>
        <span>ADMIN</span>
      </div>
      <div className="divider"></div>
        <ul className="admin-dashboard-nav">
          <li>
            <Link to="/admin-dashboard">
              <FaHome />
              Home
            </Link>
          </li>
          <li>
            <Link to="/admin-sales">
              <FaChartBar />
              Sales and Revenue
            </Link>
          </li>
          <li>
            <Link to="/admin-users">
              <FaUsers />
              User Statistics
            </Link>
          </li>
          <li>
            <Link to="/admin-products">
              <FaCogs />
              Product Metrics
            </Link>
          </li>
          <li>
            <Link to="/admin-donations">
              <FaHandHoldingHeart />
              Donations
            </Link>
          </li>
          <li>
            <Link to="/admin-seller">
              <FaCogs />
              Seller Request
            </Link>
          </li>
          <li>
            <Link to="/admin-feedback">
              <FaComment />
              User Feedback
            </Link>
          </li>
        </ul>
      </div>
      <div className="admin-dashboard-content">
        <h1>Admin Product Metrics</h1> 
        <div className="divider"></div>
        <div className="admin-dashboard-cards">
          <div className="admin-dashboard-card">
            <h2 className="title-label"> Total Users/Customers</h2>
            <p className="stats"> <FaUserCheck style={{ color: 'white' }} /> 0</p>
            <div className="divider"></div>
            <h2 className="title-label"> Sales Revenue</h2>
            <p className="stats"> ₱ 0</p>
          </div>
          <div className="admin-dashboard-card">
            <h2 className="title-label"> TARGET</h2>
            <p className="stats"> <FaUserCheck style={{ color: 'white' }} /> </p>
            <div className="divider"></div>
            <h2 className="title-label"> </h2>
            <p className="stats"> </p>
          </div>
          </div>

        <div className="admin-dashboard-recent-users mb-4 shadow">
          <h2>SAMPLE</h2>
          <div className="divider"></div>
          <ul>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminProductMetrics;
