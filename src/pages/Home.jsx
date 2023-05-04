import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Home() {
  return (
    <div>
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <h1 style={{fontWeight: 'bold', color: '#05652D'}}>Welcome to ECOMercado!</h1>
            <h2 className="mb-4" style={{color: '#05652D'}}>Shop and donate to reduce waste and support a sustainable future.</h2>
            <Button
              className="mx-2 px-4 py-3"
              variant="primary"
              as={Link}
              to="/register"
              size="lg"
              style={{ backgroundColor: '#05652D', borderColor: '#05652D' }}
            >
              Let's Get Started
            </Button>
            <Link to="/login" className="mx-2 text-decoration-none" style={{color: '#05652D'}}>I Already Have An Account</Link>
          </Col>
          <Col md={6} className="text-end">
            <img src="/ECO.png" alt="ECO" style={{ height: '700px', width: '700px'}} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;