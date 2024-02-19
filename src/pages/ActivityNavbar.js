import React, { useState } from 'react';
import "../css/ActivityNavbar.css"; 

function ActivityNavbar({ email }) {
  const [activeTab, setActiveTab] = useState('');

  const handleButtonClick = (tabName) => {
    setActiveTab(tabName);
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'user-approved-posts':
        return <p>No approved posts yet.</p>;
      case 'user-pending-products':
        return <p>No pending products yet.</p>;
      case 'user-pending-donations':
        return <p>No pending donations yet.</p>;
      case 'user-declined-posts':
        return <p>No declined posts yet.</p>;
      case 'user-donation-history':
        return <p>No donation history yet.</p>;
      default:
        return <p>Select a category to view its contents.</p>;
    }
  };

  return (
    <div>
      <div className="activity-navbar">
        <ul className="activity-navbar-nav">
          <li className={activeTab === 'user-approved-posts' ? 'active' : ''}>
              <button onClick={() => handleButtonClick('user-approved-posts')}>Approved Posts</button>
          </li>
          <li className={activeTab === 'user-pending-products' ? 'active' : ''}>
            <button onClick={() => handleButtonClick('user-pending-products')}>Pending Products</button>
          </li>
          <li className={activeTab === 'user-pending-donations' ? 'active' : ''}>
            <button onClick={() => handleButtonClick('user-pending-donations')}>Pending Donations</button>
          </li>
          <li className={activeTab === 'user-declined-posts' ? 'active' : ''}>
            <button onClick={() => handleButtonClick('user-declined-posts')}>Declined Posts</button>
          </li>
          <li className={activeTab === 'user-donation-history' ? 'active' : ''}>
            <button onClick={() => handleButtonClick('user-donation-history')}>Donation History</button>
          </li>
        </ul>
      </div>
      <div className="content-display">
        {renderContent()}
      </div>
    </div>
  );
}

export default ActivityNavbar;
