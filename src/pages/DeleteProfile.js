import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../config/firebase';
import { query, collection, where, getDocs, deleteDoc } from "firebase/firestore";
import '../css/DeleteProfile.css';

function DeleteProfile() {
  const [email, setEmail] = useState('');

  const deleteProfile = async (e) => {
    e.preventDefault();

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));

    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert(`No user found with email: ${email}`);
        return;
      }

      querySnapshot.forEach(async (document) => {
        await deleteDoc(document.ref);
      });

      alert(`${email} has been banned permanently.`);
      setEmail('');
    } catch (error) {
      console.error("Error banning the user: ", error);
      alert("Failed to ban the user.");
    }
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
            <label className="delete-profile-form-label">Email</label>
            <input 
              type="text" 
              className="delete-profile-form-control" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="delete-profile-btn delete-profile-w-100 delete-profile-btn-red">Ban User Permanently</button>
        </form>
      </div>
    </div>
  );
}

export default DeleteProfile;
