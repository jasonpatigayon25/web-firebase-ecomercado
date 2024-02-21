import React, { useState, useEffect } from 'react';
import "../css/ActivityNavbar.css";
import { db } from '../config/firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

function UserPendingDonation() {
  const [donations, setDonations] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const fetchDonations = async () => {
    const donationsRef = collection(db, "donation");
    const q = query(donationsRef, where("publicationStatus", "==", "pending"));
    const querySnapshot = await getDocs(q);
    const donationList = querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() ? doc.data().createdAt.toDate() : new Date(),
      }))
      .sort((a, b) => b.createdAt - a.createdAt);
      setDonations(donationList);
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const openModal = (donation) => {
    setCurrentItem(donation);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleApproveDonation = async (donationId) => {
    const donationRef = doc(db, 'donation', donationId);
    try {
      await updateDoc(donationRef, {
        publicationStatus: 'approved'
      });
      console.log('Donation approved successfully');
      fetchDonations();
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleDeclineDonation = async (donationId) => {
    const donationRef = doc(db, 'donation', donationId);
    try {
      await updateDoc(donationRef, {
        publicationStatus: 'declined'
      });
      console.log('Donation declined successfully');
      fetchDonations(); 
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const renderActionButtonsDonations = (donationId) => (
    <td className="action-buttons-donation">
      <button className="button-approve" onClick={(e) => { e.stopPropagation(); handleApproveDonation(donationId); }}>
        <FontAwesomeIcon icon={faCheck} />
      </button>
      <button className="button-decline" onClick={(e) => { e.stopPropagation(); handleDeclineDonation(donationId); }}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </td>
  );

  const renderDonationsApproved = () => (
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Location</th>
          <th>Message</th>
          <th>Donor</th>
          <th>Date Offered</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {donations.length > 0 ? (
          donations.map(donation => (
            <tr key={donation.id} onClick={() => openModal(donation)}>
              <td><img src={donation.photo} alt={donation.name} className="rounded-image" style={{width: "50px", height: "50px"}} /></td>
              <td>{donation.name}</td>
              <td>{donation.location}</td>
              <td>{donation.message}</td>
              <td>{donation.donor_email}</td>
              <td>{donation.createdAt.toLocaleDateString()}</td>
              {renderActionButtonsDonations(donation.id)}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7">No approved products found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );

  return (
    <div className="approved-products-container">
      <h2>Pending for Approval - Donations</h2>
      {renderDonationsApproved()}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Item Details"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="modal-content">
          <button onClick={closeModal} className="modal-close-btn">
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <img src={currentItem?.photo} alt={currentItem?.name} className="modal-image" />
          <h2>{currentItem?.name}</h2>
          <div className="modal-details">
            <p><strong>Category:</strong> {currentItem?.location}</p>
            <p><strong>Quantity:</strong> {currentItem?.message}</p>
            <p><strong>Date Published:</strong> {currentItem?.createdAt.toLocaleDateString()}</p>
            <p><strong>Donor Email:</strong> {currentItem?.donor_email}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UserPendingDonation;