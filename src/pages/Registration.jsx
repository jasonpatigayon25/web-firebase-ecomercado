import React from 'react';
import { Button, Container, Card, Form } from 'react-bootstrap';

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      repassword: "",
      registeredUser: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, repassword } = this.state;
    console.log(username, email, password, repassword);

    fetch("http://localhost:5000/Registration",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application.json",
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        username, 
        email, 
        password, 
        repassword
      }),
    }).then((res)=>res.json())
    .then((data)=>{
      console.log(data, "userRegister");
    });

    this.setState({ registeredUser: { username, email, password } });
  }

  renderRegisteredUser() {
    const { registeredUser } = this.state;
    if (registeredUser) {
      return (
        <div>
          <h3>Registered User:</h3>
          <p>Username: {registeredUser.username}</p>
          <p>Email: {registeredUser.email}</p>
          <p>Password: {registeredUser.password}</p>
        </div>
      );
    } else {
      return null;
    }
    
  }

  render() {
    return (
      <div className='bg-blend-lighten' style={{ backgroundImage: 'url("/bg.png")', minHeight: '100vh', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
        <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
          <Card className='m-5' style={{ maxWidth: '600px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <Card.Body className='px-5'>
              <h2 className="text-uppercase text-center mb-5">Create an account</h2>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-4" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" size="lg" onChange={e => this.setState({ username: e.target.value })} />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" size="lg" onChange={e => this.setState({ email: e.target.value })} />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" size="lg" onChange={e => this.setState({ password: e.target.value })} />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formRepeatPassword">
                  <Form.Label>Repeat your password</Form.Label>
                  <Form.Control type="password" size="lg" onChange={e => this.setState({ repassword: e.target.value })} />
                </Form.Group>

                <Button type="submit" className="mb-4 w-100" variant="success" size="lg" style={{ backgroundColor: '#05652D', color: 'white' }}>Register</Button>
              </Form>

            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

export default Registration;