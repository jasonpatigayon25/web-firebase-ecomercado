import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function DeleteRecord() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

      // Reset the form field
      setEmail('');
      setErrorMessage('');

      // Show a success message
      alert(response.data);
    } catch (error) {
      // Handle the error
      console.error('Error deleting record:', error);
      setErrorMessage('Failed to delete record. Please try again.');
    }
  };

  return (
    <div className="div1">
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: "linear-gradient(to right, #9DC88D, #05652D)" }}>
        <img src={process.env.PUBLIC_URL + "/AppLogo.png"} width="240" height="60" className="d-inline-block align-top" alt="Logo" style={{ marginLeft: "50px" }} />

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
        <Card style={{ background: 'linear-gradient(rgba(255, 255, 255, 0.7), rgba(5, 101, 45, 0.7))', padding: '20px' }}>
          <h2>DELETE RECORD</h2>
          {errorMessage && <div className="error">{errorMessage}</div>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email/Username</Form.Label>
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
                style={{ backgroundColor: '#FF0000', width: '300px' }}
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