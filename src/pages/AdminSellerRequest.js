import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome, FaChartBar, FaUsers, FaCogs, FaComment, FaHandHoldingHeart,
  FaUser, FaTrash, FaCheck, FaEye
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

// Sample data
const pendingRequests = [
  {username: 'Username1', shopName: 'Shop1'},
  {username: 'Username2', shopName: 'Shop2'},
  {username: 'Username3', shopName: 'Shop3'},
  {username: 'Username4', shopName: 'Shop4'},
  {username: 'Username5', shopName: 'Shop5'},
  {username: 'Username6', shopName: 'Shop6'},
  {username: 'Username7', shopName: 'Shop7'},
  {username: 'Username8', shopName: 'Shop8'},
  {username: 'Username9', shopName: 'Shop9'},
  {username: 'Username10', shopName: 'Shop10'},
];

const approvedSellers = [
  {username: 'Username11', shopName: 'Shop11'},
  {username: 'Username12', shopName: 'Shop12'},
  {username: 'Username13', shopName: 'Shop13'},
  {username: 'Username14', shopName: 'Shop14'},
  {username: 'Username15', shopName: 'Shop15'},
  {username: 'Username16', shopName: 'Shop16'},
  {username: 'Username17', shopName: 'Shop17'},
  {username: 'Username18', shopName: 'Shop18'},
  {username: 'Username19', shopName: 'Shop19'},
  {username: 'Username20', shopName: 'Shop20'},
];


function AdminSellerRequest() {
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
        <h1>Admin Seller Request</h1> 
        <div className="divider"></div>

        <div className="admin-dashboard-recent-users mb-4 shadow">
          <h2>Pending Request</h2>
          <div className="divider"></div>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Shop/Seller Name</th>
                <th colSpan="3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingRequests.map((request, index) => (
                <tr key={index}> 
                  <td>{request.username}</td>
                  <td>{request.shopName}</td>
                  <td><FaEye color="#05652D"/></td>
                  <td><FaTrash style={{ color: 'red' }} /></td>
                  <td><FaCheck style={{ color: '#05652D' }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-dashboard-recent-users mb-4 shadow">
          <h2>Approved Sellers</h2>
          <div className="divider"></div>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Shop/Seller Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {approvedSellers.map((seller, index) => (
                <tr key={index}>
                  <td>{seller.username}</td>
                  <td>{seller.shopName}</td>
                  <td><FaEye color="#05652D"/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminSellerRequest;
