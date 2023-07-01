import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import Footer from '../footer/Footer';

const OrderHistory = () => {
  const orders = [
    {
      id: 1,
      date: 'June 1, 2023',
      total: 'Php 500.00',
      status: 'Delivered',
    },
    {
      id: 2,
      date: 'May 20, 2023',
      total: 'Php 250.00',
      status: 'Processing',
    },
    // SAMPLES ONLY
  ];

  const [hoveredIndex, setHoveredIndex] = React.useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="order-history">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ background: '#E3FCE9' }}>
        <img
          src={process.env.PUBLIC_URL + '/ecomercado-logo.png'}
          width="240"
          height="60"
          className="d-inline-block align-top"
          alt="Logo"
          style={{ marginLeft: '50px' }}
        />
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
      </nav>
      
      <div className="container mt-5">
        <h2 className="text-center mb-4">Order History</h2>
        {orders.length > 0 ? (
          <div className="order-list">
            {orders.map((order) => (
              <Card className="mb-3" key={order.id}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5>Order Date: {order.date}</h5>
                      <p>Total Amount: {order.total}</p>
                      <p>Status: {order.status}</p>
                    </div>
                    <div>
                      <Button variant="primary" className="view-button mr-2">
                        View Details
                      </Button>
                      <Button variant="danger" className="remove-button">
                        Cancel Order
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        ) : (
          <div className="empty-order-history text-center">
            <p>You have no order history.</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderHistory;
