import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Footer from '../footer/Footer';

const Container = styled.div`
  background: linear-gradient(to bottom, #FFFFFF, #E3FCE9, #BEF7CC);
  height: 100vh;
  color: #05652D;
`;

const AboutUs = () => {
  return (
    <Container>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ background: '#FFFFFF' }}>
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Link className="navbar-brand" to="/">
              <img
                src={process.env.PUBLIC_URL + '/ecomercado-logo.png'}
                width="220"
                height="55"
                className="d-inline-block align-top"
                alt="Logo"
              />
            </Link>
            <ul className="navbar-nav ml-2 d-flex align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="/about-us" style={{ color: '#05652D' }}>
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact-us" style={{ color: '#05652D' }}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login" style={{ color: '#05652D' }}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Button
                  as={Link}
                  to="/signup"
                  className="btn btn-primary rounded-pill animated-button"
                  style={{
                    backgroundColor: '#05652D',
                    borderColor: '#05652D',
                    color: '#E3FCE9',
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
      <hr style={{ backgroundColor: '#05652D', height: '2px', margin: '0' }} />

      <div className="container">
        <h1>About Us</h1>
        <p>
        Welcome to ECOMercado. A one-stop shop for all your online shopping needs. Our app is designed to make your shopping experience fast, 
        easy and hassle-free. We have a wide range of products in various categories such as fashion, electronics, home appliances, beauty products and more.
        </p>
        <p>
        At ECOMercado, we strive to provide the highest quality products at affordable prices. Our team strives to ensure a seamless and safe shopping experience
         with fast and reliable shipping services. We also offer a variety of payment options so you can choose the one that is most convenient for you. 
         We believe that shopping should be fun and stress-free, and that's exactly what we aim for. Our easy-to-use app makes it easy to browse and shop for your favorite products, 
         track your orders, and even receive exclusive offers and promotions.
        </p>
        <p>
        At ECOMercado, we are dedicated to making a positive impact on our community and environment by promoting sustainable shopping practices. 
        Our online marketplace offers a wide range of products, from reusable items to upcycled goods, to help reduce waste and protect our planet.
        </p>
        <p>
        We believe in the power of small actions, and by choosing to shop with us, you are making a difference. 
        Join our community today and discover the joy of conscious consumerism.
        </p>
        <p>
        Thank you for choosing ECOMercado.
        </p>
      </div>
      <Footer />
    </Container>
  );
};

export default AboutUs;