import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function VerifiedSeller() {
  const products = []; // Array of products (empty for example)
  const earnings = null; // Earnings information (null for example)

  return (
    <div className="container mt-5">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Profile Details</Card.Title>
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
            <Card.Body style={{ overflowY: 'auto', maxHeight: '400px' }}>
              <Card.Title>Seller Management</Card.Title>
              <Row className="align-items-center">
                <Col xs={1}>
                  <img
                    src={process.env.PUBLIC_URL + '/products-icon.png'}
                    alt="Products Icon"
                    style={{ width: '24px', height: '24px' }}
                  />
                </Col>
                <Col>
                  <h4>My Products</h4>
                </Col>
              </Row>

              {products.length === 0 ? (
                <Card className="text-center">
                  <Card.Body>No Products Yet</Card.Body>
                </Card>
              ) : (
                // Render the list of products here
                <div>Products list</div>
              )}

              <Button
                variant="primary"
                className="mt-3"
                style={{ borderColor: '#05652D', backgroundColor: '#05652D' }}
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
                    style={{ width: '24px', height: '24px' }}
                  />
                </Col>
                <Col>
                  <h4>My Earnings</h4>
                </Col>
              </Row>

              {earnings === null ? (
                <Card className="text-center">
                  <Card.Body>No Earnings Yet</Card.Body>
                </Card>
              ) : (
                // Render the earnings information here
                <div>Earnings information</div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mt-4">
        <Card.Body>
          <Card.Title>Trend Product</Card.Title>
          {/* Trend product content */}
        </Card.Body>
      </Card>
    </div>
  );
}

export default VerifiedSeller;
