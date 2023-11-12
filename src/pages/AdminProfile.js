import React, { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { db } from '../config/firebase';
import { doc, query, collection, where, getDocs, updateDoc } from "firebase/firestore";
import { Button, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import SidebarOptions from "./SidebarOptions"; 
import "../css/Admin.css"; 

function AdminProfile() {
  const [adminProfile, setAdminProfile] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [editMode, setEditMode] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {

      const adminsRef = collection(db, "admin");
      const q = query(adminsRef, where("email", "==", user.email));

      const fetchAdminProfile = async () => {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const adminData = querySnapshot.docs[0].data();
          setAdminProfile({
            ...adminData,
            docId: querySnapshot.docs[0].id
          });
        } else {
          console.log("No admin profile found!");
        }
      };

      fetchAdminProfile();
    }
  }, [user]);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    setAdminProfile({ ...adminProfile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (adminProfile.docId) {
        const adminRef = doc(db, "admin", adminProfile.docId);
  
        try {
          await updateDoc(adminRef, {
            firstName: adminProfile.firstName,
            lastName: adminProfile.lastName,
          });
          setEditMode(false);
          alert('Profile updated successfully.');
        } catch (error) {
          console.error("Error updating document: ", error);
          alert('There was an error updating the profile.');
        }
      }
    };
  

    return (
      <div className="admin-dashboard">
        <SidebarOptions />
        <div className="admin-dashboard-content">
          <div className="admin-profile-container">
            <h1>Admin Profile</h1>
            <Form onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <FormLabel>First Name</FormLabel>
                <FormControl
                  type="text"
                  name="firstName"
                  value={adminProfile.firstName}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel>Last Name</FormLabel>
                <FormControl
                  type="text"
                  name="lastName"
                  value={adminProfile.lastName}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel>Email</FormLabel>
                <FormControl
                  type="email"
                  name="email"
                  value={adminProfile.email}
                  disabled
                />
              </FormGroup>
              {!editMode ? (
                <Button variant="primary" onClick={handleEditToggle}>Edit Profile</Button>
              ) : (
                <>
                  <Button variant="secondary" onClick={handleEditToggle} className="me-2">
                    Cancel
                  </Button>
                  <Button variant="success" type="submit">
                    Save Changes
                  </Button>
                </>
              )}
            </Form>
          </div>
        </div>
      </div>
    );
  }
  
  export default AdminProfile;