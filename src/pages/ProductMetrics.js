import React, { useState, useEffect } from "react";
import { FaBoxOpen, FaShoppingBag, FaEye } from "react-icons/fa";
import SidebarOptions from "./SidebarOptions";
import { db } from '../config/firebase';
import { collection, getDocs } from "firebase/firestore";
import "../css/Admin.css";

const recentProducts = [
  { itemName: 'Product 1', userName: 'Username1', datePublished: '2023-06-01' },
  { itemName: 'Product 2', userName: 'Username2', datePublished: '2023-05-25' },
  { itemName: 'Product 3', userName: 'Username3', datePublished: '2023-05-18' },
  { itemName: 'Product 4', userName: 'Username4', datePublished: '2023-05-16' },
  { itemName: 'Product 5', userName: 'Username5', datePublished: '2023-05-10' },
  { itemName: 'Product 6', userName: 'Username6', datePublished: '2023-05-05' },
  { itemName: 'Product 7', userName: 'Username7', datePublished: '2023-04-29' },
  { itemName: 'Product 8', userName: 'Username8', datePublished: '2023-04-20' },
  { itemName: 'Product 9', userName: 'Username9', datePublished: '2023-04-12' },
  { itemName: 'Product 10', userName: 'Username10', datePublished: '2023-04-03' }
];

function ProductMetrics() {

  const [totalProducts, setTotalProducts] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  }

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setModalVisible(false);
  }


  useEffect(() => {

    getDocs(collection(db, 'products'))
      .then(snapshot => {
        setTotalProducts(snapshot.size);
      })
      .catch(err => {
        console.error("Error fetching products: ", err);
      });

  }, []);

  return (
    <div className="admin-dashboard">
      <SidebarOptions />
      <div className="admin-dashboard-content">
        <div className="admin-dashboard-header">
          <h2>PRODUCT METRICS</h2>
        </div>
        <div className="admin-dashboard-cards">
          <div className="admin-dashboard-card">
            <h2 className="title-label"> Total Product Published</h2>
            <p className="stats"> <FaBoxOpen style={{ color: 'black' }} /> {totalProducts}</p>
          </div>
          <div className="admin-dashboard-card">
            <h2 className="title-label"> Total Product Sold</h2>
            <p className="stats"> <FaShoppingBag style={{ color: 'black' }} /> 0</p>
          </div>
        </div>

        <div className="admin-dashboard-recent-users mb-4 shadow">
          <h1>Recent Products Published</h1>
          <div className="divider"></div>
          <table className="recent-products-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Username</th>
                <th>Date Published</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {recentProducts.map((product, index) => (
                <tr key={index}>
                  <td>{product.itemName}</td>
                  <td>{product.userName}</td>
                  <td>{product.datePublished}</td>
                  <td>
                    <FaEye onClick={() => handleOpenModal(product)} style={{ cursor: 'pointer', color: '#05652d' }} />
                  </td>
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
        <h2>{product.itemName}</h2>
        <p>Username: {product.userName}</p>
        <p>Date Published: {product.datePublished}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ProductMetrics;
