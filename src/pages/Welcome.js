import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Welcome() {
  return (
    <div style={{ background: 'linear-gradient(to bottom, #FFFFFF, #FFFFFF, #D6D1E1, #C1B9D7)', height: '100vh' }}>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ background: '#FFFFFF' }}>
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Link className="navbar-brand" to="/">
              <img
                src={process.env.PUBLIC_URL + '/AppLogo2.png'}
                width="240"
                height="60"
                className="d-inline-block align-top"
                alt="Logo"
              />
            </Link>
            <ul className="navbar-nav ml-2 d-flex align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="/about-us">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact-us">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Button
                  as={Link}
                  to="/signup"
                  className="btn btn-primary rounded-pill animated-button"
                  style={{
                    backgroundColor: '#726A8A',
                    borderColor: '#726A8A',
                    marginLeft: '10px',
                  }}
                >
                  Sign Up
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <hr style={{ backgroundColor: '#726A8A', height: '2px', margin: '0' }} />
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <h1 style={{ fontWeight: 'bold', color: '#726A8A' }}>Welcome to ParentPathIN!</h1>
            <h2 className="mb-4" style={{ color: '#726A8A' }}>Empowering Single Parents on the Journey to Success.</h2>
            <Button
              className="mx-2 px-4 py-3"
              variant="primary"
              as={Link}
              to="/signup"
              size="lg"
              style={{ backgroundColor: '#726A8A', borderColor: '#726A8A' }}
            >
              Let's Get Started
            </Button>
            <Link to="/login" className="mx-2 text-decoration-none" style={{ color: '#726A8A' }}>I Already Have An Account</Link>
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
                