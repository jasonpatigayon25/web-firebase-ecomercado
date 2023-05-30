import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  InputGroup,
  FormControl,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import axios from 'axios';

function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/", {
        email,
        password
      })
      .then(res => {
        if (res.data === "exist") {
          history("/home", { state: { id: email } });
        } else if (res.data === "notexist") {
          alert("User has not signed up");
        }else if (res.data === "passwordIncorrect") {
          alert("Incorrect password");
        }
        
      })
      .catch(e => {
        alert("Wrong details");
        console.log(e);
      });

    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="bg-blend-lighten" style={{ backgroundImage: 'url("/bglogin.jpg")', minHeight: '100vh', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: 'linear-gradient(to right, #9DC88D, #05652D)' }}>
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={process.env.PUBLIC_URL + '/AppLogo.png'} width="240" height="60" className="d-inline-block align-top" alt="Logo" />
          </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Registration
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <Container className="my-5" style={{ maxWidth: '400px' }}>
        <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }} className="p-4">
          <Form>
            <h3 className="text-center">Log in to ECOMercado</h3>
            <InputGroup className="mb-4">
              <InputGroup.Text
                style={{ borderColor: '#05652D', borderRadius: 0 }}>
                <img src={process.env.PUBLIC_URL + '/account.png'} alt="Account" className="me-3" />
              </InputGroup.Text>
              <FormControl
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email/Username"
                style={{ borderColor: '#05652D', borderRadius: 0}}
              />
            </InputGroup>
            <InputGroup className="mb-4">
              <InputGroup.Text
                style={{ borderColor: '#05652D', borderRadius: 0 }}>
                <img src={process.env.PUBLIC_URL + '/password.png'} alt="Account" className="me-3" />
              </InputGroup.Text>
              <FormControl
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                style={{ borderColor: '#05652D', borderRadius: 0 }}
              />
            </InputGroup>
            <div className="d-flex justify-content-between mx-3 mb-4">
              <Form.Check
                type="checkbox"
                id="flexCheckDefault"
                label="Remember me"
                className="me-4"
              />
              <a href="#!" style={{ color: '#05652D', textDecoration: 'none' }}>Forgot password?</a>
            </div>
            <Button variant="primary" className="mb-4" onClick={submit} style={{ backgroundColor: '#05652D', width: '300px', margin: 'auto', display: 'block' }}>
              Log in
            </Button>
            <div className="text-center">
              <p>
                Don't have an account? <Link to="/signup" style={{ color: '#05652D', textDecoration: 'none' }}>Sign up</Link>
              </p>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

export default Login;