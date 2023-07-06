import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome, FaChartBar, FaUsers, FaCogs, FaComment, FaHandHoldingHeart,
  FaUser,
  FaEye
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

 // sample data
 const donors = [
    {username: 'Username1', date: '7/6/23', product: 'Product1'},
    {username: 'Username2', date: '7/6/23', product: 'Product2'},
    {username: 'Username3', date: '7/6/23', product: 'Product3'},
    {username: 'Username4', date: '7/6/23', product: 'Product4'},
    {username: 'Username5', date: '7/6/23', product: 'Product5'},
    {username: 'Username6', date: '7/6/23', product: 'Product6'},
  ];
  
function AdminDonations() {
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
        <h1>Admin Donations Review</h1> 
        <div className="divider"></div>

        <div className="admin-dashboard-recent-users mb-4 shadow">
          <h2>Total Donors: 0 </h2>
          <div className="divider"></div>
          <ul>
            {donors.map((donor, index) => (
                <li key={index}>
                <img src="https://via.placeholder.com/150" alt="User" />  
                <div style={{ fontSize: '20px'}}>{donor.product}</div>
                <div style={{color: '#05652D', fontSize: '20px'}}>{donor.username}</div> 
                <div style={{color: 'grey'}}>{donor.date}</div>
                <Link to={`/view-product/${donor.product}`}><FaEye/></Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminDonations;
