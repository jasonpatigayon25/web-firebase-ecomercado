import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Welcome() {
  return (
    <div style={{ background: 'linear-gradient(to bottom, #FFFFFF, #FFFFFF, #E3FCE9, #BEF7CC)', height: '100vh' }}>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: 'linear-gradient(to right, #9DC88D, #05652D)' }}>
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src={process.env.PUBLIC_URL + '/AppLogo.png'}
              width="240"
              height="60"
              className="d-inline-block align-top"
              alt="Logo"
            />
          </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Registration
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <h1 style={{ fontWeight: 'bold', color: '#05652D' }}>Welcome to ECOMercado!</h1>
            <h2 className="mb-4" style={{ color: '#05652D' }}>Shop and donate to reduce waste and support a sustainable future.</h2>
            <Button
              className="mx-2 px-4 py-3"
              variant="primary"
              as={Link}
              to="/signup"
              size="lg"
              style={{ backgroundColor: '#05652D', borderColor: '#05652D' }}
            >
              Let's Get Started
            </Button>
            <Link to="/login" className="mx-2 text-decoration-none" style={{ color: '#05652D' }}>I Already Have An Account</Link>
          </Col>
          <Col md={6} className="text-end">
            <Carousel infiniteLoop autoPlay showThumbs={false}>     
              <div>
                <img src="/ECO.gif" alt="ECO" style={{ height: '400px', width: '600px' }} />
              </div>
              <div>
                <img src="/ECOX.gif" alt="ECOX" style={{ height: '400px', width: '600px' }} />
              </div>
              <div>
                <img src="/ECO2.png" alt="ECO2" style={{ height: '400px', width: '600px' }} />
              </div>
              <div>
                <img src="/ECO3.png" alt="ECO3" style={{ height: '400px', width: '600px' }} />
              </div>
              <div>
                <img src="/ECO4.gif" alt="ECO4" style={{ height: '400px', width: '600px' }} />
              </div>
              <div>
                <img src="/ECO5.gif" alt="ECO5" style={{ height: '400px', width: '600px' }} />
              </div>
            </Carousel>
            </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Welcome;