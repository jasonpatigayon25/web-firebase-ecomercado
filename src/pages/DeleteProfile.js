import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/DeleteProfile.css';

function DeleteProfile() {
    const [username, setUsername] = useState('');

    const deleteProfile = (e) => {
        e.preventDefault();

        // You should write your own implementation of deleting user profile here.
        alert(`User ${username} has been banned permanently.`);
    }

    return (
        <div className="delete-profile-container">
            <Link className="back-button" to="/admin-dashboard">Back</Link>
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
