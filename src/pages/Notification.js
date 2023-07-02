import React, { useState } from 'react';

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNotification = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="notification">
      <button className="notification-icon" onClick={toggleNotification}>
        <img src={process.env.PUBLIC_URL + '/notification.png'} alt="Notification" />
      </button>
      {isOpen && (
        <div className="notification-dropdown">
          <h3>Notifications</h3>
          <ul>
            <li>Notification 1</li>
            <li>Notification 2</li>
            <li>Notification 3</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notification;