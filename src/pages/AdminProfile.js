import React, { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { db } from '../config/firebase';
import { doc, query, collection, where, getDocs, updateDoc } from "firebase/firestore";
import { Button, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import SidebarOptions from "./SidebarOptions"; 

import "../css/AdminProfile.css"; 

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
            <h1 className="admin-profile-header">Admin Details</h1>
            <Form onSubmit={handleSubmit} className="admin-profile-form">
              <FormGroup className="mb-3" controlId="formFirstName">
                <FormLabel>First Name</FormLabel>
                <FormControl
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  value={adminProfile.firstName}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
              </FormGroup>
              <FormGroup className="mb-3" controlId="formLastName">
                <FormLabel>Last Name</FormLabel>
                <FormControl
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  value={adminProfile.lastName}
                  onChange={handleInputChange}
                  disabled={!editMode}
                />
              </FormGroup>
              <FormGroup className="mb-3" controlId="formEmail">
                <FormLabel>Email</FormLabel>
                <FormControl
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={adminProfile.email}
                  disabled 
                />
              </FormGroup>
              <div className="admin-profile-actions">
                {!editMode ? (
                  <Button variant="outline-primary" onClick={handleEditToggle}>
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button variant="outline-secondary" onClick={handleEditToggle} className="me-2">
                      Cancel
                    </Button>
                    <Button variant="outline-success" type="submit">
                      Save Changes
                    </Button>
                  </>
                )}
              </div>
            </Form>
          </div>
        </div>
      </div>
    ); 
  }
  
  export default AdminProfile;