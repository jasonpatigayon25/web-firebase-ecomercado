import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Container = styled.div`
  background: linear-gradient(to bottom, #FFFFFF, #E3FCE9, #BEF7CC);
  color: #05652D;
  font-size: 18px; 
  padding-bottom: 50px; 
`;

const ContactHeader = styled.h1`
  font-size: 36px;
  margin-top: 40px;
`;

const ContactSubHeader = styled.h2`
  font-size: 28px;
  margin-top: 40px;
`;

const ContactInfoList = styled.ul`
  margin-top: 20px;
`;

const ContactUs = () => {
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
        <div className="container py-5">
          <ContactHeader>Contact Us</ContactHeader>
          <p className="mt-4">
            Thank you for visiting our website. If you have any questions, feedback, or inquiries, please feel free to
            contact us using the information below or by filling out the contact form.
          </p>

          <ContactSubHeader>Contact Information</ContactSubHeader>
          <ContactInfoList>
            <li>Email: ecomercado@gmail.com</li>
            <li>Phone: 09956710656</li>
            <li>Facebook: ECOMercado</li>
          </ContactInfoList>
        </div>
    </Container>
    );
  };

export default ContactUs;