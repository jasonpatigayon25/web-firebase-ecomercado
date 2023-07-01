import React, { useState} from "react";
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import { Dropdown } from "react-bootstrap";
import { BsPersonFill } from 'react-icons/bs';

function ChangePassword() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailOrUsername === '') {
      setErrorMessage('Please enter your email or username.');
      return;
    }

    if (currentPassword === '') {
      setErrorMessage('Please enter your current password.');
      return;
    }

    if (newPassword === '') {
      setErrorMessage('Please enter a new password.');
      return;
    }

    if (confirmPassword === '') {
      setErrorMessage('Please confirm your new password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirm password do not match.');
      return;
    }

    try {

      const response = await axios.put(`http://localhost:8000/update/${emailOrUsername}`, {
        newPassword: newPassword,
      });

      setEmailOrUsername('');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setErrorMessage('');
      setSuccessMessage('Password updated successfully.'); 

      alert('Password updated Successfully', response.data);
    } catch (error) {

      console.error('Error updating password:', error);
      setErrorMessage('Failed to update password. Please try again.');
    }
  };

  return (
    <div>
     <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ background: "#E3FCE9" }}>
        <img
          src={process.env.PUBLIC_URL + "/ecomercado-logo.png"}
          width="240"
          height="60"
          className="d-inline-block align-top"
          alt="Logo"
          style={{ marginLeft: "50px" }}
        />
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
            <Link to="/cart">
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

      <Container className="d-flex justify-content-center align-items-center mt-5" style={{ minHeight: '100vh'}} >
        <div className="col-sm-4">
          <Card style={{ background: 'linear-gradient(#05652D, #1F7A3E, #37AF4E)', padding: '20px', borderRadius: '10px' }}>
            <h2 style={{ color: 'white', textAlign: 'center' }}>CHANGE PASSWORD</h2>
            {errorMessage && <div style={{ color: 'red'}} className="error">{errorMessage}</div>}
            {successMessage && <div  style={{ color: 'orange'}} className="success">{successMessage}</div>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="emailOrUsername">
                <Form.Label style={{ color: "white" }}>Email/Username</Form.Label>
                <Form.Control
                  type="text"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  placeholder="Email or Username"
                />
              </Form.Group>
              <Form.Group controlId="currentPassword">
                <Form.Label style={{ color: "white" }}>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Current Password"
                />
              </Form.Group>

              <Form.Group controlId="newPassword">
                <Form.Label style={{ color: "white" }}>New Password</Form.Label>
                <Form.Control
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                />
              </Form.Group>

              <Form.Group controlId="confirmPassword">
                <Form.Label style={{ color: "white" }}>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
              </Form.Group>

              <div className="d-flex justify-content-center mt-4">
                <Button
                  variant="primary"
                  type="submit"
                  style={{ backgroundColor: 'white', color: '#05652D', width: '300px' }}
                >
                  Change Password
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default ChangePassword;