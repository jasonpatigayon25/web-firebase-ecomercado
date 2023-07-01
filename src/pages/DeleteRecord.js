import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';

function DeleteRecord() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === '') {
      setErrorMessage('Please enter the email of the record to delete.');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8000/delete/${email}`);

      setEmail('');
      setErrorMessage('');
      setSuccessMessage(`${email} is deleted permanently.`);

      alert(`${email} is deleted permanently.`, response.data);
    } catch (error) {

      console.error('Error deleting record:', error);
      setErrorMessage('Failed to delete record. Please try again.');
    }
  };

  return (
    <div>
      <Container className="d-flex justify-content-center mt-5">
      <Card style={{ background: 'linear-gradient(#05652D, #1F7A3E, #37AF4E)', padding: '20px', borderRadius: '10px' }}>
          <h2 style={{ textAlign: 'center', color: 'white' }}>DELETE RECORD</h2>
          {errorMessage && <div style={{ color: 'red' }} className="error">{errorMessage}</div>}
          {successMessage && <div className="success" style={{ color: 'orange', marginBottom: '10px' }}>{successMessage}</div>}
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