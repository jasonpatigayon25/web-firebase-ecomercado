import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const ContactUs = () => {
  return (
    <div style={{ background: 'linear-gradient(to bottom, #FFFFFF, #FFFFFF, #D6D1E1, #C1B9D7)'}}>
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

      <div className="container">
        <h1 style={{ color: '#726A8A'}}>Contact Us</h1>
        <p>
          Thank you for visiting our website. If you have any questions, feedback, or inquiries, please feel free to
          contact us using the information below or by filling out the contact form.
        </p>

        <h2 style={{ color: '#726A8A'}}>Contact Information</h2>
        <ul>
          <li>Email: parentpathin@gmail.com</li>
          <li>Phone: 123-456-7890</li>
          <li>Address: 123 My Street, City, State, ZIP</li>
        </ul>

        <h2 style={{ color: '#726A8A'}}>Contact Form</h2>
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
          <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#726A8A', borderColor: '#726A8A' }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;