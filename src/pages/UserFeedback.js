import React, { useState, useEffect } from "react";
import SidebarOptions from "./SidebarOptions";
import "../css/Admin.css";
import '../css/ButtonAnimation.css';
import { Modal } from "react-bootstrap";
import { FaUser, FaTrashAlt } from "react-icons/fa";
import { db } from '../config/firebase'; 
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

function UserFeedback() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const feedbackCollection = collection(db, 'feedback');
            const feedbackData = await getDocs(feedbackCollection);
            const feedbacks = feedbackData.docs.map(doc => ({
                id: doc.id,
                uid: doc.data().uid,
                email: doc.data().email,
                description: doc.data().description,
                date: doc.data().timestamp.toDate().toLocaleDateString()
            }));
            setFeedbacks(feedbacks);
        };
        fetchData();
    }, []);

    useEffect(() => {
        setFilteredFeedbacks(feedbacks.filter(feedback => 
            feedback.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            feedback.description.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    }, [feedbacks, searchTerm]);

    const handleFeedbackClick = (feedback) => {
        setSelectedFeedback(feedback);
    };

    const handleClose = () => {
        setSelectedFeedback(null);
    };

    const handleDeleteFeedback = async (id) => {
        await deleteDoc(doc(db, 'feedback', id));
        setFeedbacks(currentFeedbacks => currentFeedbacks.filter(feedback => feedback.id !== id));
        setSelectedFeedback(null);
    };

    return (
        <div className="admin-dashboard">
            <SidebarOptions />
            <div className="admin-dashboard-content">
                <div className="search-feedback">
                    <input
                        type="text"
                        placeholder="Search feedback..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={() => setSearchTerm('')}>Clear</button>
                </div>

                <div className="admin-dashboard-recent-users mb-4 shadow">
                    <h2>Recent Feedbacks</h2>
                    <div className="divider"></div>
                    <div className="user-feedback-list">
                        {filteredFeedbacks.map((feedback) => (
                            <div
                                key={feedback.id}
                                className={`user-feedback-item ${selectedFeedback === feedback ? "active" : ""}`}
                                onClick={() => handleFeedbackClick(feedback)}
                            >
                                <div className="user-icon">
                                    <FaUser size={30} />
                                </div>
                                <div className="feedback-content">
                                    <strong>{feedback.email}</strong>
                                    <p>{feedback.description ? (feedback.description.slice(0, 50)) : "No description provided"}</p>
                                </div>
                                <div className="feedback-date">
                                    <i>{feedback.date}</i>
                                </div>
                                <div className="delete-icon" onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteFeedback(feedback.id);
                                    }}>
                                    <FaTrashAlt size={20} color="#ff0000"/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Modal show={selectedFeedback !== null} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>User Feedback</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedFeedback && (
                            <>
                                <p>
                                    <strong>{selectedFeedback.email}</strong> -{" "}
                                    <i>{selectedFeedback.date}</i>
                                </p>
                                <p>{selectedFeedback.description}</p>
                                <button 
                                    onClick={() => handleDeleteFeedback(selectedFeedback.id)}
                                    className="btn btn-danger"
                                >
                                    <FaTrashAlt /> Delete Feedback
                                </button>
                            </>
                        )}
                    </Modal.Body>
                </Modal>

            </div>
        </div>
    );
}

export default UserFeedback;
