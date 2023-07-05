import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome, FaChartBar, FaUsers, FaCogs, FaComment, FaHandHoldingHeart,
  FaUserCheck, FaHandshake, FaBoxOpen, FaShoppingBag, FaHeart
} from "react-icons/fa";
import "../css/AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-sidebar">
        <div className="admin-dashboard-logo">
          <img src={process.env.PUBLIC_URL + "/admin.png"} alt="Admin Logo" style={{ height: '20px', width: '20px' }} />
          <span className="admin-dashboard-divider-alt"></span> ADMIN
        </div>
        <ul className="admin-dashboard-nav">
          <li>
            <Link to="/admin-dashboard">
              <FaHome />
              Home
            </Link>
          </li>
          <li>
            <Link to="/admin/sales">
              <FaChartBar />
              Sales and Revenue
            </Link>
          </li>
          <li>
            <Link to="/admin/users">
              <FaUsers />
              User Statistics
            </Link>
          </li>
          <li>
            <Link to="/admin/products">
              <FaCogs />
              Product Metrics
            </Link>
          </li>
          <li>
            <Link to="/admin/donations">
              <FaHandHoldingHeart />
              Donations
            </Link>
          </li>
          <li>
            <Link to="/admin/seller-request">
              <FaCogs />
              Seller Request
            </Link>
          </li>
          <li>
            <Link to="/admin/feedback">
              <FaComment />
              User Feedback
            </Link>
          </li>
        </ul>
      </div>
      <div className="admin-dashboard-content">
        <h1>Welcome to Admin Dashboard</h1>
        <p>Select an option from the sidebar to get started.</p>

        <div className="admin-dashboard-cards">
          <div className="admin-dashboard-card">
            <h2 className="title-label"> Total Users/Customers</h2>
            <p className="stats"> <FaUserCheck style={{ color: 'white' }} /> 0</p>
          </div>
          <div className="admin-dashboard-card">
            <h2 className="title-label"> Total Verified Sellers</h2>
            <p className="stats"> <FaHandshake style={{ color: 'white' }} /> 0</p>
          </div>
          <div className="admin-dashboard-card">
            <h2 className="title-label"> Total Product Published</h2>
            <p className="stats"> <FaBoxOpen style={{ color: 'white' }} /> 0</p>
          </div>
          <div className="admin-dashboard-card">
            <h2 className="title-label"> Total Product Sold</h2>
            <p className="stats"> <FaShoppingBag style={{ color: 'white' }} /> 0</p>
          </div>
          <div className="admin-dashboard-card center-card">
            <h2 className="title-label"> Total Donors</h2>
            <p className="stats"> <FaHeart style={{ color: 'white' }} /> 0</p>
          </div>
        </div>

        <div className="admin-dashboard-recent-users">
          <h2>Recent Users</h2>
          <ul>
            <li>
              <span>Username1</span>
              <span>Date1</span>
            </li>
            <li>
              <span>Username2</span>
              <span>Date2</span>
            </li>
            <li>
              <span>Username3</span>
              <span>Date3</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
