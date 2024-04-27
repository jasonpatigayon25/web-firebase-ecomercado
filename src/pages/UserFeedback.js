import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import SidebarOptions from "./SidebarOptions";
import "../css/Admin.css";
import { db } from '../config/firebase';
import { collection, getDocs, query, orderBy, limit, where, doc, getDoc } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function UserFeedback() {

  const [feedbacks, setFeedbacks] = useState([]);
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const [currentRating, setCurrentRating] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [productRatings, setProductRatings] = useState([]);

  const [currentRatingPage, setCurrentRatingPage] = useState(1);
  const [ratingSearchQuery, setRatingSearchQuery] = useState("");

  const filteredFeedbacks = feedbacks.filter(feedback =>
    feedback.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feedback.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProductRatings = productRatings.filter(rating =>
    rating.email.toLowerCase().includes(ratingSearchQuery.toLowerCase()) ||
    rating.fullName.toLowerCase().includes(ratingSearchQuery.toLowerCase()) ||
    rating.rating.toString() === ratingSearchQuery.trim()
  );
  

  function StarRating({ rating }) {
    const stars = Array.from({ length: rating }, (_, index) => (
      <img key={index} src={`${process.env.PUBLIC_URL}/icons/star.png`} alt={`${index + 1} star`} />
    ));
  
    return <div className="star-rating">{stars}</div>;
  }

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
            photo: userData.photo,
          };
        }
        return null; 
      }));
      setFeedbacks(feedbacksWithUser.filter(f => f !== null)); 
    }

    async function fetchProductRatings() {
        const ratingsQuery = query(collection(db, 'productRatings'), orderBy('ratedAt', 'desc'), limit(20));
        const ratingsSnapshot = await getDocs(ratingsQuery);
        const ratingsWithUser = await Promise.all(ratingsSnapshot.docs.map(async (doc) => {
          const ratingData = doc.data();
          const userQuery = query(collection(db, 'users'), where('email', '==', ratingData.ratedBy));
          const userDocSnapshot = await getDocs(userQuery);
          if (!userDocSnapshot.empty) {
            const userData = userDocSnapshot.docs[0].data();
            return {
              fullName: `${userData.firstName} ${userData.lastName}`,
              email: ratingData.ratedBy,
              comment: ratingData.comment,
              rating: ratingData.rating,
              ratedAt: ratingData.ratedAt.toDate().toLocaleString(),
              prodId: ratingData.prodId,
            };
          }
          return null; 
        }));
        setProductRatings(ratingsWithUser.filter(f => f !== null));
      }
      fetchProductRatings().catch(console.error);
    fetchFeedbacks().catch(console.error);
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRatingPageChange = (newPage) => { 
    setCurrentRatingPage(newPage);
  };

  const handleRatingSearchChange = (e) => {
    setRatingSearchQuery(e.target.value);
  };

  const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage);
  const totalRatingPages = Math.ceil(filteredProductRatings.length / itemsPerPage); 
  const currentPageFeedbacks = filteredFeedbacks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const currentPageRatings = filteredProductRatings.slice( 
    (currentRatingPage - 1) * itemsPerPage,
    currentRatingPage * itemsPerPage
  );

  const handleOpenModal = (feedback) => {
    setCurrentFeedback(feedback);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const renderModalContent = () => (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Feedback Details"
      ariaHideApp={false}
      className="Modal"
      overlayClassName="Overlay"
    >
      {currentFeedback && (
        <div className="modal-content">
        <button onClick={handleCloseModal} className="modal-close-btn">
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="modal-item-details">
          <p><strong>Name:</strong> {currentFeedback.fullName}</p>
          <p><strong>Email:</strong> {currentFeedback.email}</p>
          <p><strong>Description:</strong> {currentFeedback.description}</p>
          <p><strong>Feedback At:</strong> {currentFeedback.timestamp}</p>
        </div>
        </div>
      )}
    </Modal>
  );

  const [currentProduct, setCurrentProduct] = useState(null);

  const handleOpenModalRating = async (rating) => {
    setCurrentRating(rating);
    if (rating.prodId) {
      const productRef = doc(db, 'products', rating.prodId);
      const productSnap = await getDoc(productRef);
      if (productSnap.exists()) {
        setCurrentProduct({ id: productSnap.id, ...productSnap.data() });
      } else {
        console.log("No such product!");
        setCurrentProduct(null);
      }
    }
    setModalIsOpen(true);
  };

  const renderRatingModalContent = () => (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Product Rating Details"
      ariaHideApp={false}
      className="Modal"
      overlayClassName="Overlay"
    >
      {currentRating && (
        <div className="modal-content">
          <button onClick={handleCloseModal} className="modal-close-btn">
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <h2>Rating Detail</h2>
          <div className="modal-item-details">
            <p><strong>Full Name:</strong> {currentRating.fullName}</p>
            <p><strong>Email:</strong> {currentRating.email}</p>
            <p><strong>Rating:</strong> {currentRating.rating} Stars</p>
            <p><strong>Comment:</strong> {currentRating.comment}</p>
            <p><strong>Rated At:</strong> {currentRating.ratedAt}</p>
            <p><strong>Product ID:</strong> {currentRating.prodId}</p>
            {currentProduct && (
              <div>
                <h3>Rated Product</h3>
                <div className="order-cards-container">
                <div className="order-card">
                  <div className="order-card-content">
                <img src={currentProduct.photo} alt={currentProduct.name} className="order-image" />
                <div className="order-detail">
                <h3 title={currentProduct.name}>{currentProduct.name.length > 20 ? `${currentProduct.name.substring(0, 20)}...` : currentProduct.name}</h3>
                <p className="product-category-modal">{currentProduct.category}</p>
                </div>
              </div>
              </div>
              </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Modal>
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
                <div key={index} className="user-list-item" onClick={() => handleOpenModal(feedback)}>
                <div className="user-info">
                    <div className="user-detail">
                    <div>
                        <p className="user-full-name"><strong>{feedback.fullName}</strong></p>
                        <p className="user-email">{feedback.email}</p>
                        <p className="user-rating-comment">{feedback.description}</p>
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
        <div className="search-bar-wrapper">
          <input
            type="text"
            placeholder="Search ratings by email, name, or stars..."
            value={ratingSearchQuery}
            onChange={handleRatingSearchChange}
            className="search-bar"
          />
        </div>
        <h1>Product Ratings</h1>
        
        <div className="user-list-container">
          {currentPageRatings.map((rating, index) => ( 
            <div key={index} className="user-list-item" onClick={() => handleOpenModalRating(rating)}>
              <div className="user-info">
                <div className="user-detail">
                  <div>
                    <p className="user-full-name"><strong>{rating.fullName}</strong></p>
                    <p className="user-email">{rating.email}</p>
                    <p className="user-rating-comment">"{rating.comment}"</p>
                  </div>
                  <div className="user-rating">
                    <StarRating rating={rating.rating} />
                </div>
                <p className="user-rater">Product ID: {rating.prodId}</p>
                </div>
                <p className="user-rated-at">Rated At: {rating.ratedAt}</p>
              </div>
            </div>
          ))}
          <div className="pagination-controls">
            {Array.from({ length: totalRatingPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handleRatingPageChange(i + 1)}
                disabled={currentRatingPage === i + 1}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
        {renderModalContent()}
        {renderRatingModalContent()}
      </div>
    </div>
  );
}

export default UserFeedback;