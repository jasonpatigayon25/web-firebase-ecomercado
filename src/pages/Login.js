import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, InputGroup, FormControl, Form, Button, Card } from 'react-bootstrap';
import '../css/Login.css';
import { auth } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        navigate('/admin-dashboard', { state: { id: user.email } });
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  async function submit(e) {
    e.preventDefault();

    try {
      
      await signInWithEmailAndPassword(auth, email, password);

      navigate('/admin-dashboard', { state: { id: email } });
    } catch (error) {
      console.log(error);
      switch (error.code) {
        case 'auth/user-not-found':
          alert('User has not signed up.');
          break;
        case 'auth/wrong-password':
          alert('Incorrect password.');
          break;
        case 'auth/invalid-email':
          alert('Invalid email format.');
          break;
        default:
          alert('Something went wrong.');
          break;
      }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      submit(e);
    }
  };

  return (
    <div style={{ background: 'linear-gradient(to bottom, #05652D, #E3FCE9)', height: '100vh' }} onKeyPress={handleKeyPress}>
      <div className="d-flex align-items-center">
        <Link className="navbar-brand" to="/" style={{ marginLeft: '50px' }}>
          <img
            src={process.env.PUBLIC_URL + '/ecomercado-logo-white.png'}
            width="240"
            height="60"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Link>
      </div>

      <Container className="my-5" style={{ maxWidth: '400px' }}>
        <Card
            style={{
              borderRadius: '0',
              border: 'none',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
            className="p-4 shadow"
          >
          <Form>
            <p className="text-center h1 fw-bold mb-3 mx-1 mx-md-3 mt-2" style={{ color: '#fff' }}>Log In</p>
            <InputGroup className="mb-4">
              <div>
                <img src={process.env.PUBLIC_URL + '/user.png'} alt="Account" className="me-3" />
              </div>
              <FormControl
                className='username'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                style={{ borderColor: '#05652D', borderRadius: 0 }}
              />
            </InputGroup>
            <InputGroup className="mb-4">
              <div>
                <img src={process.env.PUBLIC_URL + '/lock.png'} alt="Account" className="me-3" />
              </div>
              <FormControl
                className='password'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                style={{ borderColor: '#05652D', borderRadius: 0 }}
              />
            </InputGroup>
            <div className="d-flex justify-content-between mx-3 mb-4">
              <Form.Check type="checkbox" id="flexCheckDefault" label="Remember me" className="me-4 white-text" />
              <Link to="/forgot-password" style={{ color: '#E3FCE9', textDecoration: 'none' }}>
              Forgot password?
          </Link>
            </div>
            <Button
              variant="primary"
              className="custom-button mb-4"
              onClick={submit}
              style={{
                fontWeight: 'bold',
                borderColor: '#05652D',
                backgroundColor: '#05652D',
                width: '300px',
                margin: 'auto',
                display: 'block'
              }}
              >
              Log in
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

export default Login;
