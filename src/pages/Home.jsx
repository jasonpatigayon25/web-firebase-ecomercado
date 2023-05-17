import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Home() {
  return (
    <div>
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <h1 style={{ fontWeight: 'bold', color: '#05652D' }}>Welcome to ECOMercado!</h1>
            <h2 className="mb-4" style={{ color: '#05652D' }}>Shop and donate to reduce waste and support a sustainable future.</h2>
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
            <Link to="/login" className="mx-2 text-decoration-none" style={{ color: '#05652D' }}>I Already Have An Account</Link>
          </Col>
          <Col md={6} className="text-end">
            <Carousel infiniteLoop autoPlay showThumbs={false}>
              <div>
                <img src="/ECO.png" alt="ECO" style={{ height: '600px', width: '600px' }} />
              </div>
              <div>
                <img src="/ECO2.jpg" alt="ECO2" style={{ height: '600px', width: '600px' }} />
              </div>
              <div>
                <img src="/ECO3.jpg" alt="ECO3" style={{ height: '600px', width: '600px' }} />
              </div>
              <div>
                <img src="/ECO4.jpg" alt="ECO4" style={{ height: '600px', width: '600px' }} />
              </div>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;