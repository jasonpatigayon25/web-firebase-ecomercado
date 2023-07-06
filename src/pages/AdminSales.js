import React from "react";
import { Link } from "react-router-dom";
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

function AdminSales() {

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
      <div>
        <div>
      <h1>Sales and Revenue</h1>


      {/* This is where your graph would go
      <SalesGraph /> */}
    </div>
      </div>
    </div>
  );
}

export default AdminSales;
