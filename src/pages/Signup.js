import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Form, InputGroup, FormControl, FormCheck, Button } from 'react-bootstrap';
import Footer from '../footer/Footer';
import '../css/Signup.css';

function Signup() {
  const history = useNavigate();

  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);

  async function submit(e) {
    e.preventDefault();

    if (!termsChecked) {
      alert('Please accept the terms and conditions.');
      return;
    }

    if (password !== repeatPassword) {
      alert('Passwords do not match. Please re-enter the password.');
      return;
    }

    try {
      await axios
        .post('http://localhost:8000/signup', {
          username,
          firstname,
          lastname,
          password,
        })
        .then((res) => {
          if (res.data === 'exist') {
            alert('User already exists');
          } else if (res.data === 'notexist') {
            history('/home', { state: { id: username } });
            alert('Congratulations! You are now officially registered with ECOMercado.');
          }
        })
        .catch((e) => {
          alert('wrong details');
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div style={{ background: 'linear-gradient(to bottom, #E3FCE9, #BEF7CC)' }}>
      <div className="d-flex align-items-center">
        <Link className="navbar-brand" to="/" style={{ marginLeft: '50px' }}>
          <img
            src={process.env.PUBLIC_URL + '/ecomercado-logo.png'}
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
            <Card
              style={{
                borderRadius: '0',
                border: 'none',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
              className="p-4"
            >
              <Form>
                <Row>
                  <Col md="12" className="order-lg-1 d-flex flex-column align-items-center">
                    <p className="text-center h1 fw-bold mb-3 mx-1 mx-md-4 mt-3" style={{ color: '#05652D' }}>Sign up</p>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <InputGroup>
                        <div>
                          <img src={process.env.PUBLIC_URL + '/user.png'} alt="Account" className="me-3" />
                        </div>
                        <FormControl
                          className='username md-2 shadow'
                          placeholder="Enter Username"
                          aria-label="Enter Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          style={{ borderColor: '#05652D', borderRadius: '15px', width: '350px' }}
                        />
                      </InputGroup>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                    <InputGroup>
                      <div>
                        <img src={process.env.PUBLIC_URL + '/user.png'} alt="Account" className="me-3" />
                      </div>
                      <FormControl
                        className='first-name md-2 shadow'
                        placeholder="Enter First Name"
                        aria-label="Enter First Name"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        style={{ borderColor: '#05652D', borderRadius: '15px', width: '350px' }}
                      />
                    </InputGroup>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <InputGroup>
                      <div>
                        <img src={process.env.PUBLIC_URL + '/user.png'} alt="Account" className="me-3" />
                      </div>
                      <FormControl
                        className='last-name md-2 shadow'
                        placeholder="Enter Last Name"
                        aria-label="Enter Last Name"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        style={{ borderColor: '#05652D', borderRadius: '15px', width: '350px'}}
                      />
                    </InputGroup>
                  </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <InputGroup>
                        <div>
                          <img src={process.env.PUBLIC_URL + '/lock.png'} alt="Account" className="me-3" />
                        </div>
                        <FormControl
                          className='password md-2 shadow'
                          placeholder="Enter Password"
                          aria-label="Enter Password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          style={{ borderColor: '#05652D', borderRadius: '15px', width: '350px' }}
                        />
                      </InputGroup>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <InputGroup>
                        <div>
                          <img src={process.env.PUBLIC_URL + '/lock.png'} alt="Account" className="me-3" />
                        </div>
                        <FormControl
                          className='repeat-password md-2 shadow'
                          placeholder="Repeat your password"
                          aria-label="Repeat your password"
                          type="password"
                          value={repeatPassword}
                          onChange={(e) => setRepeatPassword(e.target.value)}
                          style={{ borderColor: '#05652D', borderRadius: '15px', width: '350px' }}
                        />
                      </InputGroup>
                    </div>
                    <div className="mb-4">
                      <FormCheck id="flexCheckDefault" label="Accept terms and conditions" checked={termsChecked} onChange={() => setTermsChecked(!termsChecked)} />
                    </div>
                    <Button
                      className="mb-4"
                      size="lg"
                      onClick={submit}
                      style={{ borderColor: '#05652D', backgroundColor: '#05652D', width: '300px', margin: 'auto', display: 'block' }}
                    >
                      Register
                    </Button>
                    <div className="text-center">
                      <p>
                        Already have an account? <Link to="/login" style={{ color: '#05652D', textDecoration: 'none' }}>Log In</Link>
                      </p>
                      <div className="divider d-flex align-items-center my-4">
                        <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                      </div>

                      <div className="d-flex justify-content-center text-center mt-4 pt-1">
                        <a href="#!" className="text-black icon-link me-3">
                          <img src={process.env.PUBLIC_URL + '/facebook.png'} alt="Facebook" className="icon" />
                        </a>
                        <a href="#!" className="text-black icon-link mb-1">
                          <img src={process.env.PUBLIC_URL + '/google.png'} alt="Google" className="icon" style={{ marginBottom: '3px' }} />
                        </a>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Signup;
