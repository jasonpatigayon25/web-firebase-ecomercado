import React, { useState, useEffect } from "react";
import SidebarOptions from "./SidebarOptions";
import "../css/Admin.css";
import { db } from '../config/firebase';
import { collection, getDocs, query, orderBy, limit, where } from "firebase/firestore";

function UserFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFeedbacks = feedbacks.filter(feedback => {
    return (
      feedback.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  useEffect(() => {
    async function fetchFeedbacks() {
      const feedbackQuery = query(collection(db, 'feedback'), orderBy('timestamp', 'desc'), limit(20));
      const feedbackSnapshot = await getDocs(feedbackQuery);
      const feedbacksWithUser = await Promise.all(feedbackSnapshot.docs.map(async (docSnapshot) => {
        const feedbackData = docSnapshot.data();
        const userDocSnapshot = await getDocs(query(collection(db, 'users'), where('email', '==', feedbackData.email)));
        if (!userDocSnapshot.empty) {
          const userData = userDocSnapshot.docs[0].data();
          return {
            email: feedbackData.email,
            fullName: `${userData.firstName} ${userData.lastName}`,
            description: feedbackData.description,
            timestamp: feedbackData.timestamp.toDate().toLocaleString(),
            photoUrl: userData.photoUrl,
          };
        }
        return null; 
      }));
      setFeedbacks(feedbacksWithUser.filter(f => f !== null)); // Filter out any nulls from missing user documents.
    }

    fetchFeedbacks().catch(console.error);
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage);
  const currentPageFeedbacks = filteredFeedbacks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="admin-dashboard">
      <SidebarOptions />
      <div className="admin-dashboard-content">
        <div className="search-bar-wrapper">
          <input
            type="text"
            placeholder="Search by email or description..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-bar"
          />
        </div>
        <h1>Recent Feedbacks</h1>
        <div className="user-list-container">
            {currentPageFeedbacks.map((feedback, index) => (
                <div key={index} className="user-list-item">
                <div className="user-info">
                    <div className="user-photo">
                    <img
                        src={feedback.photoUrl || `${process.env.PUBLIC_URL}/icons/user.png`} 
                        alt={`${feedback.fullName}'s profile`}
                        className="user-feedback-photo"
                        />
                    </div>
                    <div className="user-detail">
                    <div>
                        <p className="user-full-name"><strong>{feedback.fullName}</strong></p>
                        <p className="user-email">{feedback.email}</p>
                        <p className="user-description">{feedback.description}</p>
                    </div>
                    </div>
                    <p className="user-date-registered">Received At: {feedback.timestamp}</p>
                </div>
                </div>
            ))}
          <div className="pagination-controls">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                disabled={currentPage === i + 1}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserFeedback;