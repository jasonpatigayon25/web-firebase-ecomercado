import React, { useState, useEffect } from "react";
import { FaBoxOpen, FaShoppingBag, FaEye } from "react-icons/fa";
import SidebarOptions from "./SidebarOptions";
import { db } from '../config/firebase';
import { collection, getDocs } from "firebase/firestore";
import "../css/Admin.css";

function ProductMetrics() {
  const [products, setProducts] = useState([]);
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
    const fetchProducts = async () => {
      const productCollection = collection(db, 'products');
      const productData = await getDocs(productCollection);
      const products = productData.docs.map(doc => ({
        id: doc.id,
        photo: doc.data().photo,
        name: doc.data().name,
        category: doc.data().category,
        price: doc.data().price,
        description: doc.data().description
      }));
      setProducts(products);
      setTotalProducts(productData.size);
    };
    fetchProducts();
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
            <h2 className="title-label">Total Product Published</h2>
            <p className="stats"><FaBoxOpen style={{ color: 'black' }} /> {totalProducts}</p>
          </div>
          <div className="admin-dashboard-card">
            <h2 className="title-label">Total Product Sold</h2>
            <p className="stats"><FaShoppingBag style={{ color: 'black' }} /> 0</p>
          </div>
        </div>
        <div className="admin-dashboard-recent-users mb-4 shadow">
          <h1>Recent Products Published</h1>
          <div className="divider"></div>
          <table>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td><img src={product.photo} alt={product.name} width="50" height="50"/></td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>₱{product.price}</td>
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
        <img src={product.photo} alt={product.name} width="100%" />
        <h2>{product.name}</h2>
        <p>Category: {product.category}</p>
        <p>Price: ₱{product.price}</p>
        <p>Description: {product.description}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ProductMetrics;
