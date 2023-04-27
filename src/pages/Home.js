import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';


function Home() {
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h1>Welcome to My Website</h1>
          <p className="lead">THIS IS A HOMEPAGE.</p>
          <ul className="list-unstyled">
            <li>
              <Button variant="primary" as={Link} to="/login">Login</Button>
            </li>
            <li>
              <Button variant="secondary" as={Link} to="/register">Register</Button>
            </li>
            <li>
              <Button variant="light" as={Link} to="/about">About Us</Button>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;