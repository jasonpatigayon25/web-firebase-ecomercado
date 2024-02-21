import React, { useState, useEffect } from "react";
import { FaBoxOpen, FaShoppingBag } from "react-icons/fa";
import SidebarOptions from "./SidebarOptions";
import { db } from '../config/firebase';
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import "../css/Admin.css";
import Modal from 'react-modal';
import UserPendingProduct from "./UserPendingProducts";

function PendingPostSeller() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalProductsSold, setTotalProductsSold] = useState(0);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productModalContent, setProductModalContent] = useState([]);

  const [isProductsSoldModalOpen, setIsProductsSoldModalOpen] = useState(false);
  const [productsSoldModalContent, setProductsSoldModalContent] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productCollection = collection(db, 'products');
      const productQuery = query(productCollection, orderBy('createdAt', 'desc'));
      const productData = await getDocs(productQuery);
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
            onClick={() => setIsProductModalOpen(true)}>
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
        <div>
          <UserPendingProduct />
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
            <img src={order.productDetails.image} alt={order.productDetails.name} className="product-image" />
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

export default PendingPostSeller;
