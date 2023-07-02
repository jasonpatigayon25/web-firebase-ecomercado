import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Seller() {
  const [shopName, setShopName] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // function for product
    setShopName("");
    setPickupAddress("");
    setPhoneNumber("");
    setEmail("");
  };

  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center">
        <Link className="navbar-brand" to="/home">
          <img
            src={process.env.PUBLIC_URL + "/ecomercado-logo.png"}
            width="240"
            height="60"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Link>
      </div>
      <Card style={{ borderColor: "#05652D" }}>
        <Card.Header as="h2" className="text-center" style={{ color: "white", backgroundColor: "#05652D" }}>
          Seller Registration
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="shopName">
              <Form.Label>Shop Name</Form.Label>
              <Form.Control type="text" value={shopName} onChange={(e) => setShopName(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="pickupAddress">
              <Form.Label>Pickup Address</Form.Label>
              <Form.Control
                type="text"
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Button
              variant="primary"
              className="mb-4"
              style={{
                borderColor: '#05652D',
                backgroundColor: '#05652D',
                width: '300px',
                margin: 'auto',
                display: 'block',
                marginTop: '20px',
              }}
              as={Link}
              to="/verified-seller"
            >
              Register as Seller
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Seller;
