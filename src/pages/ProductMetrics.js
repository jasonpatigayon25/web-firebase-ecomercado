import React, { useState, useEffect } from "react";
import { FaBoxOpen, FaShoppingBag } from "react-icons/fa";
import SidebarOptions from "./SidebarOptions";
import { db } from '../config/firebase';
import { collection, getDocs } from "firebase/firestore";
import "../css/Admin.css";
import Modal from 'react-modal';

function ProductMetrics() {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [totalProductsSold, setTotalProductsSold] = useState(0);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productModalContent, setProductModalContent] = useState([]);

  const [isProductsSoldModalOpen, setIsProductsSoldModalOpen] = useState(false);
  const [productsSoldModalContent, setProductsSoldModalContent] = useState([]);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

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

  useEffect(() => {
    const fetchTotalProductsSold = async () => {
      const ordersCollection = collection(db, 'orders');
      const ordersSnapshot = await getDocs(ordersCollection);
      setTotalProductsSold(ordersSnapshot.size);
    };
    fetchTotalProductsSold();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const fetchProductsForModal = async () => {
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      const productsData = productsSnapshot.docs.map(doc => ({
        name: doc.data().name,
        category: doc.data().category,
        photo: doc.data().photo
      }));
      setProductModalContent(productsData);
    };

    if (isProductModalOpen) {
      fetchProductsForModal();
    }
  }, [isProductModalOpen]);

  const fetchProductsSold = async () => {
    try {
      const ordersSnapshot = await getDocs(collection(db, 'orders'));
      const orders = ordersSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          productDetails: data.productDetails,
          buyer: data.buyer || 'No buyer info',
          status: data.status
        };
      });
      setProductsSoldModalContent(orders);
    } catch (error) {
      console.error("Error fetching orders: ", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <SidebarOptions />
      <div className="admin-dashboard-content">
        <div className="admin-dashboard-cards">
          <div className="admin-dashboard-card"
          onClick={() => setIsProductModalOpen(true)} >
            <div className="stats-number"><span>{totalProducts}</span></div>
            <div className="stats-icon"><FaBoxOpen /></div>
            <div className="stats-label">Total Product Published</div>     
          </div>
          <div className="admin-dashboard-card"
           onClick={() => {
            setIsProductsSoldModalOpen(true);
            fetchProductsSold();
          }}>
            <div className="stats-number"><span>{totalProductsSold}</span></div>
            <div className="stats-icon"><FaShoppingBag /></div>
            <div className="stats-label">Total Orders</div>
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
              {currentProducts.map((product, index) => (
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
          <div className="pagination-controls">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              disabled={currentPage === i + 1}
            >
              {i + 1}
            </button>
          ))}
        </div>
        {isModalVisible && (
          <ProductDetailsModal product={selectedProduct} onClose={handleCloseModal} />
        )}
      </div>
      </div>
        <Modal
          isOpen={isProductModalOpen}
          onRequestClose={() => setIsProductModalOpen(false)}
          contentLabel="Product Modal"
          className="ReactModal__Content"
          overlayClassName="ReactModal__Overlay"
        >
          <div className="modal-header">
            <h2 className="modal-title">Published Products</h2>
            <button className="modal-close-button" onClick={() => setIsProductModalOpen(false)}>✕</button>
          </div>
          <div className="product-list">
            {productModalContent.map((product, index) => (
              <div key={index} className="product-card">
                <img src={product.photo} alt={product.name} className="product-image" />
                <p className="product-name">{product.name}</p>
                <p className="product-category">{product.category}</p>
              </div>
            ))}
          </div>
        </Modal>
        <Modal
          isOpen={isProductsSoldModalOpen}
          onRequestClose={() => setIsProductsSoldModalOpen(false)}
          contentLabel="Products Sold Modal"
          className="ReactModal__Content"
          overlayClassName="ReactModal__Overlay"
        >
          <div className="modal-header">
            <h2 className="modal-title">Total Orders</h2>
            <button className="modal-close-button" onClick={() => setIsProductsSoldModalOpen(false)}>✕</button>
          </div>
          <div className="product-list">
          {productsSoldModalContent.map((order, index) => (
            <div key={index} className="product-card">
              <img src={order.productDetails.image} alt={order.productDetails.image} className="product-image" />
              <p className="product-name">Product ID: {order.productDetails.productId}</p>
              <p className="product-name">Name: {order.productDetails.name}</p>
              <p className="product-category">Buyer Email: {order.buyer.email}</p>
              <p className="product-category">Buyer UID: {order.buyer.uid}</p>
              <p className="product-category">Status: {order.status}</p>
            </div>
          ))}
        </div>
        </Modal>
    </div>
  );
}

function ProductDetailsModal({ product, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={product.photo} alt={product.name} width="100%" />
        <h2 style={{ color: 'black' }}>{product.name}</h2>
        <p>Seller Email: {product.seller_email}</p>
        <p>Category: {product.category}</p>
        <p>Price: ₱{product.price}</p>
        <p>Quantity: {product.quantity}</p>
        <p>Location: {product.location}</p>
        <p>Description: {product.description}</p>
        <button className= "modal-close-button" onClick={onClose}>✕</button>
      </div>
    </div>
  );
}

export default ProductMetrics;
