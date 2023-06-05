import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  background: linear-gradient(to bottom, #FFFFFF, #FFFFFF, #D6D1E1, #C1B9D7);
  height: 100vh;
  color: #726A8A;
`;

const AboutUs = () => {
  return (
    <Container>
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
                <Link
                  className="btn btn-primary rounded-pill animated-button"
                  to="/signup"
                  style={{
                    backgroundColor: '#726A8A',
                    borderColor: '#726A8A',
                    marginLeft: '10px',
                  }}
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <h1>About Us</h1>
        <p>
        ParentPathIN is a platform dedicated to empowering parents in their journey of raising children. We understand the
        importance of continuous learning and personal growth, which is why we focus on enhancing the skills and knowledge
        of parents to thrive both in their parenting roles and professional lives.
      </p>
      <p>
        Our mission is to provide parents with resources, tools, and opportunities to develop new skills, discover career
        paths that align with their passions, and connect with job opportunities that offer flexibility and work-life balance.
        We believe that being a parent shouldn't limit your professional growth, and we're here to support you in finding
        the right job that fits your lifestyle and aspirations.
      </p>
      <p>
        At ParentPathIN, we also value the power of shared experiences. We provide a platform where parents can come together,
        exchange insights, and learn from one another's journeys. Our community-driven approach encourages parents to share
        their experiences, challenges, and successes, fostering a supportive network where everyone can find inspiration,
        advice, and encouragement.
      </p>
      <p>
        Whether you're looking to enhance your skills, explore new career opportunities, or connect with fellow parents, ParentPathIN
        is your destination. Join us today and unlock the full potential of parenthood while pursuing personal and professional
        fulfillment.
      </p>
      </div>
    </Container>
  );
};

export default AboutUs;