import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../css/ActivityNavbar.css"; 

function ActivityNavbar({ email }) {
  const location = useLocation();

  // Function to check if the current path is active
  const checkActive = (path) => {
    // Default to 'user-approved-posts' if no specific tab is selected
    if (location.pathname === '/user-activity' && path === 'user-approved-posts') {
      return true;
    }
    return location.pathname.includes(path);
  };

  return (
    <div className="activity-navbar">
      <ul className="activity-navbar-nav">
        <li className={checkActive('user-approved-posts') ? 'active' : ''}>
            <Link to={`/user-approved-posts`}>Approved Posts</Link>
        </li>
        <li className={checkActive('pending-products') ? 'active' : ''}>
          <Link to={`/user-pending-products`}>Pending Products</Link>
        </li>
        <li className={checkActive('pending-donations') ? 'active' : ''}>
          <Link to={`/user-pending-donations`}>Pending Donations</Link>
        </li>
        <li className={checkActive('declined-posts') ? 'active' : ''}>
          <Link to={`/user-declined-posts`}>Declined Posts</Link>
        </li>
        <li className={checkActive('donation-history') ? 'active' : ''}>
          <Link to={`/user-donation-history`}>Donation History</Link>
        </li>
      </ul>
    </div>
  );
}

export default ActivityNavbar;
