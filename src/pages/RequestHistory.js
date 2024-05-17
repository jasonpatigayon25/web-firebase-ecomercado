import React, { useState, useEffect } from 'react';
import "../css/Products.css";
import { db } from '../config/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faClock, faTruck } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

function RequestHistory() {
  const [requests, setRequests] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [activeTab, setActiveTab] = useState('Pending');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDonationDetails = async (donationId) => {
      try {
        const docRef = doc(db, "donation", donationId);
        const docSnapshot = await getDoc(docRef);
  
        if (!docSnapshot.exists()) {
          console.error('No donation with the given ID:', donationId);
          return null;
        }
  
        return { id: docSnapshot.id, ...docSnapshot.data() };
      } catch (error) {
        console.error("Error fetching donation details:", error);
        return null;
      }
    };

    const fetchUserDetails = async (email) => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
    
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          return userData;
        } else {
          console.error('No user with the given email:', email);
          return {};
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        return {};
      }
    };
  
    const fetchRequestsByStatus = async () => {
      setIsLoading(true);
      try {
        const requestsRef = collection(db, "requests");
        const q = query(requestsRef, where("status", "==", activeTab));
        const querySnapshot = await getDocs(q);
        const requestsWithDetails = [];
  
        for (let docSnapshot of querySnapshot.docs) {

          const requestData = docSnapshot.data();

          const totalFee = (requestData.deliveryFee || 0) + (requestData.disposalFee || 0);
          const requesterDetails = await fetchUserDetails(requestData.requesterEmail);
          const donorDetails = await fetchUserDetails(requestData.donorEmail);

          const donationDetailsPromises = requestData.donorDetails.map(
            (donation) => fetchDonationDetails(donation.donationId)
          );
  
          const donationDetails = (await Promise.all(donationDetailsPromises)).filter(Boolean);
  
          if (!donationDetails.length) {
            console.error('Donation details not found for request:', docSnapshot.id);
            continue;
          }
  
          requestsWithDetails.push({
            id: docSnapshot.id,
            ...requestData,
            donationDetails,
            totalFee,
            requesterContactNumber: requesterDetails.contactNumber,
            donorContactNumber: donorDetails.contactNumber,
            requesterFirstName: requesterDetails.firstName,
            donorFirstName: donorDetails.firstName,
            requesterLastName: requesterDetails.lastName,
            donorLastName: donorDetails.lastName,
            donorAddress: donorDetails.address,
            dateRequested: requestData.dateRequested?.toDate() || new Date(),
            deliveredStatus: requestData.deliveredStatus,
          });
        }
  
        setRequests(requestsWithDetails.sort((a, b) => b.dateRequested - a.dateRequested));
        setIsLoading(false);
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
        <div className={`tab ${activeTab === 'Receiving' ? 'active-tab' : ''}`} onClick={() => handleTabClick('Receiving')}>Delivery Process Requests
        {filteredRequests.some(request => request.deliveredStatus === 'Processing' || request.deliveredStatus === 'Waiting') && (
            <FontAwesomeIcon icon={faClock} className="icon-indicator" />
          )}</div>
        <div className={`tab ${activeTab === 'Completed' ? 'active-tab' : ''}`} onClick={() => handleTabClick('Completed')}>Completed Requests</div>
        <div className={`tab ${activeTab === 'Declined' ? 'active-tab' : ''}`} onClick={() => handleTabClick('Declined')}>Declined Requests</div>
      </div>
      {isLoading ? (
        <div className="no-pending"><p>Loading...</p></div>
      ) : filteredRequests.length > 0 ? (
        <ul className="product-list">
          {filteredRequests.map(request => (
            <li key={request.id} className="product-list-item" onClick={() => openModal(request)}>
              <div className="product-info">
              <div className="order-header">
                <div className="order-id">{`#${request.id}`.toUpperCase()}</div>
                <div className="product-published-date">Date Requested: {request.dateRequested.toLocaleDateString()}</div>
                {activeTab === 'Receiving' && (
                  <div className="delivery-status-icon">
                    {request.deliveredStatus === 'Processing' && <FontAwesomeIcon icon={faClock} className="order-status-icon processing" />}
                    {request.deliveredStatus === 'Waiting' && <FontAwesomeIcon icon={faTruck} className="order-status-icon waiting" />}
                  </div>
                )}
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
        <div className="product-info">
        <p className="no-pending">No Requests Yet.</p>
        </div>
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
          <p><strong>REQUESTER</strong></p>
            <p><strong>Name:</strong> {currentRequest?.requesterFirstName} {currentRequest?.requesterLastName}</p>
            <p><strong>Requester Email:</strong> {currentRequest?.requesterEmail}</p>
            <p><strong>Contact Number:</strong> 0{currentRequest?.requesterContactNumber}</p>
            <p><strong>Delivery Address:</strong> {currentRequest?.address}</p>
            <br/>
            <p><strong>DONOR</strong></p>
            <p><strong>Name:</strong> {currentRequest?.donorFirstName} {currentRequest?.donorLastName}</p>
            <p><strong>Donor Email:</strong> {currentRequest?.donorEmail}</p>
            <p><strong>Contact Number:</strong> 0{currentRequest?.donorContactNumber}</p>
            <p><strong>Donor Address:</strong> {currentRequest?.donorAddress}</p>
            <br/>
            <p><strong>Delivery Fee:</strong> ₱{currentRequest?.deliveryFee}</p>
            <p><strong>Disposal Fee:</strong> ₱{currentRequest?.disposalFee}</p>
            <p><strong>Total Fee:</strong> ₱{currentRequest?.totalFee}</p>
            <p><strong>Date Requested:</strong> {currentRequest?.dateRequested?.toLocaleDateString()}</p>
            <br/>
            <p><strong>STATUS: </strong>{currentRequest?.deliveredStatus === 'Processing' ? 'Pending for Courier' : currentRequest?.deliveredStatus === 'Waiting' ? 'Courier Delivering' : currentRequest?.deliveredStatus}</p>
            <div className="order-cards-container">
              {currentRequest?.donationDetails.map((donation, index) => (
                <div className="order-card" key={index}>
                  <div className="order-card-content">
                    <img src={donation.photo} alt={donation.name} className="order-image" />
                    <div className="order-detail">
                      <h3 title={donation.name}>{donation.name.length > 20 ? `${donation.name.substring(0, 20)}...` : donation.name}</h3>
                      <p className="product-category-modal">{donation.category}</p>
                      <p className="price">Weight: {donation.weight} kg</p>
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


export default RequestHistory;