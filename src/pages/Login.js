import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, InputGroup, FormControl, Form, Button, Card } from 'react-bootstrap';
import Footer from '../footer/Footer';
import '../css/Login.css';
import { getDocs, query, where } from "firebase/firestore";
import { auth, facebookProvider, googleProvider } from "../config/firebase";
import { usersCollection } from '../config/firebase';
import {
  signInWithPopup,
} from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();

    try {
      const q = query(usersCollection, where("user", "==", username));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert('User has not signed up');
        return;
      }

      // Get the first document from the query (should only be one)
      const userDoc = querySnapshot.docs[0];

      if (userDoc.data().password !== password) {
        alert('Incorrect password');
        return;
      }

      navigate('/admin-dashboard', { state: { id: username } });
    } catch (error) {
      console.log(error);
      alert('Something went wrong.');
    }
  }

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/admin-dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithFacebook = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
    } catch (err) {
      console.error(err);
    }
  };

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
            <p className="text-center h1 fw-bold mb-3 mx-1 mx-md-3 mt-2" style={{ color: '#05652D' }}>Log In</p>
            <InputGroup className="mb-4">
              <div>
                <img src={process.env.PUBLIC_URL + '/user.png'} alt="Account" className="me-3" />
              </div>
              <FormControl
                className='username'
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
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
              <Form.Check type="checkbox" id="flexCheckDefault" label="Remember me" className="me-4" />
              <a href="#!" style={{ color: '#05652D', textDecoration: 'none' }}>
                Forgot password?
              </a>
            </div>
            <Button
              variant="primary"
              className="mb-4"
              onClick={submit}
              style={{ fontWeight: 'bold', borderColor: '#05652D', backgroundColor: '#05652D', width: '300px', margin: 'auto', display: 'block' }}
            >
              Log in
            </Button>
            <div className="text-center">
              <p>
                Don't have an account? <Link to="/signup" style={{ color: '#05652D', textDecoration: 'none' }}>Sign up</Link>
              </p>
            </div>

            <div className="divider d-flex align-items-center my-4">
            <p className="text-or"><span>OR</span></p>
            </div>

            <div className="d-flex justify-content-center text-center mt-4 pt-1">
            <a href="#!" className="text-black icon-link me-3" onClick={signInWithFacebook}>
              <img src={process.env.PUBLIC_URL + '/facebook.png'} alt="Facebook" className="icon" />
            </a>
            <a href="#!" className="text-black icon-link" onClick={signInWithGoogle}>
              <img src={process.env.PUBLIC_URL + '/google.png'} alt="Google" className="icon" />
            </a>
          </div>

          </Form>
        </Card>
      </Container>
      <Footer />
    </div>
  );
}

export default Login;
