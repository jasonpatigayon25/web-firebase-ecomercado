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
  const [isLoading, setIsLoading] = useState(true);

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

    const fetchUserDetails = async (email) => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
    
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          return userData;
        } else {
          console.error('No user with the given email:', email);
          return {};
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        return {};
      }
    };

    const fetchSellerDetails = async (email) => {
      try {
        const sellersRef = collection(db, "registeredSeller");
        const q = query(sellersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
    
        if (!querySnapshot.empty) {
          const sellerData = querySnapshot.docs[0].data();
          return sellerData;
        } else {
          console.error('No seller with the given email:', email);
          return {};
        }
      } catch (error) {
        console.error("Error fetching seller details:", error);
        return {};
      }
    };

    const fetchOrdersByStatus = async () => {
      setIsLoading(true);
      try {
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("status", "==", activeTab));
        const querySnapshot = await getDocs(q);
        const ordersWithDetails = [];

        for (let doc of querySnapshot.docs) {
          const orderData = doc.data();
          const buyerDetails = await fetchUserDetails(orderData.buyerEmail);
          const sellerDetails = await fetchUserDetails(orderData.sellerEmail);
          const sellerRegisteredDetails = await fetchSellerDetails(orderData.sellerEmail);
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
            buyerContactNumber: buyerDetails.contactNumber,
            sellerContactNumber: sellerDetails.contactNumber,
            buyerFirstName: buyerDetails.firstName,
            sellerFirstName: sellerDetails.firstName,
            buyerLastName: buyerDetails.lastName,
            sellerLastName: sellerDetails.lastName,
            sellerAddress: sellerRegisteredDetails.sellerAddress,
            dateOrdered: orderData.dateOrdered?.toDate() ? orderData.dateOrdered.toDate() : new Date(),
          });
        }

        setOrders(ordersWithDetails.sort((a, b) => b.dateOrdered - a.dateOrdered));
        setIsLoading(false);
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
        <div className={`tab ${activeTab === 'Receiving' ? 'active-tab' : ''}`} onClick={() => handleTabClick('Receiving')}>To Receive Orders</div>
        <div className={`tab ${activeTab === 'Completed' ? 'active-tab' : ''}`} onClick={() => handleTabClick('Completed')}>Completed Orders</div>
        <div className={`tab ${activeTab === 'Cancelled' ? 'active-tab' : ''}`} onClick={() => handleTabClick('Cancelled')}>Cancelled Orders</div>
      </div>
      {isLoading ? (
        <div className="no-pending"><p>Loading...</p></div>
      ) : filteredOrders.length > 0 ? (
        <ul className="product-list">
          {filteredOrders.map(order => (
            <li key={order.id} className="product-list-item" onClick={() => openModal(order)}>
              <div className="product-info">
                <div className="order-header">
                  <div className="order-id">{`#${order.id}`.toUpperCase()}</div>
                  <div className="product-published-date">Date Ordered: {order.dateOrdered.toLocaleDateString()}</div>
                </div>
                <div className="order-cards-container">
                  {order.productDetails.map((product, index) => (
                    <div className="order-card" key={index}>
                      <div className="order-card-content">
                        <img src={product.photo} alt={product.name} className="order-image" />
                        <div className="order-detail">
                          <h3 title={product.name}>{product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}</h3>
                          <p className="category">{product.category}</p>
                          <p className="price">₱{product.price}</p>
                        </div>
                      </div>
                      <div className="product-qty">x{product.orderedQuantity}</div>
                    </div>
                  ))}
                </div>
                <div className="order-footer">
                  <div className="payment-label">
                    Buyer: <span className="payment-value">{order.buyerEmail}</span>
                  </div>
                  <div className="payment-label">
                    Seller: <span className="payment-value">{order.sellerEmail}</span>
                  </div>
                  <div className="payment-label">
                    Total Payment: <span className="payment-value">₱{order.orderTotalPrice}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="product-info">
        <p className="no-pending">No Orders Yet.</p>
        </div>
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
          <h2>#{currentOrder?.id.toUpperCase()}</h2>
          <div className="modal-details">
            <p><strong>BUYER</strong></p>
            <p><strong>Name:</strong> {currentOrder?.buyerFirstName} {currentOrder?.buyerLastName}</p>
            <p><strong>Email:</strong> {currentOrder?.buyerEmail}</p>
            <p><strong>Contact Number:</strong> 0{currentOrder?.buyerContactNumber}</p>
            <p><strong>Delivery Address:</strong> {currentOrder?.deliveryAddress}</p>
            <br/>
            <p><strong>SELLER</strong></p>
            <p><strong>Name:</strong> {currentOrder?.sellerFirstName} {currentOrder?.sellerLastName}</p>
            <p><strong>Email:</strong> {currentOrder?.sellerEmail}</p>
            <p><strong>Contact Number:</strong> 0{currentOrder?.sellerContactNumber}</p>
            <p><strong>Seller Address:</strong> {currentOrder?.sellerAddress}</p>
            <br/>
            <p><strong>Delivery Fee:</strong> ₱{currentOrder?.shippingFee}</p>
            <p><strong>Total Price:</strong> ₱{currentOrder?.orderTotalPrice}</p>
            <p><strong>Date Ordered:</strong> {currentOrder?.dateOrdered?.toLocaleDateString()}</p>
           
            <div className="order-cards-container">
              {currentOrder?.productDetails.map((product, index) => (
                <div className="order-card" key={index}>
                  <div className="order-card-content">
                    <img src={product.photo} alt={product.name} className="order-image" />
                    <div className="order-detail">
                      <h3 title={product.name}>{product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}</h3>
                      <p className="product-category-modal">{product.category}</p>
                      <p className="price" >₱{product.price}</p>
                    </div>
                  </div>
                  <div className="product-qty-modal">x{product.orderedQuantity}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}


export default ItemHistory;
