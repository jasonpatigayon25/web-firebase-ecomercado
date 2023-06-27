import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Footer from '../footer/Footer';

const Container = styled.div`
  background: linear-gradient(to bottom, #FFFFFF, #E3FCE9, #BEF7CC);
  color: #05652D;
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

      <div className="container">
        <h1>Contact Us</h1>
        <p>
          Thank you for visiting our website. If you have any questions, feedback, or inquiries, please feel free to
          contact us using the information below or by filling out the contact form.
        </p>

        <h2>Contact Information</h2>
        <ul>
          <li>Email: ecomercado@gmail.com</li>
          <li>Phone: 123-456-7890</li>
          <li>Address: 123 My Street, City, State, ZIP</li>
        </ul>

        <h2>Contact Form</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input type="text" id="name" name="name" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input type="email" id="email" name="email" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Message:
            </label>
            <textarea id="message" name="message" rows="5" className="form-control"></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ backgroundColor: '#05652D', borderColor: '#05652D' }}
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </Container>
  );
};

export default ContactUs;