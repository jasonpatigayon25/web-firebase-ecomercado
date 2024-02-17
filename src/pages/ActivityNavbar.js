import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../css/ActivityNavbar.css"; 

function ActivityNavbar({ email }) {
  const location = useLocation();

  const checkActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="activity-navbar">
      <ul className="activity-navbar-nav">
        <li className={checkActive('approved-posts') ? 'active' : ''}>
          <Link to={`/user-activity/${email}/approved-posts`}>Approved Posts</Link>
        </li>
        <li className={checkActive('pending-products') ? 'active' : ''}>
          <Link to={`/user-activity/${email}/pending-products`}>Pending Products</Link>
        </li>
        <li className={checkActive('pending-donations') ? 'active' : ''}>
          <Link to={`/user-activity/${email}/pending-donations`}>Pending Donations</Link>
        </li>
        <li className={checkActive('declined-posts') ? 'active' : ''}>
          <Link to={`/user-activity/${email}/declined-posts`}>Declined Posts</Link>
        </li>
        <li className={checkActive('donation-history') ? 'active' : ''}>
          <Link to={`/user-activity/${email}/donation-history`}>Donation History</Link>
        </li>
      </ul>
    </div>
  );
}

export default ActivityNavbar;
