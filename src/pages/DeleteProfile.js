import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/DeleteProfile.css';

function DeleteProfile() {
  const [username, setUsername] = useState('');

  const deleteProfile = (e) => {
    e.preventDefault();
    alert(`User ${username} has been banned permanently.`);
  }

  return (
    <div className="delete-profile-container">
      <div className="delete-profile-back-button">
        <Link to="/admin-dashboard">
          <img
            src={process.env.PUBLIC_URL + '/ecomercado-logo.png'}
            width="240"
            height="60"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Link>
      </div>
      <div className="delete-profile-card">
        <h1 className="delete-profile-text-center">Ban User</h1>
        <form onSubmit={deleteProfile}>
          <div className="delete-profile-form-group">
            <label className="delete-profile-form-label">Username/Email</label>
            <input 
              type="text" 
              className="delete-profile-form-control" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="delete-profile-btn delete-profile-w-100">Ban User Permanently</button>
        </form>
      </div>
    </div>
  );
}

export default DeleteProfile;