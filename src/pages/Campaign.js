import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import Footer from '../footer/Footer';
import '../css/Campaign.css';
import { BsPersonFill } from 'react-icons/bs';
import '../css/Navbar.css';
import { FaUser } from 'react-icons/fa';


const Campaign = () => {

  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const [hoveredIndex, setHoveredIndex] = useState(null);

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

  const campaigns = [
    {
      id: 1,
      title: 'Plant a Tree Campaign',
      details: 'Join us in planting trees to combat deforestation and promote a greener environment.',
      link: 'https://www.goingzerowaste.com/31-day-zero-waste-challenge/',
    },
    {
      id: 2,
      title: 'Zero Waste Challenge',
      details: 'Take part in our Zero Waste Challenge to reduce waste and adopt sustainable practices in your daily life.',
      link: 'https://www.goingzerowaste.com/31-day-zero-waste-challenge/',
    },
  ];

  return (
    <div className="campaign">
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
      
      <div className="campaign-content">
        <h1 style={{ color: "#05652D" }}>Campaign</h1>
        <p>Join a campaign for promoting sustainability and saving the earth and environment.</p>
        <div className="campaign-list">
          {campaigns.map((campaign) => (
            <div className="campaign-item" key={campaign.id}>
              <h3 style={{ color: "#05652D" }}>{campaign.title}</h3>
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
