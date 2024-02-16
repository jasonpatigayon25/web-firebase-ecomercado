import React, { useState, useEffect } from "react";
import { FaBoxOpen, FaShoppingBag } from "react-icons/fa";
import SidebarOptions from "./SidebarOptions";
import { db } from '../config/firebase';
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import "../css/Admin.css";
import Modal from 'react-modal';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid  } from 'recharts';

function renderPieChart(data) {
  return (
    <PieChart width={400} height={400}>
      <Pie 
        data={data} 
        dataKey="value" 
        nameKey="name" 
        cx="50%" 
        cy="50%" 
        outerRadius={150} 
        fill="#8884d8" 
        label
      >
        {
          data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color}/>)
        }
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}

function getLastWeekDates() {
  const dates = [];
  const today = new Date();
  const firstDayOfWeek = today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1); 
  for (let i = 0; i < 7; i++) {
    const date = new Date(today.getFullYear(), today.getMonth(), firstDayOfWeek + i);
    dates.push(date.toLocaleDateString());
  }
  return dates;
}

function OrdersPerWeekChart({ orders }) {
  const currentWeekDates = getLastWeekDates();
  const orderCounts = currentWeekDates.map(date => ({ date, count: 0 }));

  orders.forEach(order => {
    if (order.dateOrdered && order.dateOrdered.toDate) {
      const orderDate = order.dateOrdered.toDate().toLocaleDateString();
      const orderDay = orderCounts.find(day => day.date === orderDate);
      if (orderDay) orderDay.count++;
    }
  });

  return (
    <BarChart width={600} height={300} data={orderCounts}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#82ca9d" />
    </BarChart>
  );
}

function ApprovedPostSeller() {
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

  const [pieChartData, setPieChartData] = useState([]);

  const [isStatsCardHovered, setIsStatsCardHovered] = useState(false);

  useEffect(() => {

    const categoryCounts = {};
    products.forEach(product => {
      categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
    });
  
    const chartData = Object.keys(categoryCounts).map(category => ({
      name: category,
      value: categoryCounts[category],
      color: getRandomColor()
    }));
  
    setPieChartData(chartData);
  }, [products]);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersSnapshot = await getDocs(collection(db, 'orders'));
      const fetchedOrders = ordersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setOrders(fetchedOrders);
    };

    fetchOrders();
  }, []);

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
      const productQuery = query(productCollection, orderBy('createdAt', 'desc'));
      const productData = await getDocs(productQuery);
      const products = productData.docs.map(doc => ({
        id: doc.id,
        photo: doc.data().photo,
        name: doc.data().name,
        category: doc.data().category,
        price: doc.data().price,
        location: doc.data().location,
        quantity: doc.data().quantity,
        description: doc.data().description,
        seller_email: doc.data().seller_email,
        createdAt: doc.data().createdAt 
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

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

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
        <div className="admin-dashboard-cards">
        <div 
          className="admin-dashboard-card"
          onMouseEnter={() => setIsStatsCardHovered(true)}
          onMouseLeave={() => setIsStatsCardHovered(false)}
        >
          <div className="pie-chart-container">
          <h1 className="statistics-title" style={{ color: isStatsCardHovered ? '#008000' : '#ffffff' }}>Product Categories Distribution</h1>
            {renderPieChart(pieChartData)}
          </div>
          </div>
          <div 
            className="admin-dashboard-card"
            onMouseEnter={() => setIsStatsCardHovered(true)}
            onMouseLeave={() => setIsStatsCardHovered(false)}
          >
        <div className="bar-chart-container">
          <h1 className="statistics-title" style={{ color: isStatsCardHovered ? '#008000' : '#ffffff' }}>
            Orders This Week
          </h1>
          <OrdersPerWeekChart orders={orders} />
        </div>
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

export default ApprovedPostSeller;
