import React, { useState, useEffect } from 'react';
import "../css/Products.css";
import { db } from '../config/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

function RequestHistory() {
  const [requests, setRequests] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [activeTab, setActiveTab] = useState('Pending');

  useEffect(() => {
    const fetchDonationDetails = async (donationId) => {
      try {
        const docRef = doc(db, "donation", donationId);
        const docSnapshot = await getDoc(docRef);
    
        if (!docSnapshot.exists()) {
          console.error('No donation with the given ID:', donationId);
          return {};
        }
    
        const donationData = { id: docSnapshot.id, ...docSnapshot.data() };
        return donationData;
      } catch (error) {
        console.error("Error fetching donation details:", error);
        return {};
      }
    };

    const fetchRequestsByStatus = async () => {
      try {
        const requestsRef = collection(db, "requests");
        const q = query(requestsRef, where("status", "==", activeTab));
        const querySnapshot = await getDocs(q);
        const requestsWithDetails = [];

        for (let doc of querySnapshot.docs) {
          const requestData = doc.data();
          const donationDetailsPromises = requestData.donationDetails.map(
            async (donation) => {
              const details = await fetchDonationDetails(donation.donationId);
              if (!details.category || !details.weight) {
                console.error('Missing category or weight for donation:', donation.donationId);
              }
              return { ...donation, ...details };
            }
          );
          const donationDetails = await Promise.all(donationDetailsPromises);

          requestsWithDetails.push({
            id: doc.id,
            ...requestData,
            donationDetails,
            dateRequested: requestData.dateRequested?.toDate() ? requestData.dateRequested.toDate() : new Date(),
          });
        }

        setRequests(requestsWithDetails.sort((a, b) => b.dateRequested - a.dateRequested));
      } catch (error) {
        console.error("Error fetching requests: ", error);
      }
    };
  
    fetchRequestsByStatus();
  }, [activeTab]);

  const openModal = (request) => {
    setCurrentRequest(request);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleTabClick = (status) => {
    setActiveTab(status);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredRequests = requests.filter(request => {
    return (
      request.requesterEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.donorEmail.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  

  const renderRequestDetails = () => (
    <div className="order-list-container">
      <div className="search-bar-wrapper">
        <input
          type="text"
          placeholder="Search by requester email or donor email..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>
      <div className="tabs">
        <div className={`tab ${activeTab === 'Pending' ? 'active-tab' : ''}`} onClick={() => handleTabClick('Pending')}>Pending Requests</div>
        <div className={`tab ${activeTab === 'Approved' ? 'active-tab' : ''}`} onClick={() => handleTabClick('Approved')}>Approved Requests</div>
        <div className={`tab ${activeTab === 'Receiving' ? 'active-tab' : ''}`} onClick={() => handleTabClick('Receiving')}>Delivery Process Requests</div>
        <div className={`tab ${activeTab === 'Completed' ? 'active-tab' : ''}`} onClick={() => handleTabClick('Completed')}>Completed Requests</div>
        <div className={`tab ${activeTab === 'Declined' ? 'active-tab' : ''}`} onClick={() => handleTabClick('Declined')}>Declined Requests</div>
      </div>
      {filteredRequests.length > 0 ? (
        <ul className="product-list">
          {filteredRequests.map(request => (
            <li key={request.id} className="product-list-item" onClick={() => openModal(request)}>
              <div className="product-info">
              <div className="order-header">
                <div className="order-id">{`#${request.id}`.toUpperCase()}</div>
                <div className="product-published-date">Date Requested: {request.dateRequested.toLocaleDateString()}</div>
              </div>
                <div className="order-cards-container">
                {request.donationDetails.map((donation, index) => (
                  <div className="order-card">
                  <div className="order-card-content">
                    <img src={donation.photo} alt={donation.name} className="order-image" />
                    <div className="order-detail">
                      <h3 title={donation.name}>{donation.name.length > 20 ? `${donation.name.substring(0, 20)}...` : donation.name}</h3>
                      <p className="category">{donation.category}</p>
                      <p className="weight">Weight: {donation.weight} kg</p>
                    </div>
                  </div>
                  {/* <div className="product-qty">x{donation.requestedQuantity}</div> */}
                </div>
                  ))}

                </div>
                <div className="order-footer">

                  <div className="payment-label">
                  Requester: <span className="payment-value">{request.requesterEmail}</span>
                </div>
                <div className="payment-label">
                Donor: <span className="payment-value">{request.donorEmail}</span>
                </div>
                  <div className="payment-label">
                  Total Fee: <span className="payment-value">₱{request.totalFee}</span>
                </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No requests found.</p>
      )}
    </div>
  );
  
  return (
    <div className="order-history-container">
      {renderRequestDetails()}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Request Details"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="modal-content">
          <button onClick={closeModal} className="modal-close-btn">
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <h2>#{currentRequest?.id.toUpperCase()}</h2>
          <div className="modal-details">
            <p><strong>Requester Email:</strong> {currentRequest?.requesterEmail}</p>
            <p><strong>Donor Email:</strong> {currentRequest?.donorEmail}</p>
            <p><strong>Delivery Fee:</strong> ₱{currentRequest?.shippingFee}</p>
            <p><strong>Total Fee:</strong> ₱{currentRequest?.totalFee}</p>
            <p><strong>Date Requested:</strong> {currentRequest?.dateRequested?.toLocaleDateString()}</p>
            <div className="order-cards-container">
              {currentRequest?.donationDetails.map((donation, index) => (
                <div className="order-card" key={index}>
                  <div className="order-card-content">
                    <img src={donation.photo} alt={donation.name} className="order-image" />
                    <div className="order-detail">
                      <h3 title={donation.name}>{donation.name.length > 20 ? `${donation.name.substring(0, 20)}...` : donation.name}</h3>
                      <p className="category">{donation.category}</p>
                      <p className="weight">Weight: {donation.weight} kg</p>
                    </div>
                  </div>
                  {/* <div className="product-qty-modal">x{donation.requestedQuantity}</div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}


export default RequestsHistory;