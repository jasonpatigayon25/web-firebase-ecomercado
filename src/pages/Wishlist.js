import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import Footer from '../footer/Footer';
import '../css/Wishlist.css';

const Wishlist = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Product 1',
      price: 'Php 100.00',
      description: 'Description of product sample.',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 'Php 75.50',
      description: 'Description of product sample.',
    },
  ]); //Sample of wishlist items

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleRemoveItem = (itemId) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <div className="wishlist">
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
            <Link to="/cart">
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
        <h2 className="text-center mb-4" style={{ marginTop: '60px' }}>
          Wishlist
        </h2>

        {wishlistItems.length > 0 ? (
          <div className="wishlist-items">
            {wishlistItems.map((item) => (
              <Card className="mb-4 wishlist-item" key={item.id}>
                <Card.Body>
                  <div className="row">
                    <div className="col-md-3">
                      <Card.Img
                        src={`product${item.id}.jpg`}
                        alt={`Product ${item.id}`}
                        className="wishlist-item-image"
                      />
                    </div>
                    <div className="col-md-9">
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>{item.price}</Card.Text>
                      <Card.Text>{item.description}</Card.Text>
                      <div className="button-container">
                        <Button
                          variant="primary"
                          style={{ backgroundColor: '#05652D', borderColor: '#05652D' }}
                        >
                          Add to Cart
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => handleRemoveItem(item.id)}
                            
                            >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        ) : (
          <div className="empty-wishlist text-center">
            <p>Your wishlist is empty.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;
