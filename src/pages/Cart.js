import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import Footer from './Footer';

const Cart = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };


  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="cart">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ background: '#E3FCE9' }}>
        <img
          src={process.env.PUBLIC_URL + '/ecomercado-logo.png'}
          width="240"
          height="60"
          className="d-inline-block align-top"
          alt="Logo"
          style={{ marginLeft: "50px" }}
        />
        <div className="container">
          <form className="d-flex justify-content-center" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search Products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "600px", borderColor: "#05652D" }}
            />
            <button className="btn" type="submit" style={{ borderColor: "#05652D" }}>
              <img
                src={process.env.PUBLIC_URL + "/search-icon.png"}
                alt="Search"
                className="nav-icon"
                style={{
                  transform: hoveredIndex === 4 ? "scale(1.1)" : "scale(1)",
                }}
                onMouseEnter={() => handleMouseEnter(4)}
                onMouseLeave={handleMouseLeave}
              />
            </button>
          </form>
          <button className="btn" type="submit" style={{ borderColor: "transparent" }}>
          <Link to="/cart">
            <img
              src={process.env.PUBLIC_URL + "/shopping-cart.png"}
              alt="Cart"
              className="nav-icon"
              style={{
                transform: hoveredIndex === 3 ? "scale(1.1)" : "scale(1)",
              }}
              onMouseEnter={() => handleMouseEnter(3)}
              onMouseLeave={handleMouseLeave}
            />
            </Link>
          </button>
          <div className="d-flex justify-content-end align-items-center w-100">
            <ul className="navbar-nav flex-row">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  <div className="d-flex flex-column align-items-center">
                    <img
                      src={process.env.PUBLIC_URL + "/home.png"}
                      alt="Home"
                      className="nav-icon"
                      style={{
                        transform: hoveredIndex === 0 ? "scale(1.1)" : "scale(1)",
                      }}
                      onMouseEnter={() => handleMouseEnter(0)}
                      onMouseLeave={handleMouseLeave}
                    />
                    Home
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  <div className="d-flex flex-column align-items-center">
                    <img
                      src={process.env.PUBLIC_URL + "/notification.png"}
                      alt="notif"
                      className="nav-icon"
                      style={{
                        transform: hoveredIndex === 1 ? "scale(1.1)" : "scale(1)",
                      }}
                      onMouseEnter={() => handleMouseEnter(1)}
                      onMouseLeave={handleMouseLeave}
                    />
                    Notification
                  </div>
                </Link>
              </li>
            <li className="nav-item dropdown">
              <Dropdown>
                <Dropdown.Toggle
                  className="nav-link"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div className="d-flex flex-column align-items-center">
                    <img
                      src={process.env.PUBLIC_URL + '/settings.png'}
                      alt="Option"
                      className="nav-icon"
                      style={{
                        transform: hoveredIndex === 2 ? 'scale(1.1)' : 'scale(1)',
                      }}
                      onMouseEnter={() => handleMouseEnter(2)}
                      onMouseLeave={handleMouseLeave}
                    />
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/change-account">Change Account</Dropdown.Item>
                  <Dropdown.Item href="/change-password">Change Password</Dropdown.Item>
                  <Dropdown.Item href="/language">Language</Dropdown.Item>
                  <Dropdown.Item href="/help">Help</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="/">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <h2 className="text-center mb-4"  style={{ marginTop: "100px" }}>Shopping Cart</h2>

        <Card className="mb-3">
          <div className="row no-gutters">
            <div className="col-md-4">
              <Card.Img src="product1.jpg" alt="Product 1" />
            </div>
            <div className="col-md-8">
              <Card.Body>
                <Card.Title>Product 1</Card.Title>
                <Card.Text>Price: Php 100.00</Card.Text>
                <Card.Text>Quantity: 1</Card.Text>
                <Button variant="danger" className="remove-button">Remove</Button>
              </Card.Body>
            </div>
          </div>
        </Card>

        <Card className="mb-3">
          <div className="row no-gutters">
            <div className="col-md-4">
              <Card.Img src="product2.jpg" alt="Product 2" />
            </div>
            <div className="col-md-8">
              <Card.Body>
                <Card.Title>Product 2</Card.Title>
                <Card.Text>Price: Php 75.50</Card.Text>
                <Card.Text>Quantity: 2</Card.Text>
                <Button variant="danger" className="remove-button">Remove</Button>
              </Card.Body>
            </div>
          </div>
        </Card>

        <div className="empty-cart text-center">
          <p>Your cart is empty.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
