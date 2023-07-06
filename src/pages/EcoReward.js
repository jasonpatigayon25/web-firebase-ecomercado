import React, { useState} from "react";
import { Link, useLocation } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Dropdown } from "react-bootstrap";
import Footer from '../footer/Footer';
import { BsPersonFill } from 'react-icons/bs';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';


function EcoReward() {
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
  
    const rewards = [
    {
      title: 'Aquaflask Water Bottle',
      description: 'Stay hydrated on the go with this eco-friendly water bottle.',
      image: 'water-bottle.jpg',
    },
    {
      title: 'Organic Tote Bag',
      description: 'Carry your groceries and everyday items in this stylish organic tote bag.',
      image: 'tote-bag.jpg',
    },
    {
      title: 'Plantable Seed Paper',
      description: 'Plant this seed paper and watch it grow into beautiful flowers or herbs.',
      image: 'seed-paper.jpg',
    },
  ];

  const qualifyingAmount = 200;

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ background: "#E3FCE9" }}>
      <Link to="/home">
        <img
          src={process.env.PUBLIC_URL + "/ecomercado-logo.png"}
          width="240px"
          height="60px"
          className="d-inline-block align-top"
          alt="Logo"
          style={{ marginLeft: "50px" }}
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
            <Link to="/shopping-cart">
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
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <div className="d-flex flex-column align-items-center">
                      <img
                        src={process.env.PUBLIC_URL + "/settings.png"}
                        alt="Option"
                        className="nav-icon"
                        style={{
                          transform: hoveredIndex === 2 ? "scale(1.1)" : "scale(1)",
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

      <div style={{ paddingTop: '80px' }}>
      <Container className="py-5">
        <h1 className="text-center mb-4">Eco-Lover Rewards</h1>
        <p className="text-center">Explore and redeem your eco-points for exciting rewards!</p>
        <p className="text-center">
          To qualify for the rewards, make a purchase of at least {qualifyingAmount} pesos from ECOMercado.
        </p>
        <Row className="justify-content-center mt-5">
          {rewards.map((reward, index) => (
            <Col md="4" key={index}>
              <Card className="mb-4 shadow">
                <Card.Img variant="top" src={reward.image} alt={reward.title} className="reward-image" />
                <Card.Body>
                  <Card.Title>{reward.title}</Card.Title>
                  <Card.Text>{reward.description}</Card.Text>
                  <Button
                    variant="primary"
                    style={{ backgroundColor: '#05652D', borderColor: '#05652D'}}
                    >
                    Redeem
                    </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </div>
    </div>
  );
}

export default EcoReward;
