import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import { useState } from 'react';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #E3FCE9;
`;

const FormCard = styled.div`
  padding: 2rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
`;

const fields = [  { label: 'Email Address', type: 'text', placeholder: 'Input Email' },
{ label: 'Password', type: 'password', placeholder: 'Input Password' }];

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #05652D;
  text-shadow: 2px 2px #E3FCE9;
`;

function BasicExample() {
  const [emailAddrs, setEmailAddrs] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container>
      <FormCard>
        <Title>Testing Activity</Title>
        <Form>
          {fields.map((field) => {
            return (
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>{field.label}</Form.Label>
                <Form.Control
                  type={field.type}
                  placeholder={field.placeholder}
                  onChange={(e) =>
                    field.label === 'Email Address'
                      ? setEmailAddrs(e.target.value)
                      : setPassword(e.target.value)
                  }
                />
              </Form.Group>
            );
          })}
          <Button variant="primary" type="submit" style={{ backgroundColor: "#05652D" }}>
            Submit
          </Button>
          <br />
          <h2>Your email address is {emailAddrs}</h2>
          <h2>Your password is {password}</h2>
        </Form>
      </FormCard>
    </Container>
  );
}

export default BasicExample;