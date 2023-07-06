import React, { useState } from 'react';
import { Card, Form, Button, Dropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../footer/Footer';
import { BsPersonFill } from 'react-icons/bs';
import '../css/Navbar.css';
import { FaUser } from 'react-icons/fa';

const Donate = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const [donorName, setDonorName] = useState('');
  const [donations, setDonations] = useState('');
  const [address, setAddress] = useState('');
  const [whereToDonate, setWhereToDonate] = useState('');
  const [message, setMessage] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleDonorNameChange = (e) => {
    setDonorName(e.target.value);
  };

  const handleDonationsChange = (e) => {
    setDonations(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleWhereToDonateChange = (e) => {
    setWhereToDonate(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Function for donation
    setDonorName('');
    setDonations('');
    setAddress('');
    setWhereToDonate('');
    setMessage('');
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ background: '#E3FCE9' }}>
      <Link to="/home">
        <img
          src={process.env.PUBLIC_URL + '/ecomercado-logo.png'}
          className="navbar-logo d-inline-block align-top"
          alt="Logo"
        />
        </Link>
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
                    className="nav-link user-icon"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <div className="d-flex flex-column align-items-center">
                      <FaUser
                        className='user-style'
                        style={{
                          fontSize:'24px',
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
      
      <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '90px'}}>
        <Card className="donate" style={{ width: '500px', borderColor: '#05652D'}}>
          <Card.Header as="h2" className="text-center" style={{ color: "white", backgroundColor: "#05652D" }}>
              Donate
            </Card.Header>
          <Card.Body>
            <div className="align-form">
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Donor</Form.Label>
                  <Form.Control 
                  type="text" 
                  value={donorName} 
                  onChange={handleDonorNameChange} 
                  placeholder="Name of Donor"
                  aria-label="Name of Donor"
                  style={{ borderColor: '#05652D', borderRadius: '20px'}}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Donation/s</Form.Label>
                  <Form.Control 
                  type="text" 
                  value={donations} 
                  onChange={handleDonationsChange}
                  placeholder="Item Name/s"
                  aria-label="Item Name/s"
                  style={{ borderColor: '#05652D', borderRadius: '20px'}}
                />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control 
                  type="text" 
                  value={address} 
                  onChange={handleAddressChange} 
                  placeholder="Set"
                  aria-label="Set"
                  style={{ borderColor: '#05652D', borderRadius: '20px'}}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Where to Donate</Form.Label>
                  <Form.Control 
                  type="text" 
                  value={whereToDonate} 
                  onChange={handleWhereToDonateChange} 
                  placeholder="Search organization/charity/person"
                  aria-label="Search organization/charity/person"
                  style={{ borderColor: '#05652D', borderRadius: '20px'}}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Message</Form.Label>
                  <Form.Control 
                  as="textarea" 
                  value={message} 
                  onChange={handleMessageChange}  
                  placeholder="If you would like to leave a message with your donation, please enter it here."
                  aria-label="If you would like to leave a message with your donation, please enter it here."
                  style={{ borderColor: '#05652D', borderRadius: '20px'}}/>
                </Form.Group>
                <Button
                  variant="primary"
                  className="mb-4"
                  style={{ borderColor: '#05652D', backgroundColor: '#05652D', width: '300px', margin: 'auto', display: 'block', marginTop: '40px' }}
                >
                  Donate
                </Button>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Donate;
