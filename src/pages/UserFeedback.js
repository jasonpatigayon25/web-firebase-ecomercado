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

  useEffect(() => {
    const fetchData = async () => {
      const feedbackCollection = collection(db, 'feedback');
      const feedbackData = await getDocs(feedbackCollection);
      const feedbacks = feedbackData.docs.map(doc => ({
        username: doc.data().email, 
        description: doc.data().description,
        date: doc.data().timestamp.toDate().toLocaleDateString()
      }));
      setFeedbacks(feedbacks);
    };
    fetchData();
  }, []);

  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const handleFeedbackClick = (feedback) => {
    setSelectedFeedback(feedback);
  };

  const handleClose = () => {
    setSelectedFeedback(null);
  };

  const handleDeleteFeedback = async (username) => {
    const feedbackToDelete = feedbacks.find(f => f.username === username);
    if (feedbackToDelete) {
      await deleteDoc(doc(db, 'feedback', feedbackToDelete.id));
      setFeedbacks(feedbacks.filter(feedback => feedback.username !== username));
    }
    setSelectedFeedback(null);
  };

  return (
    <div className="admin-dashboard">
      <SidebarOptions />
      <div className="admin-dashboard-content">
        <div className="admin-dashboard-header">
          <h2>USER FEEDBACKS</h2>
        </div>
        <div className="admin-dashboard-recent-users mb-4 shadow">
          <h2>Recent Feedbacks</h2>
          <div className="divider"></div>
          <div className="user-feedback-list">
            {feedbacks.map((feedback, index) => (
              <div
                key={index}
                className={`user-feedback-item ${selectedFeedback === feedback ? "active" : ""}`}
                onClick={() => handleFeedbackClick(feedback)}
              >
                <div className="user-icon">
                  <FaUser size={30} />
                </div>
                <div className="feedback-content">
                  <strong>{feedback.username}</strong>
                  <p>{feedback.description ? (feedback.description.slice(0, 50) + "...") : "No description provided"}</p>
                </div>
                <div className="feedback-date">
                  <i>{feedback.date}</i>
                </div>
                <div className="delete-icon" onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteFeedback(feedback.username);
                  }}>
                  <FaTrashAlt size={20} /> 
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
                  <strong>{selectedFeedback.username}</strong> -{" "}
                  <i>{selectedFeedback.date}</i>
                </p>
                <p>{selectedFeedback.description}</p>
                <button onClick={() => handleDeleteFeedback(selectedFeedback.username)}>
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
