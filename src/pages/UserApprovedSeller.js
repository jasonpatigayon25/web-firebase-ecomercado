import React, { useState, useEffect } from 'react';
import "../css/Products.css";
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FaClipboardCheck } from 'react-icons/fa';

Modal.setAppElement('#root');

function UserApprovedSeller() {
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    const fetchApprovedProducts = async () => {
      const productsRef = collection(db, "products");
      const q = query(productsRef, where("publicationStatus", "==", "approved"));
      const querySnapshot = await getDocs(q);
      const productList = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() ? doc.data().createdAt.toDate() : new Date(),
        }))
        .sort((a, b) => b.createdAt - a.createdAt);
      setProducts(productList);
    };

    fetchApprovedProducts();
  }, []);

  const openModal = (product) => {
    setCurrentItem(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter(product => {
    return (
      product.seller_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const renderProductApproved = () => (
    <div className="product-list-container">
      <h1 className="recent-products-title"><FaClipboardCheck style={{ marginRight: '8px', verticalAlign: 'middle' }} /> All Approved Products</h1>
      <div className="search-bar-wrapper">
        <input
          type="text"
          placeholder="Search by seller email, name, or category..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>
      {filteredProducts.length > 0 ? (
        <ul className="product-list">
          {filteredProducts.map(product => (
            <li key={product.id} className="product-list-item" onClick={() => openModal(product)}>
              <img src={product.photo} alt={product.name} className="product-list-photo" />
              <div className="product-info">
                <div className="product-name">{product.name}</div>
                <div className="product-detail">
                  <span  className="product-price">₱{product.price}</span>
                  <span className="product-category">{product.category}</span>
                  <span  className="product-qty">Qty: {product.quantity}</span>
                  <span  className="product-seller">From: {product.seller_email}</span>
                  <span className="product-published-date">Published At: {product.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No approved products found.</p>
      )}
    </div>
  );
  return (
    <div className="approved-products-container">
      {renderProductApproved()}
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
            <p><strong>Date Published:</strong> {currentItem?.createdAt.toLocaleDateString()}</p>
            <p><strong>Price:</strong> ₱{currentItem?.price}</p>
            <p><strong>Description:</strong> {currentItem?.description}</p>
            <p><strong>Seller Email:</strong> {currentItem?.seller_email}</p>
            <p><strong>Logistic Packaging - WHL:</strong> {currentItem?.shipping.width} cm X {currentItem?.shipping.height} cm X {currentItem?.shipping.length} cm </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UserApprovedSeller;
