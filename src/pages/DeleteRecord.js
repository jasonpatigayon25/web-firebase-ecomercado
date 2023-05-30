import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function DeleteRecord() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form input
    if (email === '') {
      setErrorMessage('Please enter the email of the record to delete.');
      return;
    }

    try {
      // Call the API to delete the record
      const response = await axios.delete(`http://localhost:8000/delete/${email}`);

      // Reset the form field and messages
      setEmail('');
      setErrorMessage('');
      setSuccessMessage(`${email} is deleted permanently.`);

      // Show a success message
      alert(response.data);
    } catch (error) {
      // Handle the error
      console.error('Error deleting record:', error);
      setErrorMessage('Failed to delete record. Please try again.');
    }
  };

  return (
    <div style={{ background: 'linear-gradient(to bottom, #FFFFFF, #FFFFFF, #E3FCE9, #BEF7CC)', height: '100vh' }}>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: "linear-gradient(to right, #9DC88D, #05652D)" }}>
        <img src={process.env.PUBLIC_URL + "/AppLogo.png"} width="240" height="60" className="d-inline-block align-top" alt="Logo" style={{ marginLeft: "50px" }} />
        <span className="navbar-text" style={{ marginLeft: "20px", color: "white" }}>
          WELCOME ADMIN
        </span>
        <div className="container">
          <div className="d-flex justify-content-end align-items-center w-100">
            <ul className="navbar-nav flex-row">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Container className="d-flex justify-content-center mt-5">
      <Card style={{ background: 'linear-gradient(#05652D, #1F7A3E, #37AF4E)', padding: '20px', borderRadius: '10px' }}>
          <h2 style={{ textAlign: 'center' }}>DELETE RECORD</h2>
          {errorMessage && <div className="error">{errorMessage}</div>}
          {successMessage && <div className="success" style={{ color: 'red', marginBottom: '10px' }}>{successMessage}</div>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label style={{ color: "white" }}>Email/Username</Form.Label>
              <Form.Control
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Input Email/Username"
              />
            </Form.Group>

            <div className="d-flex justify-content-center mt-4">
            <Button
              variant="danger"
              type="submit"
              style={{
                backgroundColor: '#FF0000',
                width: '300px',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                transform: 'translateY(2px)',
              }}
            >
              Delete Record
            </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

export default DeleteRecord;