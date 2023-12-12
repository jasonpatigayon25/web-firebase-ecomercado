import React, { useState, useEffect } from "react";
import { FaUserCheck, FaBoxOpen, FaShoppingBag, FaHeart } from "react-icons/fa";
import SidebarOptions from "./SidebarOptions";
import { db } from '../config/firebase';
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import "../css/Admin.css";
import Modal from 'react-modal';

Modal.setAppElement('#root');

function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalDonation, setTotalDonation] = useState(0);
  const [recentFetchedUsers, setRecentFetchedUsers] = useState([]);
  const [totalProductsSold, setTotalProductsSold] = useState(0);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productModalContent, setProductModalContent] = useState([]);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getDocs(collection(db, 'users'))
      .then(snapshot => {
        setTotalUsers(snapshot.size);
      })
      .catch(err => {
        console.error("Error fetching users: ", err);
      });

    getDocs(collection(db, 'products'))
      .then(snapshot => {
        setTotalProducts(snapshot.size);
      })
      .catch(err => {
        console.error("Error fetching products: ", err);
      });

    getDocs(collection(db, 'donation'))
      .then(snapshot => {
        setTotalDonation(snapshot.size);
      })
      .catch(err => {
        console.error("Error fetching donation: ", err);
      });

    getDocs(query(collection(db, 'users'), orderBy('dateRegistered', 'desc'), limit(20)))
      .then(snapshot => {
          const fetchedUsers = snapshot.docs.map(doc => ({
              email: doc.data().email,
              fullName: `${doc.data().firstName} ${doc.data().lastName}`,
              dateRegistered: doc.data().dateRegistered
          }));
          setRecentFetchedUsers(fetchedUsers);
      })
      .catch(err => {
          console.error("Error fetching recent users: ", err);
      });

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

  const totalPages = Math.ceil(recentFetchedUsers.length / itemsPerPage);
  const currentUsers = recentFetchedUsers.slice(
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

  return (
    <div className="admin-dashboard">
      <SidebarOptions />
      <div className="admin-dashboard-content">
        <div className="admin-dashboard-cards">
          <div className="admin-dashboard-card">
            <div className="stats-number"><span>{totalUsers}</span></div>
            <div className="stats-icon"><FaUserCheck /></div>
            <div className="stats-label">Total Users</div>
          </div>
          <div
              className="admin-dashboard-card"
              onClick={() => setIsProductModalOpen(true)} 
            >
            <div className="stats-number"><span>{totalProducts}</span></div>
            <div className="stats-icon"><FaBoxOpen /></div>
            <div className="stats-label">Total Product Published</div>
          </div>
          <div className="admin-dashboard-card">
            <div className="stats-number"><span>{totalProductsSold}</span></div>
            <div className="stats-icon"><FaShoppingBag /></div>
            <div className="stats-label">Total Product Sold</div>
          </div>
          <div className="admin-dashboard-card">
            <div className="stats-number"><span>{totalDonation}</span></div>
            <div className="stats-icon"><FaHeart /></div>
            <div className="stats-label">Total Donations</div>
          </div>
        </div>

         <div className="admin-dashboard-recent-users">
          <h1>Recent Users</h1>
          <table>
            <thead>
              <tr>
                <th>Email Address</th>
                <th>Name</th>
                <th>Date Registered</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.email}</td>
                  <td>{user.fullName}</td>
                  <td>{user.dateRegistered}</td>
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
    </div>
  );
}

export default AdminDashboard;