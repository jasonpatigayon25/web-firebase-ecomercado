import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { adminCollection } from '../config/firebase';
import { addDoc, Timestamp } from 'firebase/firestore';
import { query, where, getDocs } from "firebase/firestore";
import { Container, Row, Col, Card, Form, FormControl, FormCheck, Button } from 'react-bootstrap';
import Footer from '../footer/Footer';
import '../css/Signup.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);

  const register = async (e) => {
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
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      
      const q = query(adminCollection, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        alert('User already exists.');  
      }
  
      const dateRegistered = Timestamp.now();
      const userDoc = { email, firstName, lastName, uid, dateRegistered };
      await addDoc(adminCollection, userDoc);
  
      alert('Congratulations! You are now officially registered with ECOMercado.');
      navigate('/login', { state: { id: email } });
    } catch (e) {
      console.log(e);
      if (e.code === 'auth/email-already-in-use') {
        alert('Email already in use.');
      } else {
        alert('Something went wrong.');
      }
    }
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      register(e);
    }
  }

  return (
    <div style={{ background: 'linear-gradient(to right, #E3FCE9, #BEF7CC)' }} onKeyPress={handleKeyPress} >
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
      <Container fluid className="container-fluid">
        <Row className="justify-content-center">
          <Col md="4">
            <Card className="card p-4 shadow">
              <Form>
                <Row>
                  <Col md="12" className="order-lg-1 d-flex flex-column align-items-center">
                    <p className="text-center h1 fw-bold mb-3 mx-1 mx-md-4 mt-3" style={{ color: '#05652D' }}>Sign up</p>
                    <div className="txtinput mb-4">
                      <label className='username-label'>Email Address</label>
                      <FormControl
                        className='username'
                        placeholder="Enter Email Address"
                        aria-label="Enter Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ borderColor: '#05652D', borderRadius: '15px', width: '100%' }}
                      />
                    </div>
                    <div className="txtinput mb-4">
                      <label className='first-name-label'>First Name</label>
                      <FormControl
                        className='first-name'
                        placeholder="Enter First Name"
                        aria-label="Enter First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        style={{ borderColor: '#05652D', borderRadius: '15px', width: '100%' }}
                      />
                    </div>
                    <div className="txtinput mb-4">
                      <label className='last-name-label'>Last Name</label>
                      <FormControl
                        className='last-name'
                        placeholder="Enter Last Name"
                        aria-label="Enter Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        style={{ borderColor: '#05652D', borderRadius: '15px', width: '100%' }}
                      />
                    </div>
                    <div className="txtinput mb-4">
                      <label className='password-label'>Password</label>
                      <FormControl
                        className='password'
                        placeholder="Enter Password"
                        aria-label="Enter Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ borderColor: '#05652D', borderRadius: '15px', width: '100%' }}
                      />
                    </div>
                    <div className="txtinput mb-4">
                      <label className='repeat-password-label'>Repeat Password</label>
                      <FormControl
                        className='repeat-password'
                        placeholder="Repeat your password"
                        aria-label="Repeat your password"
                        type="password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        style={{ borderColor: '#05652D', borderRadius: '15px', width: '100%' }}
                      />
                    </div>
                    <div className="mb-4">
                      <FormCheck id="flexCheckDefault" label="Accept terms and conditions" checked={termsChecked} onChange={() => setTermsChecked(!termsChecked)} />
                    </div>
                    <Button
                      className="mb-4"
                      size="lg"
                      onClick={register}
                      style={{ borderColor: '#05652D', backgroundColor: '#05652D', width: '100%', display: 'block' }}
                    >
                      Register
                    </Button>
                    <div className="text-center">
                      <p>
                        Already have an account? <Link to="/login" style={{ color: '#05652D', textDecoration: 'none' }}>Log In</Link>
                      </p>
                    </div>
                    <div className="divider d-flex align-items-center my-4">
                      <p className="text-or"><span>OR</span></p>
                    </div>
                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      <a href="#!" className="text-black icon-link me-3">
                        <img src={process.env.PUBLIC_URL + '/facebook.png'} alt="Facebook" className="icon" />
                      </a>
                      <a href="#!" className="text-black icon-link">
                        <img src={process.env.PUBLIC_URL + '/google.png'} alt="Google" className="icon" />
                      </a>
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
