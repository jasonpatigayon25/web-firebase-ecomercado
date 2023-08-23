import React, { useState } from "react";
import SidebarOptions from "./SidebarOptions";
import "../css/Admin.css";
import '../css/ButtonAnimation.css';
import { Modal } from "react-bootstrap";
import { FaUser, FaEnvelope, FaTrashAlt } from "react-icons/fa";

function HelpForum() {
    const [questions, setQuestions] = useState([
        { username: 'OceanBreeze22', question: 'How do I reset my password?', date: '5/29/23' },
        { username: 'CosmicUser', question: 'Can I track my order online?', date: '5/30/23' },
        { username: 'User123', question: 'How to sell?', date: '5/31/23' },
        { username: 'Random123', question: 'How to donate?', date: '5/31/23' },
        { username: 'HelloWorld123', question: 'How to buy?', date: '5/31/23' },
        { username: 'PERsuader123', question: 'How to view details?', date: '5/31/23' },
        { username: 'ECOUser123', question: 'How to edit profile?', date: '5/31/23' },
        { username: 'HelloMars123', question: 'Hello, How to edit the product?', date: '5/31/23' },
        
    ]);

    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [userToMessage, setUserToMessage] = useState(null);
    const [messageContent, setMessageContent] = useState("");

    const handleQuestionClick = (question) => {
        setSelectedQuestion(question);
    };

    const handleClose = () => {
        setSelectedQuestion(null);
    };

    const handleMessageClick = (username) => {
        setUserToMessage(username);
        setShowMessageModal(true);
    };

    const handleSendMessage = () => {
        alert(`Message sent to ${userToMessage}: "${messageContent}"`);
        setMessageContent("");
        setShowMessageModal(false);
    };

    const handleDeleteQuestion = (username) => {
        setQuestions(questions.filter(question => question.username !== username));
        setSelectedQuestion(null);
    };

    return (
        <div className="admin-dashboard">
            <SidebarOptions />
            <div className="admin-dashboard-content">
                <div className="admin-dashboard-header">
                    <h2>HELP FORUM</h2>
                </div>
                <div className="admin-dashboard-recent-users mb-4 shadow">
                    <h2>Recent Questions</h2>
                    <div className="divider"></div>
                    <div className="user-feedback-list">
                        {questions.map((question, index) => (
                            <div
                                key={index}
                                className={`user-feedback-item ${selectedQuestion === question ? "active" : ""}`}
                                onClick={() => handleQuestionClick(question)}
                            >
                                <div className="user-icon">
                                    <FaUser size={30} />
                                </div>
                                <div className="feedback-content">
                                    <strong>{question.username}</strong>
                                    <p>{question.question.slice(0, 50) + "..."}</p>
                                </div>
                                <div className="feedback-date">
                                    <i>{question.date}</i>
                                </div>
                                <div className="message-icon" onClick={(e) => {
                                    e.stopPropagation();
                                    handleMessageClick(question.username);
                                }}>
                                    <FaEnvelope size={20} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Modal show={selectedQuestion !== null} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>User Question</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedQuestion && (
                            <>
                                <p>
                                    <strong>{selectedQuestion.username}</strong> -{" "}
                                    <i>{selectedQuestion.date}</i>
                                </p>
                                <p>{selectedQuestion.question}</p>
                                <button onClick={() => handleDeleteQuestion(selectedQuestion.username)}>
                                    <FaTrashAlt /> Delete Question
                                </button>
                            </>
                        )}
                    </Modal.Body>
                </Modal>

                <Modal show={showMessageModal} onHide={() => setShowMessageModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Send Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Send a message to <strong>{userToMessage}</strong></p>
                        <textarea
                            value={messageContent}
                            onChange={(e) => setMessageContent(e.target.value)}
                            placeholder="Write your message here..."
                            rows={4}
                            style={{ width: "100%" }}
                        />
                        <button className="animated-button" onClick={handleSendMessage}>
                            Send Message
                        </button>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}

export default HelpForum;
