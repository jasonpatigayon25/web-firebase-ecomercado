// Notification.js
import React, { useState } from 'react';
import { FaBell, FaTrashAlt, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import SidebarOptions from './SidebarOptions';
import "../css/Admin.css";

function Notification() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'First Notification', muted: false },
    { id: 2, message: 'Second Notification', muted: false },
    { id: 3, message: 'Third Notification', muted: false },
  ]);

  const handleDelete = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  const handleMute = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, muted: true } : notification
      )
    );
  };

  return (
    <div className="admin-dashboard">
      <SidebarOptions />
      <div className="admin-dashboard-content">
        <h2>NOTIFICATIONS</h2>
        <div className="divider"></div>
        <div className="admin-dashboard-notifications mb-4 shadow">
          <table className="notification-table">
            <thead>
              <tr>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notification) => (
                <tr className="notification-item" key={notification.id}>
                  <td className="notification-message" style={{ opacity: notification.muted ? 0.5 : 1 }}>
                    <FaBell /> {notification.message}
                  </td>
                  <td className="notification-actions">
                    <button className="btn-action btn-delete" onClick={() => handleDelete(notification.id)}>
                      <FaTrashAlt /> Delete
                    </button>
                    <button className="btn-action btn-mute" onClick={() => handleMute(notification.id)}>
                      {notification.muted ? <FaVolumeUp /> : <FaVolumeMute />} {notification.muted ? 'Unmute' : 'Mute'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Notification;
