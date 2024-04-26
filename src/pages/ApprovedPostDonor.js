import React, { useState, useEffect } from "react";
import { FaThumbsUp, FaThumbsDown, FaHourglassHalf } from "react-icons/fa";
import SidebarOptions from "./SidebarOptions";
import { db } from '../config/firebase';
import { collection, getDocs, query, where } from "firebase/firestore";
import "../css/Admin.css";
import Modal from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import UserApprovedDonor from "./UserApprovedDonor";

Modal.setAppElement('#root');

function ApprovedPostDonor() {
  const [approvedDonations, setApprovedDonations] = useState(0);
  const [pendingDonations, setPendingDonations] = useState(0);
  const [declinedDonations, setDeclinedDonations] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    const fetchDonationCounts = async () => {
      const donationCollection = collection(db, 'donation');

      const approvedQuery = query(donationCollection, where('publicationStatus', '==', 'approved'));
      const approvedSnapshot = await getDocs(approvedQuery);
      setApprovedDonations(approvedSnapshot.size);

      const pendingQuery = query(donationCollection, where('publicationStatus', '==', 'pending'));
      const pendingSnapshot = await getDocs(pendingQuery);
      setPendingDonations(pendingSnapshot.size);

      const declinedQuery = query(donationCollection, where('publicationStatus', '==', 'declined'));
      const declinedSnapshot = await getDocs(declinedQuery);
      setDeclinedDonations(declinedSnapshot.size);
    };

    fetchDonationCounts();
  }, []);

  const fetchAndShowModal = async (status) => {
    const donationCollection = collection(db, 'donations');
    const statusQuery = query(donationCollection, where('publicationStatus', '==', status));
    const snapshot = await getDocs(statusQuery);
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setModalContent(items);
    setModalTitle(`${status.charAt(0).toUpperCase() + status.slice(1)} Donations`);
    setModalIsOpen(true);
  };

  return (
    <div className="admin-dashboard">
      <SidebarOptions />
      <div className="admin-dashboard-content">
        <div className="admin-nav-cards">
          <div className="counter-card" onClick={() => fetchAndShowModal('approved')}>
            <h2><span>{approvedDonations}</span></h2>
            <FaThumbsUp className="icon" />
            <p>Approved Donations</p>
          </div>
          <div className="counter-card" onClick={() => fetchAndShowModal('pending')}>
            <h2><span>{pendingDonations}</span></h2>
            <FaHourglassHalf className="icon" />
            <p>Pending Donations</p>
          </div>
          <div className="counter-card" onClick={() => fetchAndShowModal('declined')}>
            <h2><span>{declinedDonations}</span></h2>
            <FaThumbsDown className="icon" />
            <p>Declined Donations</p>
          </div>
        </div>
        <UserApprovedDonor />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Donation Details Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <button onClick={() => setModalIsOpen(false)} className="modal-close-btn"><FontAwesomeIcon icon={faTimes} /></button>
        </div>
        <h2>{modalTitle}</h2>
        {modalContent.map((item) => (
          <div key={item.id} className="modal-item-details">
            <h3>{item.name}</h3>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Description:</strong> {item.description || 'N/A'}</p>
            <p><strong>Publication Status:</strong> {item.publicationStatus}</p>
          </div>
        ))}
      </Modal>
    </div>
  );
}

export default ApprovedPostDonor;
