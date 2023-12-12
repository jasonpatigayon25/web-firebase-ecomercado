import React, { useState, useEffect } from "react";
import SidebarOptions from "./SidebarOptions";
import "../css/Admin.css";
import '../css/ButtonAnimation.css';
import { Modal } from "react-bootstrap";
import { FaUser, FaArchive } from "react-icons/fa";
import { db } from '../config/firebase'; 
import { collection, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function UserFeedback() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 5;

    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user ? user.uid : null;

    useEffect(() => {
        const fetchData = async () => {
            const feedbackCollection = collection(db, 'feedback');
            const querySnapshot = await getDocs(feedbackCollection);
            const feedbacksData = querySnapshot.docs
                .map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    date: doc.data().timestamp.toDate().toLocaleDateString()
                }))
                .filter(feedback => !feedback.archivedBy || !feedback.archivedBy.includes(userId)); 
            setFeedbacks(feedbacksData);
        };
        fetchData();
    }, [userId]); 

    useEffect(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        setFilteredFeedbacks(feedbacks.slice(start, end));
        setTotalPages(Math.ceil(feedbacks.length / itemsPerPage));
    }, [feedbacks, currentPage]);

    const handleFeedbackClick = (feedback) => {
        setSelectedFeedback(feedback);
    };

    const handleClose = () => {
        setSelectedFeedback(null);
    };

    const handleArchiveFeedback = async (id) => {
        const feedbackRef = doc(db, 'feedback', id);
        await updateDoc(feedbackRef, {
            archivedBy: arrayUnion(userId) 
        });
        setFeedbacks(currentFeedbacks => currentFeedbacks.filter(feedback => feedback.id !== id));
        setSelectedFeedback(null);
    };

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage);
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
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Reset to first page with new search term
                        }}
                    />
                    <button onClick={() => setSearchTerm('')}>Clear</button>
                </div>

                <div className="admin-dashboard-recent-users">
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
                                <div className="archive-icon" onClick={(e) => {
                                        e.stopPropagation();
                                        handleArchiveFeedback(feedback.id);
                                    }}>
                                    <FaArchive size={20} color="#f0ad4e"/> 
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="pagination">
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                            Next
                        </button>
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
                                    onClick={() => handleArchiveFeedback(selectedFeedback.id)}
                                    className="btn btn-warning"
                                >
                                    Archive Feedback
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
