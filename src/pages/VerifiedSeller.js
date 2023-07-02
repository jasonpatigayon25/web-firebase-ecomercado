import React, { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import Footer from '../footer/Footer';
import '../css/VerifiedSeller.css';
import { BsPersonFill } from 'react-icons/bs';



function VerifiedSeller() {

  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const products = []; // Array of products
  const earnings = null; // Earnings information

  const [hoveredIndex, setHoveredIndex] = React.useState(null);

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
    <div className="verified-seller">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ background: '#E3FCE9' }}>
        <img
          src={process.env.PUBLIC_URL + '/ecomercado-logo.png'}
          width="240"
          height="60"
          className="d-inline-block align-top"
          alt="Logo"
          style={{ marginLeft: '50px' }}
        />
        <div className="container">
          <form className="d-flex justify-content-center" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search Products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '600px', borderColor: '#05652D' }}
            />
            <button className="btn" type="submit" style={{ borderColor: '#05652D' }}>
              <img
                src={process.env.PUBLIC_URL + '/search-icon.png'}
                alt="Search"
                className="nav-icon"
                style={{
                  transform: hoveredIndex === 4 ? 'scale(1.1)' : 'scale(1)',
                }}
                onMouseEnter={() => handleMouseEnter(4)}
                onMouseLeave={handleMouseLeave}
              />
            </button>
          </form>
          <button className="btn" type="submit" style={{ borderColor: 'transparent' }}>
            <Link to="/shopping-cart">
              <img
                src={process.env.PUBLIC_URL + '/shopping-cart.png'}
                alt="Cart"
                className="nav-icon"
                style={{
                  transform: hoveredIndex === 3 ? 'scale(1.1)' : 'scale(1)',
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
                      src={process.env.PUBLIC_URL + '/home.png'}
                      alt="Home"
                      className="nav-icon"
                      style={{
                        transform: hoveredIndex === 0 ? 'scale(1.1)' : 'scale(1)',
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
                      src={process.env.PUBLIC_URL + '/notification.png'}
                      alt="notif"
                      className="nav-icon"
                      style={{
                        transform: hoveredIndex === 1 ? 'scale(1.1)' : 'scale(1)',
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
                    <Dropdown.Item disabled>
                      <BsPersonFill size={16} color="#6c757d" style={{ marginRight: '5px' }} />
                      {location.state?.id}
                    </Dropdown.Item>
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
        <Row>
          <Col md={4}>
            <Card>
              <Card.Body className='profile detail md-4 shadow'>
                <Card.Title style= {{ color: '#05652D'}}>Profile Details</Card.Title>
                <Card.Img variant="top" src="user-image.jpg" />
                <Card.Text>
                  <strong>Shop/Seller Name:</strong> Shop Name
                </Card.Text>
                <Card.Text>
                  <strong>Pick Up Address:</strong> 123 Main St, City, Country
                </Card.Text>
                <Card.Text>
                  <strong>Phone Number:</strong> +1 123-456-7890
                </Card.Text>
                <Card.Text>
                  <strong>Email Address:</strong> seller@example.com
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <Card>
              <Card.Body className='seller-management md-4 shadow' style={{ overflowY: 'auto', maxHeight: '400px' }}>
                <Card.Title style= {{ color: '#05652D'}}>Seller Management</Card.Title>
                <Row className="align-items-center">
                  <Col xs={1}>
                    <img
                      src={process.env.PUBLIC_URL + '/products-icon.png'}
                      alt="Products Icon"
                      style={{ width: '30px', height: '30px' }}
                    />
                  </Col>
                  <Col>
                    <h3>My Products</h3>
                  </Col>
                </Row>

                {products.length === 0 ? (
                  <Card className="text-center">
                    <Card.Body>No Products Yet</Card.Body>
                  </Card>
                ) : (
                  // list of products
                  <div>Products list</div>
                )}

                <Button
                  variant="primary"
                  className="mt-3"
                  style={{ borderColor: '#05652D', backgroundColor: '#05652D', width: '100%' }}
                  as={Link}
                  to="/add-product"
                >
                  Add New Product
                </Button>

                <Row className="mt-4 align-items-center">
                  <Col xs={1}>
                    <img
                      src={process.env.PUBLIC_URL + '/earnings-icon.png'}
                      alt="Earnings Icon"
                      style={{ width: '30px', height: '30px' }}
                    />
                  </Col>
                  <Col>
                    <h3>My Earnings</h3>
                  </Col>
                </Row>

                {earnings === null ? (
                  <Card className="text-center">
                    <Card.Body>No Earnings Yet</Card.Body>
                  </Card>
                ) : (
                  //earnings information 
                  <div>Earnings information</div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="mt-4">
          <Card.Body className='trend-product md-4 shadow'>
            <Card.Title style= {{ color: '#05652D'}}>Trend Product</Card.Title>
            {/* Trend product content -Walay mahunaan*/}
          </Card.Body>
        </Card>
      </div>

      <Footer />
    </div>
  );
}

export default VerifiedSeller;
