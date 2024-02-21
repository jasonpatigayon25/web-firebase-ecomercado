import React, { useState, useEffect } from 'react';
import "../css/ActivityNavbar.css";
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function UserPendingProduct() {
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    const fetchApprovedProducts = async () => {
      const productsRef = collection(db, "products");
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

  const renderProductApproved = () => (
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Seller</th>
          <th>Date Published</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 ? (
          products.map(product => (
            <tr key={product.id} onClick={() => openModal(product)}>
              <td><img src={product.photo} alt={product.name} className="rounded-image" style={{width: "50px", height: "50px"}} /></td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>₱{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.seller_email}</td>
              <td>{product.createdAt.toLocaleDateString()}</td>
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
      <h2>Approved Products</h2>
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
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UserPendingProduct;