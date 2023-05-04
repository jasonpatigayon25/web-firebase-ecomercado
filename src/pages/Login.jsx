import React, { useState } from 'react';
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  FormControl
} from 'react-bootstrap';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Container fluid className="bg-blend-lighten" style={{backgroundColor: "#E3FCE9"}}>
      <Row>
        <Col sm='6'>
          <div className='d-flex flex-row ps-5 pt-5'>
            <i className="fas fa-crow fa-3x me-3" style={{ color: '#05652D' }}></i>
            <span className="h1 fw-bold mb-0">Welcome to ECOMercado</span>
          </div>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>Log in</h3>

            <Form.Group className='mb-4 mx-5 w-100'>
              <Form.Label>Email address{email && `: ${email}`}</Form.Label>
              <Form.Control type='email' size="lg" onChange={handleEmailChange} />
            </Form.Group>

            <Form.Group className='mb-4 mx-5 w-100'>
              <Form.Label>Password{password && `: ${password}`}</Form.Label>
              <Form.Control type='password' size="lg" onChange={handlePasswordChange} />
            </Form.Group>

            <Button className="mb-4 px-5 mx-5 w-100" variant='success' size='lg' style={{backgroundColor: "#05652D"}}>
              Login
            </Button>

            <p className="small mb-5 pb-lg-3 ms-5">
              <a className="text-muted" href="#!">Forgot password?</a>
            </p>
            <p className='ms-5'>
              Don't have an account? <a href="#!" className="link-info">Register here</a>
            </p>
          </div>
        </Col>

        <Col sm='6' className='d-none d-sm-block px-0'>
          <img 
            src="/Donate.jpg" 
            alt="Login image" 
            className="w-100" 
            style={{objectFit: 'cover', objectPosition: 'left'}} 
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Login;