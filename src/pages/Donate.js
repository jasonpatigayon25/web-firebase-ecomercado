import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Donate = () => {
  const [donorName, setDonorName] = useState('');
  const [donations, setDonations] = useState('');
  const [address, setAddress] = useState('');
  const [whereToDonate, setWhereToDonate] = useState('');
  const [message, setMessage] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
    // Logic for submitting the donation form
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
              <Link className="nav-link" to="/home">
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
                  Settings
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <hr style={{ backgroundColor: '#05652D', height: '2px', margin: '0' }} />
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', marginTop: '50px'}}>
        <Card className="donate" style={{ width: '500px', borderColor: '#05652D'}}>
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
    </div>
  );
};

export default Donate;
