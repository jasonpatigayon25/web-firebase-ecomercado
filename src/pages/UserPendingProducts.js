import React, { useState, useEffect } from 'react';
import "../css/ActivityNavbar.css";
import { db } from '../config/firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FaClipboardList } from 'react-icons/fa';

Modal.setAppElement('#root');

function UserPendingProduct() {
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
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

  useEffect(() => {
    fetchProducts();
  }, []);

  const openModal = (product) => {
    setCurrentItem(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleApprove = async (productId) => {
    const productRef = doc(db, 'products', productId);
    try {
      await updateDoc(productRef, {
        publicationStatus: 'approved'
      });
      console.log('Product approved successfully');
      fetchProducts();
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleDecline = async (productId) => {
    const productRef = doc(db, 'products', productId);
    try {
      await updateDoc(productRef, {
        publicationStatus: 'declined'
      });
      console.log('Product declined successfully');
      fetchProducts(); 
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery) ||
    product.category.toLowerCase().includes(searchQuery) ||
    product.seller_email.toLowerCase().includes(searchQuery)
  );

  const renderActionButtons = (productId) => (
    <td className="action-buttons">
      <button className="button-approve" onClick={(e) => { e.stopPropagation(); handleApprove(productId); }}>
        <FontAwesomeIcon icon={faCheck} />
      </button>
      <button className="button-decline" onClick={(e) => { e.stopPropagation(); handleDecline(productId); }}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </td>
  );


  const renderProductApproved = () => (
    <div className="search-bar-container">
      <div className="title-and-search-container">
        <h1 className="recent-users-title"><FaClipboardList style={{ marginRight: '8px', verticalAlign: 'middle' }} /> All Pending Products</h1>
        <div className="search-bar-wrapper">
          <input
            type="text"
            placeholder="Search by seller email, name, or category..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-bar"
          />
        </div>
      </div>
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
              <tr key={product.id} onClick={() => openModal(product)}>
                <td><img src={product.photo} alt={product.name} className="rounded-image" style={{width: "50px", height: "50px"}} /></td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>₱{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.seller_email}</td>
                <td>{product.createdAt.toLocaleDateString()}</td>
                {renderActionButtons(product.id)}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No approved products found.</td>
            </tr>
          )}
        </tbody>
      </table>
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
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UserPendingProduct;