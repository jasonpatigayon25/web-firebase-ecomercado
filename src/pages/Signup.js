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
            alert("Congratulations! You are now officially registered with ParentPathIN.");
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
    <div style={{ background: 'linear-gradient(to bottom, #FFFFFF, #FFFFFF, #D6D1E1, #C1B9D7)', height: '100vh' }}>
      <div className="d-flex align-items-center">
            <Link className="navbar-brand" to="/" style={{ marginLeft: "50px" }}>
              <img
                src={process.env.PUBLIC_URL + '/AppLogo2.png'}
                width="240"
                height="60"
                className="d-inline-block align-top"
                alt="Logo"
              />
            </Link>
            </div>
      <Container fluid>
        <Row className="justify-content-center">
          <Col md="6">
            <Card className="text-black m-5" style={{ borderRadius: '25px',}}>
              <Form>
                <Row>
                  <Col md="12" className="order-lg-1 d-flex flex-column align-items-center">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <InputGroup>
                        <div>
                            <img src={process.env.PUBLIC_URL + '/user.png'} alt="Account" className="me-3" />
                        </div>
                        <FormControl
                          placeholder="Your Email/Username"
                          aria-label="Your Email"
                          value={email} onChange={(e) => setEmail(e.target.value)}
                          style={{ borderColor: '#726A8A', borderRadius: 0 }}
                        />
                      </InputGroup>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <InputGroup>
                        <div>
                        <img src={process.env.PUBLIC_URL + '/lock.png'} alt="Account" className="me-3" />
                        </div>
                        <FormControl
                          placeholder="Password"
                          aria-label="Password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          style={{ borderColor: '#726A8A', borderRadius: 0 }}
                        />
                      </InputGroup>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <InputGroup>
                        <div>
                        <img src={process.env.PUBLIC_URL + '/lock.png'} alt="Account" className="me-3" />
                        </div>
                        <FormControl
                          placeholder="Repeat your password"
                          aria-label="Repeat your password"
                          type="password"
                          value={repeatPassword}
                          onChange={(e) => setRepeatPassword(e.target.value)}
                          style={{ borderColor: '#726A8A', borderRadius: 0 }}
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
                      style={{ backgroundColor: '#726A8A', 
                      width: '300px', 
                      margin: 'auto', 
                      display: 'block' }}
                    >
                      Register
                    </Button>
                    <div className="text-center">
                    <p>
                      Already have an account? <Link to="/login" style={{ color: '#726A8A', textDecoration: 'none' }}>Log In</Link>
                    </p>
                  </div>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Signup;