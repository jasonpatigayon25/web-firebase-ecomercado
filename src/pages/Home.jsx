import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Home() {
  return (
    <div>
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <h1>Welcome to My Website</h1>
            <p className="lead">THIS IS A HOMEPAGE.</p>
            <ul className="list-unstyled">
              <li>
                <Button variant="primary" as={Link} to="/register">Let's Get Started</Button>
              </li>
              <li>
                <Button variant="secondary" as={Link} to="/login">I Already Have An Account</Button>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;