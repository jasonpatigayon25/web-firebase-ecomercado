import React, { useState, useEffect } from "react";
import { FaBoxOpen, FaShoppingBag } from "react-icons/fa";
import SidebarOptions from "./SidebarOptions";
import { db } from '../config/firebase';
import { collection, getDocs } from "firebase/firestore";
import "../css/Admin.css";

function ProductMetrics() {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [totalProductsSold, setTotalProductsSold] = useState(0);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  }

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setModalVisible(false);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const productCollection = collection(db, 'products');
      const productData = await getDocs(productCollection);
      const products = productData.docs.map(doc => ({
        id: doc.id,
        photo: doc.data().photo,
        name: doc.data().name,
        category: doc.data().category,
        price: doc.data().price,
        location: doc.data().location,
        quantity: doc.data().quantity,
        description: doc.data().description,
        seller_email: doc.data().seller_email 
      }));
      setProducts(products);
      setTotalProducts(productData.size);
    };
    fetchProducts();
  }, []);

 /*  useEffect(() => {
    const fetchTotalProductsSold = async () => {
      const ordersCollection = collection(db, 'orders');
      const ordersSnapshot = await getDocs(ordersCollection);
      let totalSold = 0;
      ordersSnapshot.forEach(doc => {
        const orderDetails = doc.data().productDetails;
        if (orderDetails && Array.isArray(orderDetails)) {
          orderDetails.forEach(item => {
            totalSold += item.quantity ? item.quantity : 0;
          });
        }
      });
      setTotalProductsSold(totalSold);
    };
    fetchTotalProductsSold();
  }, []); */

  useEffect(() => {
    const fetchTotalProductsSold = async () => {
      const ordersCollection = collection(db, 'orders');
      const ordersSnapshot = await getDocs(ordersCollection);
      setTotalProductsSold(ordersSnapshot.size);
    };
    fetchTotalProductsSold();
  }, []);

  return (
    <div className="admin-dashboard">
      <SidebarOptions />
      <div className="admin-dashboard-content">
        <div className="admin-dashboard-cards">
          <div className="admin-dashboard-card">
            <div className="stats-number"><span>{totalProducts}</span></div>
            <div className="stats-icon"><FaBoxOpen /></div>
            <div className="stats-label">Total Product Published</div>     
          </div>
          <div className="admin-dashboard-card">
            <div className="stats-number"><span>{totalProductsSold}</span></div>
            <div className="stats-icon"><FaShoppingBag /></div>
            <div className="stats-label">Total Product Sold</div>
          </div>
        </div>
        <div className="admin-dashboard-recent-users">
          <h1>Recent Products Published</h1>
          <table>
            <thead>
              <tr>
                <th style={{ width: '80px' }}>Photo</th>
                <th>Product Name</th>
                <th>Seller</th>
                <th>Category</th>
                <th>Price</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td style={{ width: '80px' }} className="user-image"><img src={product.photo} alt={product.name} width="50" height="50"/></td>
                  <td>{product.name}</td>
                  <td>{product.seller_email}</td>
                  <td>{product.category}</td>
                  <td>₱{product.price}</td>
                  <button className="view-link" onClick={() => handleOpenModal(product)} style={{ cursor: 'pointer' }}>
                    View
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isModalVisible && (
          <ProductDetailsModal product={selectedProduct} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
}

function ProductDetailsModal({ product, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={product.photo} alt={product.name} width="100%" />
        <h2>{product.name}</h2>
        <p>Seller Email: {product.seller_email}</p>
        <p>Category: {product.category}</p>
        <p>Price: ₱{product.price}</p>
        <p>Quantity: {product.quantity}</p>
        <p>Location: {product.location}</p>
        <p>Description: {product.description}</p>
        <button className= "modal-close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ProductMetrics;
