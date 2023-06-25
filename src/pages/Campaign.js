import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import Footer from './Footer';

const Campaign = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const campaigns = [
    {
      id: 1,
      title: 'Plant a Tree Campaign',
      details: 'Join us in planting trees to combat deforestation and promote a greener environment.',
      link: 'https://example.com/plant-a-tree-campaign',
    },
    {
      id: 2,
      title: 'Zero Waste Challenge',
      details: 'Take part in our Zero Waste Challenge to reduce waste and adopt sustainable practices in your daily life.',
      link: 'https://example.com/zero-waste-challenge',
    },
  ];

  return (
    <div className="campaign">
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          marginTop: '20px',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <h2>Campaign</h2>
        <p>Join a campaign for promoting sustainability and saving the earth and environment.</p>
        <div className="campaign-list">
          {campaigns.map((campaign) => (
            <div className="campaign-item" key={campaign.id}>
              <h3>{campaign.title}</h3>
              <p>{campaign.details}</p>
              <a href={campaign.link} target="_blank" rel="noopener noreferrer">
                Join Campaign
              </a>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Campaign;