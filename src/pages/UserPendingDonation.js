import React, { useState, useEffect } from 'react';
import "../css/Products.css";
import { db } from '../config/firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FaListAlt } from 'react-icons/fa';

Modal.setAppElement('#root');

function UserPendingDonation() {
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  const fetchPendingProducts = async () => {
    setLoading(true);
    try {
      const productsRef = collection(db, "donation");
      const q = query(productsRef, where("publicationStatus", "==", "pending"));
      const querySnapshot = await getDocs(q);
      const productList = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() ? doc.data().createdAt.toDate() : new Date(),
        }))
        .sort((a, b) => b.createdAt - a.createdAt);
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching pending products: ", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (product) => {
    // if (currentItem) {
    //   setCurrentItem(product);
    //   setModalIsOpen(true);
    // }
    // if (!document.activeElement.classList.contains("product-actions")) {
    //   setCurrentItem(product);
    //   setModalIsOpen(true);
    // }
    setCurrentItem(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleApprove = async (donationId) => {
    const confirmApprove = window.confirm("Are you sure you want to approve this product?");
    if (confirmApprove) {
      setLoading(true);
      try {
        await updateDoc(doc(db, "donation", donationId), { publicationStatus: "approved" });
        await fetchPendingProducts();
        closeModal(); 
      } catch (error) {
        console.error("Error updating document: ", error);
      } finally {
        setLoading(false);
      }
    }
  };
  
  const handleDecline = async (donationId) => {
    const confirmDecline = window.confirm("Are you sure you want to decline this product?");
    if (confirmDecline) {
      setLoading(true);
      try {
        await updateDoc(doc(db, "donation", donationId), { publicationStatus: "declined" });
        await fetchPendingProducts();
        closeModal(); 
      } catch (error) {
        console.error("Error updating document: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredProducts = products.filter(product => {
    return (
      product.donor_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const renderProductApproved = () => (
    <div className="product-list-container">
      <div className="search-bar-wrapper">
        <input
          type="text"
          placeholder="Search by donor email, name, or category..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>
      <h1 className="recent-products-title"><FaListAlt style={{ marginRight: '8px', verticalAlign: 'middle' }} /> All Pending Products</h1>
      
      {loading ? (
        <p>Loading...</p>
      ) : filteredProducts.length > 0 ? (
        <ul  className="product-list">
          {filteredProducts.map(product => (
            <li onClick={() => openModal(product)} key={product.id} className="product-list-item">
              <img src={product.photo} alt={`${product.name} thumbnail`} className="product-list-photo" />
              <div className="product-info">
                <div className="product-name">{product.name}</div>
                <div className="product-detail">
                  <span  className="product-price">{product.weight}KG</span>
                  <span className="product-category">{product.category} Bundle</span>
                  <span className="product-qty">
                    {product.purpose.length > 10 ? `${product.purpose.substring(0, 10)}...` : product.purpose}
                  </span>
                  <span  className="product-seller">From: {product.donor_email}</span>
                  <div className="product-actions">
                    <button onClick={() => handleApprove(product.id)} className="approve-button">Approve</button>
                    <button onClick={() => handleDecline(product.id)} className="decline-button">Decline</button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pending products found.</p>
      )}
    </div>
  );

  return (
    <div className="approved-products-container">
      {renderProductApproved()}
      <Modal
         isOpen={modalIsOpen && currentItem !== null}
        onRequestClose={closeModal}
        contentLabel="Item Details"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="modal-content">
          <button onClick={closeModal} className="modal-close-btn">
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <h2>{currentItem?.name}</h2>
          <div className="modal-photos">
            {currentItem?.photo && (
              <div className="main-photo">
                <img src={currentItem.photo} alt={`${currentItem.name}`} className="modal-photo" />
              </div>
            )}
            {currentItem?.subPhotos && currentItem?.subPhotos.length >   0 && (
              <div className="sub-photos">
                {currentItem.subPhotos.map((subPhoto, index) => (
                  <img key={index} src={subPhoto} alt={`Sub Photo}`} className="modal-sub-photo" />
                ))}
              </div>
            )}
          </div>
          <div className="modal-details">
            <p><strong>Weight:</strong> {currentItem?.weight}KG</p>
            <p><strong>Date Published:</strong> {currentItem?.createdAt.toLocaleDateString()}</p>
            <p><strong>Purpose:</strong> {currentItem?.purpose}</p>
            <p><strong>Message:</strong> {currentItem?.message}</p>
            <p><strong>Donor Email:</strong> {currentItem?.donor_email}</p>
            <p><strong>Category:</strong> {currentItem?.category} Bundle</p>
            {currentItem?.itemNames && currentItem.itemNames.length > 0 && (
              <div>
                <p><strong>Items:</strong></p>
                <ul>
                  {currentItem.itemNames.map((itemName, index) => (
                    <li key={index}>{itemName}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="modal-actions">
            <button onClick={() => handleApprove(currentItem.id)} className="approve-button">Approve</button>
            <button onClick={() => handleDecline(currentItem.id)} className="decline-button">Decline</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UserPendingDonation;
