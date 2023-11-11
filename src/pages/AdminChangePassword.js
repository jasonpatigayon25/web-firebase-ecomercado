import React, { useState } from 'react';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import { Container, Row, Col, Card, Form, FormControl, Button } from 'react-bootstrap';
import '../css/AdminChangePassword.css'; 
import { useNavigate } from 'react-router-dom';

function AdminChangePassword() {
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const auth = getAuth();
    const user = auth.currentUser;
    const adminEmail = user ? user.email : ' ';

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (!user) {
            setError('No user is currently logged in.');
            return;
        }

        const credential = EmailAuthProvider.credential(user.email, currentPassword);

        try {
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
            alert('Password updated successfully.');
            navigate('/admin-dashboard');
          
        } catch (err) {
            console.error(err);
            setError('Failed to update password. Make sure the current password is correct.');
        }
    }

    return (
        <div className="container-fluid">
            <Container>
                <Row className="justify-content-center">
                    <Col md="6">
                        <Card className="card p-4 shadow">
                            <h2 className="change-password-title">Change Password for Admin {adminEmail}</h2>
                            {error && <p className="text-danger">{error}</p>}
                            <Form onSubmit={handleSubmit}>
                                <div className="txtinput mb-4">
                                    <label className="password-label">Current Password</label>
                                    <FormControl
                                        type="password"
                                        placeholder="Current Password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="txtinput mb-4">
                                    <label className="password-label">New Password</label>
                                    <FormControl
                                        type="password"
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="txtinput mb-4">
                                    <label className="password-label">Confirm New Password</label>
                                    <FormControl
                                        type="password"
                                        placeholder="Confirm New Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button
                                    className="change-password-button"
                                    type="submit"
                                >
                                    Change Password
                                </Button>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AdminChangePassword;
