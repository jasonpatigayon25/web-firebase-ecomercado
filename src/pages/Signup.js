import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  FormControl,
  FormCheck,
  Button
} from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Signup() {
  const history = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);

  async function submit(e) {
    e.preventDefault();

    if (!termsChecked) {
      alert("Please accept the terms and conditions.");
      return;
    }

    if (password !== repeatPassword) {
      alert("Passwords do not match. Please re-enter the password.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/signup", {
          email,
          password
        })
        .then(res => {
          if (res.data === "exist") {
            alert("User already exists");
          } else if (res.data === "notexist") {
            history("/home", { state: { id: email } });
          }
        })
        .catch(e => {
          alert("wrong details");
          console.log(e);
        });
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: 'linear-gradient(to right, #9DC88D, #05652D)' }}>
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src={process.env.PUBLIC_URL + '/AppLogo.png'}
              width="240"
              height="60"
              className="d-inline-block align-top"
              alt="Logo" 
            />       
          </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Registration
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Container fluid>
        <Row className="justify-content-center">
          <Col md="6">
            <Card className="text-black m-5" style={{ borderRadius: '25px', background: 'linear-gradient(to bottom, #BEF7CC, #E3FCE9, #FFFFFF)' }}>
              <Form>
                <Row>
                  <Col md="12" className="order-lg-1 d-flex flex-column align-items-center">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <InputGroup>
                        <InputGroup.Text
                        style={{ borderColor: '#05652D', borderRadius: 0 }}>
                            <img src={process.env.PUBLIC_URL + '/account.png'} alt="Account" className="me-3" />
                        </InputGroup.Text>
                        <FormControl
                          placeholder="Your Email/Username"
                          aria-label="Your Email"
                          value={email} onChange={(e) => setEmail(e.target.value)}
                          style={{ borderColor: '#05652D', borderRadius: 0 }}
                        />
                      </InputGroup>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <InputGroup>
                        <InputGroup.Text
                        style={{ borderColor: '#05652D', borderRadius: 0 }}>
                        <img src={process.env.PUBLIC_URL + '/password.png'} alt="Account" className="me-3" />
                        </InputGroup.Text>
                        <FormControl
                          placeholder="Password"
                          aria-label="Password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          style={{ borderColor: '#05652D', borderRadius: 0 }}
                        />
                      </InputGroup>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <InputGroup>
                        <InputGroup.Text
                        style={{ borderColor: '#05652D', borderRadius: 0 }}>
                        <img src={process.env.PUBLIC_URL + '/password.png'} alt="Account" className="me-3" />
                        </InputGroup.Text>
                        <FormControl
                          placeholder="Repeat your password"
                          aria-label="Repeat your password"
                          type="password"
                          value={repeatPassword}
                          onChange={(e) => setRepeatPassword(e.target.value)}
                          style={{ borderColor: '#05652D', borderRadius: 0 }}
                        />
                      </InputGroup>
                    </div>
                    <div className="mb-4">
                      <FormCheck
                        id="flexCheckDefault"
                        label="Accept terms and conditions"
                        checked={termsChecked}
                        onChange={() => setTermsChecked(!termsChecked)}
                      />
                    </div>
                    <Button
                      className="mb-4"
                      size="lg"
                      onClick={submit}
                      style={{ backgroundColor: '#05652D', width: '300px', margin: 'auto', display: 'block' }}
                    >
                      Register
                    </Button>
                    <div className="text-center">
                    <p>
                      Already have an account? <Link to="/login" style={{ color: '#05652D', textDecoration: 'none' }}>Log In</Link>
                    </p>
                  </div>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
          <Col md="6" className="text-center">
            <Carousel
              infiniteLoop
              autoPlay
              showThumbs={false}
              style={{ marginTop: '100px' }}
            >
              <div>
                <img src={process.env.PUBLIC_URL + '/ECO.gif'} alt="ECO" style={{ height: '400px', width: '600px' }} />
              </div>
              <div>
                <img src={process.env.PUBLIC_URL + '/ECO2.png'} alt="ECO2" style={{ height: '400px', width: '600px' }} />
              </div>
              <div>
                <img src={process.env.PUBLIC_URL + '/ECO3.png'} alt="ECO3" style={{ height: '400px', width: '600px' }} />
              </div>
              <div>
                <img src={process.env.PUBLIC_URL + '/ECO4.gif'} alt="ECO4" style={{ height: '400px', width: '600px' }} />
              </div>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Signup;