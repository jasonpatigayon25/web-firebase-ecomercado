import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome, FaChartBar, FaUsers, FaCogs, FaComment, FaHandHoldingHeart,
  FaUser
} from "react-icons/fa";
import { Dropdown, Modal } from "react-bootstrap";
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
const feedbacks = [
  {username: 'OceanBreeze22', feedback: 'The user interface is good but ...', date: '5/29/23'},
  {username: 'CosmicUser', feedback: 'The search feature can be improved ...', date: '5/29/23'},
  {username: 'TechGuru77', feedback: 'Really like the design aesthetics...', date: '5/30/23'},
  {username: 'UserRandom', feedback: 'Customer service was not up to the mark...', date: '5/31/23'},
  {username: 'ReactFan', feedback: 'The site loads quickly and smoothly...', date: '5/31/23'},
  {username: 'UserXYZ', feedback: 'Had issues with payment gateway ...', date: '5/31/23'},
  {username: 'MountainPeak', feedback: 'The variety of products is amazing...', date: '5/31/23'},
  {username: 'Runner23', feedback: 'I found exactly what I was looking for...', date: '6/1/23'},
  {username: 'SunsetLover', feedback: 'There are a few bugs in the mobile view...', date: '6/2/23'},
  {username: 'UserGreen', feedback: 'The website is very user-friendly...', date: '6/3/23'},
  {username: 'UrbanNoise', feedback: 'The checkout process was a bit complex...', date: '6/4/23'},
  {username: 'GeekGal', feedback: 'The site navigation is quite intuitive...', date: '6/5/23'},
  {username: 'EcoUser', feedback: 'Love the eco-friendly products on offer...', date: '6/6/23'},
  {username: 'NightOwl', feedback: 'Had some issues with the cart page...', date: '6/7/23'},
  {username: 'FreshUser', feedback: 'Really appreciate the swift delivery...', date: '6/8/23'}
];


function AdminUserFeedback() {

  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const handleFeedbackClick = (feedback) => {
    setSelectedFeedback(feedback);
  }

  const handleClose = () => {
    setSelectedFeedback(null);
  }
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
        <h1>Admin User Feedback</h1> 
        <div className="divider"></div>

        <div className="admin-dashboard-recent-users mb-4 shadow">
          <h2>User Feedbacks</h2>
          <div className="divider"></div>
          <ul>
            {feedbacks.map((feedback, index) => (
              <li key={index} onClick={() => handleFeedbackClick(feedback)}>
                <strong>{feedback.username}</strong>: {feedback.feedback.slice(0, 20) + "..."} - <i>{feedback.date}</i>
              </li>
            ))}
          </ul>
        </div>

        <Modal show={selectedFeedback !== null} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>User Feedback</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedFeedback && (
              <>
                <p><strong>{selectedFeedback.username}</strong> - <i>{selectedFeedback.date}</i></p>
                <p>{selectedFeedback.feedback}</p>
              </>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default AdminUserFeedback;
