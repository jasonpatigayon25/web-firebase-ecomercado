import React, { useState } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container fluid className="bg-blend-lighten" style={{ backgroundColor: '#E3FCE9' }}>
      <Row>
        <Col sm="6">
          <div className="d-flex flex-row ps-5 pt-5">
            <i className="fas fa-crow fa-3x me-3" style={{ color: '#05652D' }}></i>
            <span className="h1 fw-bold mb-0">Welcome to ECOMercado</span>
          </div>

          <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4">
            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>
              Log in
            </h3>

            <Form.Group className="mb-4 mx-5 w-100">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" size="lg" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-4 mx-5 w-100">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" size="lg" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Button className="mb-4 px-5 mx-5 w-100" variant="success" size="lg" style={{ backgroundColor: '#05652D' }}>
              Login
            </Button>

            <p className="small mb-5 pb-lg-3 ms-5">
              <a className="text-muted" href="#!">
                Forgot password?
              </a>
            </p>
            <p className="ms-5">
              Don't have an account? <a href="#!" className="link-info" style={{ color: '#05652D' }}>Register here</a>
            </p>
          </div>
        </Col>

        <Col sm="6" className="d-none d-sm-block px-0">
          <Carousel>
            <Carousel.Item>
              <img src="/Donate.jpg" alt="Slide 1" className="w-100" style={{ objectFit: 'cover', objectPosition: 'left' }} />
            </Carousel.Item>
            <Carousel.Item>
              <img src="/Donate2.jpg" alt="Slide 2" className="w-100" style={{ objectFit: 'cover', objectPosition: 'left' }} />
            </Carousel.Item>
            <Carousel.Item>
              <img src="/Donate3.jpg" alt="Slide 3" className="w-100" style={{ objectFit: 'cover', objectPosition: 'left' }} />
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;