import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import '../css/EditProfile.css';

function EditProfile() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // ... perform save operation here ...
    navigate('/admin-dashboard');
  };

  return (
    <Container className="edit-profile-container">
      <div className="edit-profile-w-100">
        <Card className="edit-profile-card">
          <Card.Body>
            <h2 className="edit-profile-text-center edit-profile-mb-4">Edit Profile</h2>
            <Form>
              <Form.Group id="name" className="edit-profile-form-group">
                <Form.Label className="edit-profile-form-label">Name</Form.Label>
                <Form.Control
                  className="edit-profile-form-control"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </Form.Group>
              <Form.Group id="email" className="edit-profile-form-group edit-profile-mt-4">
                <Form.Label className="edit-profile-form-label">Email</Form.Label>
                <Form.Control
                  className="edit-profile-form-control"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </Form.Group>
              <Button className="edit-profile-w-100 edit-profile-text-center edit-profile-mt-4 edit-profile-btn" onClick={handleSubmit}>
                Save Changes
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="edit-profile-w-100 edit-profile-text-center edit-profile-mt-3">
          <Link to="/admin-dashboard">Cancel</Link>
        </div>
      </div>
    </Container>
  );
}

export default EditProfile;
