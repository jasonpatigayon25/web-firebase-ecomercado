import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Link  } from 'react-router-dom';
import Home from "../pages/Home";
import Login from '../pages/Login';
import Registration from '../pages/Registration';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

class NavBar extends Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">WELCOME</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/home"}>Home</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={Link} to={"/login"}>Login</Nav.Link>
              <Nav.Link as={Link} to={"/register"}>Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}