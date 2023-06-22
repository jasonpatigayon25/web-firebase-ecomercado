import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Navbar() {
  return (
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
  );
}

export default Navbar;