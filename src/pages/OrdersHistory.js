import React, { useState, useEffect } from "react";
import { FaThumbsUp, FaTruck, FaBoxOpen, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import SidebarOptions from "./SidebarOptions";
import { db } from '../config/firebase';
import { collection, getDocs, query, where } from "firebase/firestore";
import "../css/Admin.css";
import Modal from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement('#root');

function OrdersHistory() {
  const [toApprove, setToApprove] = useState(0);
  const [toDeliver, setToDeliver] = useState(0);
  const [deliveryProcess, setDeliveryProcess] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [cancelled, setCancelled] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    const fetchOrderCounts = async () => {
      const orderCollection = collection(db, 'orders');

      const toApproveQuery = query(orderCollection, where('status', '==', 'Pending'));
      const toApproveSnapshot = await getDocs(toApproveQuery);
      setToApprove(toApproveSnapshot.size);

      const toDeliverQuery = query(orderCollection, where('status', '==', 'Approved'));
      const toDeliverSnapshot = await getDocs(toDeliverQuery);
      setToDeliver(toDeliverSnapshot.size);

      const deliveryProcessQuery = query(orderCollection, where('status', '==', 'Receiving'));
      const deliveryProcessSnapshot = await getDocs(deliveryProcessQuery);
      setDeliveryProcess(deliveryProcessSnapshot.size);

      const completedQuery = query(orderCollection, where('status', '==', 'Completed'));
      const completedSnapshot = await getDocs(completedQuery);
      setCompleted(completedSnapshot.size);

      const cancelledQuery = query(orderCollection, where('status', '==', 'Cancelled'));
      const cancelledSnapshot = await getDocs(cancelledQuery);
      setCancelled(cancelledSnapshot.size);
    };

    fetchOrderCounts();
  }, []);

  const fetchAndShowModal = async (status) => {
    const orderCollection = collection(db, 'orders');
    const statusQuery = query(orderCollection, where('status', '==', status));
    const snapshot = await getDocs(statusQuery);
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setModalContent(items);
    setModalTitle(`${status.charAt(0).toUpperCase() + status.slice(1)} Orders`);
    setModalIsOpen(true);
  };

  return (
    <div className="admin-dashboard">
      <SidebarOptions />
      <div className="admin-dashboard-content">
        <div className="admin-nav-cards-order">
          <div className="counter-card-order" onClick={() => fetchAndShowModal('Pending')}>
            <h2><span>{toApprove}</span></h2>
            <FaThumbsUp className="icon" />
            <p>To Approve</p>
          </div>
          <div className="counter-card-order" onClick={() => fetchAndShowModal('Approved')}>
            <h2><span>{toDeliver}</span></h2>
            <FaTruck className="icon" />
            <p>To Deliver</p>
          </div>
          <div className="counter-card-order" onClick={() => fetchAndShowModal('Receiving')}>
            <h2><span>{deliveryProcess}</span></h2>
            <FaBoxOpen className="icon" />
            <p>Delivery Process</p>
          </div>
          <div className="counter-card-order" onClick={() => fetchAndShowModal('Completed')}>
            <h2><span>{completed}</span></h2>
            <FaCheckCircle className="icon" />
            <p>Completed</p>
          </div>
          <div className="counter-card-order" onClick={() => fetchAndShowModal('cancelled')}>
            <h2><span>{cancelled}</span></h2>
            <FaTimesCircle className="icon" />
            <p>Cancelled</p>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Order Details Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <button onClick={() => setModalIsOpen(false)} className="modal-close-btn"><FontAwesomeIcon icon={faTimes} /></button>
        </div>
        <h2>{modalTitle}</h2>
        {modalContent.map((item) => (
          <div key={item.id} className="modal-item-details">
            {/* WALA */}
          </div>
        ))}
      </Modal>
    </div>
  );
}

export default OrdersHistory;
