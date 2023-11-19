import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, InputGroup, FormControl, Form, Button, Card } from 'react-bootstrap';
import '../css/ForgotPassword.css';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebase";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      alert('Check your inbox for further instructions');
      navigate('/');
    } catch (error) {
      console.log(error);
      switch (error.code) {
        case 'auth/user-not-found':
          alert('There is no user record corresponding to this email.');
          break;
        case 'auth/invalid-email':
          alert('The email address is not valid.');
          break;
        default:
          alert('Something went wrong.');
          break;
      }
    } finally {
      setLoading(false);
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
      <Container className="my-5" style={{ maxWidth: '450px' }}>
        <Card
            style={{
              borderRadius: '0',
              border: 'none',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
            className="p-4 shadow"
          >
          <Form>
            <p className="text-center h1 fw-bold mb-3 mx-1 mx-md-3 mt-2" style={{ color: '#05652D' }}>Forgot Password</p>
            <InputGroup className="mb-4">
              <div>
                <img src={process.env.PUBLIC_URL + '/user.png'} alt="Account" className="me-3" />
              </div>
              <FormControl
                className='email'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                style={{ borderColor: '#05652D', borderRadius: 0 }}
              />
            </InputGroup>

            <Button
              variant="primary"
              className="mb-4"
              onClick={submit}
              disabled={loading}
              style={{ fontWeight: 'bold', borderColor: '#05652D', backgroundColor: '#05652D', width: '300px', margin: 'auto', display: 'block' }}
            >
              {loading ? "Sending..." : "Reset Password"}
            </Button>
            <div className="text-center">
              <p>
                Remember your password? <Link to="/login" style={{ color: '#05652D', textDecoration: 'none' }}>Log in</Link>
              </p>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

export default ForgotPassword;