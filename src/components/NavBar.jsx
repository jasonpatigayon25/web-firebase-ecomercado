import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" style={{ backgroundImage: 'linear-gradient(to left, #05652D, #9DC88D)' }} variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ color: 'black' }}>
            <img
              src={process.env.PUBLIC_URL + '/AppLogo.png'}
              width="200"
              height="60"
              className="d-inline-block align-top"
              alt="Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/home"} style={{ color: 'black', fontWeight: 'bold' }}>Home</Nav.Link>
              <Nav.Link as={Link} to={"/form"} style={{ color: 'black', fontWeight: 'bold' }}>Form</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={Link} to={"/login"} style={{ color: 'black', fontWeight: 'bold' }}>Login</Nav.Link>
              <Nav.Link as={Link} to={"/register"} style={{ color: 'black', fontWeight: 'bold' }}>Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}