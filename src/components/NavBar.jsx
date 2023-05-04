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
          <Link to="/home">
            <img
              src={process.env.PUBLIC_URL + '/AppLogo.png'}
              width="240"
              height="60"
              className="d-inline-block align-top"
              alt="Logo"
            />
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link as={Link} to={"/home"} className="nav-link custom-nav-link">HOME</Nav.Link>
              <Nav.Link as={Link} to={"/testingpage"} className="nav-link custom-nav-link">TESTING</Nav.Link>
              <Nav.Link as={Link} to={"/login"} className="nav-link custom-nav-link">LOGIN</Nav.Link>
              <Nav.Link as={Link} to={"/register"} className="nav-link custom-nav-link">REGISTER</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}