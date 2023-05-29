import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
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
    <Container>
      <div className="row">
        <div className="col-sm-4">
          <h2>DELETE RECORD</h2>
          {errorMessage && <div className="error">{errorMessage}</div>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </Form.Group>

            <Button
              variant="danger"
              type="submit"
              style={{ backgroundColor: '#FF0000' }}
            >
              Delete Record
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
}

export default DeleteRecord;