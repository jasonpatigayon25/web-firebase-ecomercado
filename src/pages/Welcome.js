import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../css/Welcome.css';

function Welcome() {
  return (
    <div style={{ background: 'linear-gradient(to bottom, #333, #05652D)', height: '100vh' }}>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ background: '#333' }}>
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Link className="navbar-brand" to="/">
              <img
                src={process.env.PUBLIC_URL + '/ecomercado-logo-white.png'}
                width="220"
                height="55"
                className="d-inline-block align-top"
                alt="Logo"
              />
            </Link>
          </div>
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Button
                  as={Link}
                  to="/login"
                  className="btn btn-primary rounded-pill animated-button"
                  style={{
                    backgroundColor: '#05652D',
                    borderColor: '#05652D',
                    color: '#E3FCE9',
                    marginLeft: '10px',
                  }}
                >
                  Log In
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <hr style={{ backgroundColor: '#333', height: '2px', margin: '0' }} />
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <h1 style={{ fontWeight: 'bold', color: '#fff' }}>Welcome to ECOMercado!</h1>
            <h2 className="mb-4" style={{ color: '#fff' }}>For the exclusive use of ECOMercado's Administration Department.</h2>
            <Button
              className="mx-2 px-4 py-3 hover-effect"
              variant="primary"
              as={Link}
              to="/login"
              size="lg"
              style={{ backgroundColor: '#fff', borderColor: '#ffff', color: '#05652D' }}
            >
              Log In as Administrator
            </Button>
          </Col>
          <Col md={6} className="text-end">
            <Carousel infiniteLoop autoPlay showThumbs={false}>
              <div>
                <img src="/img-1.jpg" alt="1" style={{ height: '360px', width: '600px' }} />
              </div>
              <div>
                <img src="/img-2.jpg" alt="2" style={{ height: '360px', width: '600px' }} />
              </div>
              <div>
                <img src="/img-3.png" alt="3" style={{ height: '360px', width: '600px' }} />
              </div>
              <div>
                <img src="/img-4.png" alt="4" style={{ height: '360px', width: '600px' }} />
              </div>
              <div>
                <img src="/img-5.gif" alt="5" style={{ height: '360px', width: '600px' }} />
              </div>
              <div>
                <img src="/img-6.gif" alt="6" style={{ height: '360px', width: '600px' }} />
              </div>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Welcome;