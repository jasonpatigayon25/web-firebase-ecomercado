import React, { useState, useEffect } from 'react';
import "../css/ActivityNavbar.css";
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

function ActivityNavbar({ email }) {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const [activeTab, setActiveTab] = useState('user-approved-posts');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      let q;
      switch (activeTab) {
        case 'user-approved-posts':
          q = query(
            collection(db, 'products'), 
            where('seller_email', '==', email),
            where('publicationStatus', '==', 'approved')
          );
          break;
        case 'user-pending-products':
          q = query(
            collection(db, 'products'), 
            where('seller_email', '==', email),
            where('publicationStatus', '==', 'pending')
          );
          break;
        case 'user-declined-posts':
          q = query(
            collection(db, 'products'), 
            where('seller_email', '==', email),
            where('publicationStatus', '==', 'declined')
          );
          break;
        default:
          setProducts([]);
          return;
      }
      
      const querySnapshot = await getDocs(q);
      setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
  
    fetchProducts();
  }, [email, activeTab]);

  const handleButtonClick = (tabName) => {
    setActiveTab(tabName);
    setProducts([]);
  };

  
  function openModal(item) {
    setCurrentItem(item);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }


  const renderProductApproved = () => (
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Date Published</th>
        </tr>
      </thead>
      <tbody>
        {products.length ? (
          products.map(product => (
            <tr key={product.id} onClick={() => openModal(product)}>
              <td><img src={product.photo} alt={product.name} className="rounded-image" /></td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.quantity}</td>
              <td>{product.createdAt.toDate().toLocaleDateString()}</td>

            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">No approved posts yet.</td>
          </tr>
        )}
      </tbody>
    </table>
  );

  const renderProductDeclined= () => (
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Date Published</th>
        </tr>
      </thead>
      <tbody>
        {products.length ? (
          products.map(product => (
            <tr key={product.id} onClick={() => openModal(product)}>
              <td><img src={product.photo} alt={product.name} className="rounded-image" /></td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.quantity}</td>
              <td>{product.createdAt.toDate().toLocaleDateString()}</td>

            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">No approved posts yet.</td>
          </tr>
        )}
      </tbody>
    </table>
  );

  const handleApprove = async (productId) => {
    // Logicapprove
  };

  const handleDecline = async (productId) => {
    // Logicdecline
  };


  const renderActionButtons = (productId) => (
    <td className="action-buttons">
      <button className="button-approve" onClick={() => handleApprove(productId)}>
        <FontAwesomeIcon icon={faCheck} />
      </button>
      <button className="button-decline" onClick={() => handleDecline(productId)}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </td>
  );

  const renderPendingProducts = () => (
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Date Published</th>
          <th>Actions</th> 
        </tr>
      </thead>
      <tbody>
        {products.length ? (
          products.map(product => (
            <tr key={product.id} onClick={() => openModal(product)}>
              <td><img src={product.photo} alt={product.name} className="rounded-image" /></td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.quantity}</td>
              <td>{product.createdAt.toDate().toLocaleDateString()}</td>
              {renderActionButtons(product.id)}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">No pending products yet.</td>
          </tr>
        )}
      </tbody>
    </table>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'user-approved-posts':
        return renderProductApproved();
      case 'user-pending-products':
        return renderPendingProducts();
      case 'user-pending-donations':
        return <p>No pending donations yet.</p>;
      case 'user-declined-posts':
        return renderProductDeclined();
      case 'user-donation-history':
        return <p>No donation history yet.</p>;
      default:
        return <p>Select a category to view its contents.</p>;
    }
  };

  return (
    <div>
      <div className="activity-navbar">
        <ul className="activity-navbar-nav">
          <li className={activeTab === 'user-approved-posts' ? 'active' : ''}>
              <button onClick={() => handleButtonClick('user-approved-posts')}>Approved Posts</button>
          </li>
          <li className={activeTab === 'user-pending-products' ? 'active' : ''}>
            <button onClick={() => handleButtonClick('user-pending-products')}>Pending Products</button>
          </li>
          <li className={activeTab === 'user-pending-donations' ? 'active' : ''}>
            <button onClick={() => handleButtonClick('user-pending-donations')}>Pending Donations</button>
          </li>
          <li className={activeTab === 'user-declined-posts' ? 'active' : ''}>
            <button onClick={() => handleButtonClick('user-declined-posts')}>Declined Posts</button>
          </li>
          <li className={activeTab === 'user-donation-history' ? 'active' : ''}>
            <button onClick={() => handleButtonClick('user-donation-history')}>Donation History</button>
          </li>
        </ul>
      </div>
      <div className="content-display">
        {renderContent()}
      </div>
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
            <p><strong>Category:</strong> {currentItem?.category}</p>
            <p><strong>Quantity:</strong> {currentItem?.quantity}</p>
            <p><strong>Date Published:</strong> {currentItem?.createdAt.toDate().toLocaleDateString()}</p>
            <p><strong>Price:</strong> {currentItem?.price}</p>
            <p><strong>Description:</strong> {currentItem?.description}</p>
            <p><strong>Seller Email:</strong> {currentItem?.seller_email}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ActivityNavbar;
