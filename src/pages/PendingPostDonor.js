import React, { useState, useEffect } from "react";
import { FaThumbsUp, FaThumbsDown, FaHourglassHalf } from "react-icons/fa";
import SidebarOptions from "./SidebarOptions";
import { db } from '../config/firebase';
import { collection, getDocs, query, where } from "firebase/firestore";
import "../css/Admin.css";
import Modal from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import UserPendingDonation from "./UserPendingDonation";

Modal.setAppElement('#root');

function PendingPostDonor() {
  const [approvedProducts, setApprovedProducts] = useState(0);
  const [pendingProducts, setPendingProducts] = useState(0);
  const [declinedProducts, setDeclinedProducts] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    const fetchProductCounts = async () => {
      const productCollection = collection(db, 'donation');

      const approvedQuery = query(productCollection, where('publicationStatus', '==', 'approved'));
      const approvedSnapshot = await getDocs(approvedQuery);
      setApprovedProducts(approvedSnapshot.size);

      const pendingQuery = query(productCollection, where('publicationStatus', '==', 'pending'));
      const pendingSnapshot = await getDocs(pendingQuery);
      setPendingProducts(pendingSnapshot.size);

      const declinedQuery = query(productCollection, where('publicationStatus', '==', 'declined'));
      const declinedSnapshot = await getDocs(declinedQuery);
      setDeclinedProducts(declinedSnapshot.size);
    };

    fetchProductCounts();
  }, []);

  const fetchAndShowModal = async (status) => {
    const productCollection = collection(db, 'donation');
    const statusQuery = query(productCollection, where('publicationStatus', '==', status));
    const snapshot = await getDocs(statusQuery);
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setModalContent(items);
    setModalTitle(`${status.charAt(0).toUpperCase() + status.slice(1)} Products`);
    setModalIsOpen(true);
  };

  return (
    <div className="admin-dashboard">
      <SidebarOptions />
      <div className="admin-dashboard-content">
        <div className="admin-nav-cards">
          <div className="counter-card" onClick={() => fetchAndShowModal('approved')}>
            <h2><span>{approvedProducts}</span></h2>
            <FaThumbsUp className="icon" />
            <p>Approved Donations</p>
          </div>
          <div className="counter-card" onClick={() => fetchAndShowModal('pending')}>
            <h2><span>{pendingProducts}</span></h2>
           <FaHourglassHalf className="icon" />
            <p>Pending Donations</p>
          </div>
          <div className="counter-card" onClick={() => fetchAndShowModal('declined')}>
            <h2><span>{declinedProducts}</span></h2>
            <FaThumbsDown className="icon" />
            <p>Declined Donations</p>
          </div>
        </div>
        <div>
          <UserPendingDonation />
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Product Details Modal"
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

export default PendingPostDonor;
