import React, { useState } from 'react';
import { Card, Button, Row, Col, Form, Image, Dropdown} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from "react-router-dom";
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BsPersonFill } from 'react-icons/bs';
import '../css/ShoppingCart.css';
import Footer from '../footer/Footer';

const ShoppingCart = () => {

    const location = useLocation();
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

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
    
  const items = [
    {
      id: 1,
      name: 'Product 1',
      price: 'Php 100.00',
      description: 'Second-hand, Affordable, Good Quality',
      image: 'product1'
    },
    {
      id: 2,
      name: 'Product 2',
      price: 'Php 200.00',
      description: 'Surplus stock, Affordable, Good Quality',
      image: 'product2'
    },
  ];

  const [hover, setHover] = useState(false);

  const style = {
      backgroundColor: hover ? '#05652D' : 'transparent',
      color: hover ? 'white' : '#05652D',
      borderColor: '#05652D',
  };
  
  const [quantities, setQuantities] = useState(items.map(() => 1));

  const increaseQuantity = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
  }

  const decreaseQuantity = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 0) {
      newQuantities[index] -= 1;
    }
    setQuantities(newQuantities);
  }

  return (
    <div className="container h-100 py-5">
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
      <div className="row d-flex justify-content-center align-items-center h-100" style={{ marginTop: "70px"    }}>
        <div className="col-10"> 
          {items.map((item, index) => (
            <Card className="rounded-3 mb-4 shadow" key={item.id}>
              <Card.Body className="p-4 ">
                <Row className="d-flex justify-content-between align-items-center">
                  <Col md={2}>
                  <Image
                    src={`${process.env.PUBLIC_URL}product${index + 1}.jpg`}
                    className="img-fluid rounded-3 md-4 shadow"
                    alt={item.name}
                    />
                  </Col>
                  <Col md={3}>
                    <p className="lead fw-normal mb-2">{item.name}</p>
                    <p><span className="text-muted">{item.description}</span></p>
                  </Col>
                  <Col md={3} className="d-flex">
                    <Button variant="link" className="px-2" onClick={() => decreaseQuantity(index)}>
                      <FontAwesomeIcon icon={faMinus} />
                    </Button>

                    <Form.Control
                      id={`form${item.id}`}
                      min="0"
                      name="quantity"
                      value={quantities[index]}
                      type="number"
                      className="form-control form-control-sm"
                      readOnly
                    />

                    <Button variant="link" className="px-2" onClick={() => increaseQuantity(index)}>
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                  </Col>
                  <Col md={3}>
                    <h5 className="mb-0">{item.price}</h5>
                  </Col>
                  <Col md={1} className="text-end">
                    <Button variant="link" className="text-danger">
                      <FontAwesomeIcon icon={faTrash} size="lg" />
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}

                <Card className="mb-4">
                    <Card.Body className="p-4 d-flex flex-row">
                        <Form.Group className="flex-fill">
                        <Form.Control 
                            type="text" 
                            id="form1" 
                            placeholder= "Enter Eco-Lover Voucher Code"
                            className="form-control-lg" 
                        />
                        </Form.Group>
                        <Button 
                            type="button"
                            className="btn-lg ms-3"
                            style={style}
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                        >
                            Apply
                        </Button>
                    </Card.Body>
                    </Card>

                    <Card>
                    <Card.Body>
                        <Button
                        type="button"
                        className="btn-block btn-lg custom-button"
                        style={{ backgroundColor: "#05652D", border: "#05652D" }}
                        >
                        Check Out
                    </Button>
                </Card.Body>
             </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ShoppingCart;
