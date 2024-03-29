  import React, { useState } from 'react';
  import { db } from '../config/firebase';
  import { query, collection, where, getDocs, updateDoc } from "firebase/firestore";
  import '../css/DeleteProfile.css';
  import '../css/Admin.css';
  import SidebarOptions from "./SidebarOptions";

  function BanUser() {
    const [email, setEmail] = useState('');

    const banUser = async (e) => {
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
          await updateDoc(document.ref, {
            banned: true
          });
        });

        alert(`${email} has been banned permanently.`);
        setEmail('');
      } catch (error) {
        console.error("Error banning the user: ", error);
        alert("Failed to ban the user.");
      }

      const productsRef = collection(db, "products");
        const productsQuery = query(productsRef, where("seller_email", "==", email));

        try {
          const productsSnapshot = await getDocs(productsQuery);

          productsSnapshot.forEach(async (productDoc) => {
            await updateDoc(productDoc.ref, {
              isDisabled: true
            });
          });

          console.log(`Products from ${email} have been disabled.`);
        } catch (error) {
          console.error("Error disabling the user's products: ", error);
        }

        const donationsRef = collection(db, "donation");
        const donationsQuery = query(donationsRef, where("donor_email", "==", email));

        try {
          const donationsSnapshot = await getDocs(donationsQuery);

          donationsSnapshot.forEach(async (donationDoc) => {
            await updateDoc(donationDoc.ref, {
              isDisabled: true
            });
          });

          console.log(`Donations from ${email} have been disabled.`);
        } catch (error) {
          console.error("Error disabling the user's donations: ", error);
        }
    }

    return (
      <div className="admin-dashboard">
        <SidebarOptions />
        <div className="admin-dashboard-content">
          <div className="delete-profile-container">
            <div className="delete-profile-card">
              <h1 className="delete-profile-text-center">Ban User</h1>
              <form onSubmit={banUser}>
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
        </div>
      </div>
    );
  }

  export default BanUser;
