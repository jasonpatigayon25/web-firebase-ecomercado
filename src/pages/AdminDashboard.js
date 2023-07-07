import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome, FaChartBar, FaUsers, FaCogs, FaComment, FaHandHoldingHeart,
  FaUserCheck, FaHandshake, FaBoxOpen, FaShoppingBag, FaHeart, FaUser
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

const recentUsers = [
  {username: 'Username1', date: '2023-06-01'},
  {username: 'Username2', date: '2023-05-25'},
  {username: 'Username3', date: '2023-05-18'},
  {username: 'Username4', date: '2023-05-16'},
  {username: 'Username5', date: '2023-05-10'},
  {username: 'Username6', date: '2023-05-05'},
  {username: 'Username7', date: '2023-04-29'},
  {username: 'Username8', date: '2023-04-20'},
  {username: 'Username9', date: '2023-04-12'},
  {username: 'Username10', date: '2023-04-03'}
];

function AdminDashboard() {
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
        <h1>Admin Dashboard</h1> 
        <div className="divider"></div>
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

        <div className="admin-dashboard-recent-users mb-4 shadow">
          <h2>Recent Users</h2>
          <div className="divider"></div>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Date Registered</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
