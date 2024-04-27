import React, { useState, useEffect } from 'react';
import "../css/Products.css";
import { db } from '../config/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

function ItemHistory() {
  const [orders, setOrders] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [activeTab, setActiveTab] = useState('Pending');

  useEffect(() => {
    const fetchProductDetails = async (productId) => {
      try {
        const docRef = doc(db, "products", productId);
        const docSnapshot = await getDoc(docRef);
    
        if (!docSnapshot.exists()) {
          console.error('No product with the given ID:', productId);
          return {};
        }
    
        const productData = { id: docSnapshot.id, ...docSnapshot.data() };
        return productData;
      } catch (error) {
        console.error("Error fetching product details:", error);
        return {};
      }
    };

    const fetchOrdersByStatus = async () => {
      try {
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("status", "==", activeTab));
        const querySnapshot = await getDocs(q);
        const ordersWithDetails = [];

        for (let doc of querySnapshot.docs) {
          const orderData = doc.data();
          const productDetailsPromises = orderData.productDetails.map(
            async (product) => {
              const details = await fetchProductDetails(product.productId);
              if (!details.category || !details.price) {
                console.error('Missing category or price for product:', product.productId);
              }
              return { ...product, ...details };
            }
          );
          const productDetails = await Promise.all(productDetailsPromises);

          ordersWithDetails.push({
            id: doc.id,
            ...orderData,
            productDetails,
            dateOrdered: orderData.dateOrdered?.toDate() ? orderData.dateOrdered.toDate() : new Date(),
          });
        }

        setOrders(ordersWithDetails.sort((a, b) => b.dateOrdered - a.dateOrdered));
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };
  
    fetchOrdersByStatus();
  }, [activeTab]);

  const openModal = (order) => {
    setCurrentOrder(order);
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

  const filteredOrders = orders.filter(order => {
    return (
      order.buyerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.sellerEmail.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const renderOrderDetails = () => (
    <div className="order-list-container">
      <div className="search-bar-wrapper">
        <input
          type="text"
          placeholder="Search by buyer email or seller email..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>
      <div className="tabs">
        <div className={`tab ${activeTab === 'Pending' ? 'active-tab' : ''}`} onClick={() => handleTabClick('Pending')}>Pending Orders</div>
        <div className={`tab ${activeTab === 'Approved' ? 'active-tab' : ''}`} onClick={() => handleTabClick('Approved')}>Approved Orders</div>
        <div className={`tab ${activeTab === 'Receiving' ? 'active-tab' : ''}`} onClick={() => handleTabClick('Receiving')}>Delivered Orders</div>
        <div className={`tab ${activeTab === 'Completed' ? 'active-tab' : ''}`} onClick={() => handleTabClick('Completed')}>Completed Orders</div>
        <div className={`tab ${activeTab === 'Cancelled' ? 'active-tab' : ''}`} onClick={() => handleTabClick('Cancelled')}>Cancelled Orders</div>
      </div>
      {filteredOrders.length > 0 ? (
        <ul className="product-list">
          {filteredOrders.map(order => (
            <li key={order.id} className="product-list-item" onClick={() => openModal(order)}>
              <div className="product-info">
                <div className="order-id">{`#${order.id}`.toUpperCase()}</div>
                <div className="order-detail">
                  {order.productDetails.map((product, index) => (
                    <div key={index} className="order-card">
                      <img src={product.photo} alt={product.name} className="order-image" />
                      <div className="order-detail">
                        <h3>{product.name}</h3>
                        <p>{product.category}</p>
                        <p>₱{product.price}</p>
                        <div className="product-qty">x{product.orderedQuantity}</div>
                      </div>
                    </div>
                  ))}
                  <div className="order-price">₱{order.orderTotalPrice}</div>
                  <div className="order-qty">Buyer: {order.buyerEmail}</div>
                  <div className="order-qty">Seller: {order.sellerEmail}</div>
                  <div className="product-published-date">Date Ordered: {order.dateOrdered.toLocaleDateString()}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
  
  return (
    <div className="order-history-container">
      {renderOrderDetails()}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Order Details"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="modal-content">
          <button onClick={closeModal} className="modal-close-btn">
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <h2>{currentOrder?.id}</h2>
          <div className="modal-details">
            <p><strong>Total Price:</strong> ₱{currentOrder?.orderTotalPrice}</p>
            <p><strong>Buyer Email:</strong> {currentOrder?.buyerEmail}</p>
            <p><strong>Seller Email:</strong> {currentOrder?.sellerEmail}</p>
            <p><strong>Date Ordered:</strong> {currentOrder?.dateOrdered?.toLocaleDateString()}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ItemHistory;
