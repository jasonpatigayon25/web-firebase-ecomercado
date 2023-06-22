import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Welcome.css';

// Import the Navbar component
import Navbar from './Navbar';

function Welcome() {
  return (
    <div style={{ background: 'linear-gradient(to bottom, #FFFFFF, #E3FCE9, #BEF7CC)', height: '100vh' }}>
      {/* Use the Navbar component */}
      <Navbar />
      
      <hr style={{ backgroundColor: '#05652D', height: '2px', margin: '0' }} />
      
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <h1 style={{ fontWeight: 'bold', color: '#05652D' }}>Welcome to ECOMercado!</h1>
            <h2 className="mb-4" style={{ color: '#05652D' }}>Shop and donate to reduce waste and support a sustainable future.</h2>
            <Button
              className="mx-2 px-4 py-3 hover-effect"
              variant="primary"
              as={Link}
              to="/signup"
              size="lg"
              style={{ backgroundColor: '#05652D', borderColor: '#05652D', color: '#E3FCE9' }}
            >
              Let's Get Started
            </Button>
            <Link to="/login" className="mx-2 text-decoration-none hover-effect" style={{ color: '#05652D' }}>I Already Have An Account</Link>
          </Col>
          <Col md={6} className="text-end">
            <Carousel infiniteLoop autoPlay showThumbs={false}>
              <div>
                <img src="/welcome1.png" alt="1" style={{ height: '400px', width: '600px' }} />
              </div>
              <div>
                <img src="/welcome2.jpg" alt="2" style={{ height: '400px', width: '600px' }} />
              </div>
              <div>
                <img src="/welcome3.webp" alt="3" style={{ height: '400px', width: '600px' }} />
              </div>
              <div>
                <img src="/welcome4.jpg" alt="4" style={{ height: '400px', width: '600px' }} />
              </div>
              <div>
                <img src="/welcome5.jpg" alt="5" style={{ height: '400px', width: '600px' }} />
              </div>
              <div>
                <img src="/welcome6.jpg" alt="6" style={{ height: '400px', width: '600px' }} />
              </div>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Welcome;