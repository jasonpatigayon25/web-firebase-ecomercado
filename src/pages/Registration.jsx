import React from 'react';
import { Button, Container, Card, Form, Col } from 'react-bootstrap';

function Registration() {
  return (
    <Container fluid className='d-flex align-items-center justify-content-center' style={{ backgroundColor: '#E3FCE9' }}>
      <Card className='m-5' style={{ maxWidth: '600px' }}>
        <Card.Body className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          <Form>
            <Form.Group className="mb-4" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" size="lg" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" size="lg" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" size="lg" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formRepeatPassword">
              <Form.Label>Repeat your password</Form.Label>
              <Form.Control type="password" size="lg" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formTermsCheck">
              <Form.Check
                type="checkbox"
                label="I agree all statements in Terms of service"
              />
            </Form.Group>

            <Button className="mb-4 w-100" variant="success" size="lg" style={{ backgroundColor: '#05652D', color: 'white' }}>Register</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Registration;