import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import '../css/SwitchAccount.css';

function SwitchAccount() {
  const navigate = useNavigate();
  const [selectedAccount, setSelectedAccount] = useState('');

  const accounts = ['User1', 'User2', 'User3'];

  const handleSwitchAccount = e => {
    e.preventDefault();
    //
    alert(`Switched to ${selectedAccount}`);
    navigate('/admin-dashboard');
  };

  return (
    <Container className="switch-account-container">
      <div className="switch-account-w-100">
        <Card className="switch-account-card">
          <Card.Body>
            <h2 className="switch-account-text-center switch-account-mb-4">Switch Account</h2>
            <Form>
              <Form.Group id="account" className="switch-account-form-group">
                <Form.Label className="switch-account-form-label">Select Account</Form.Label>
                <Form.Control
                  className="switch-account-form-control"
                  as="select"
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                >
                  <option value="">--Select Account--</option>
                  {accounts.map((account, index) => (
                    <option key={index} value={account}>
                      {account}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button
                className="switch-account-w-100 switch-account-text-center switch-account-mt-4 switch-account-btn"
                onClick={handleSwitchAccount}
                disabled={!selectedAccount}
              >
                Switch
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="switch-account-w-100 switch-account-text-center switch-account-mt-3">
          <Link to="/admin-dashboard">Cancel</Link>
        </div>
      </div>
    </Container>
  );
}

export default SwitchAccount;
