import React, { useState, useEffect } from 'react';
import "../css/ActivityNavbar.css";
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function ActivityNavbar({ email }) {
  const [activeTab, setActiveTab] = useState('user-approved-posts');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (activeTab === 'user-approved-posts') {
        const q = query(collection(db, 'products'), where('seller_email', '==', email));
        const querySnapshot = await getDocs(q);
        setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    };

    fetchProducts();
  }, [email, activeTab]); 

  const handleButtonClick = (tabName) => {
    setActiveTab(tabName);
    setProducts([]);
  };

  const renderProductsTable = () => (
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Date Published</th>
        </tr>
      </thead>
      <tbody>
        {products.length ? (
          products.map(product => (
            <tr key={product.id}>
              <td><img src={product.photo} alt={product.name} className="rounded-image" /></td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.quantity}</td>
              <td>{new Date(product.createdAt).toLocaleDateString()}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">No approved posts yet.</td>
          </tr>
        )}
      </tbody>
    </table>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'user-approved-posts':
        return renderProductsTable();
      case 'user-pending-products':
        return <p>No pending products yet.</p>;
      case 'user-pending-donations':
        return <p>No pending donations yet.</p>;
      case 'user-declined-posts':
        return <p>No declined posts yet.</p>;
      case 'user-donation-history':
        return <p>No donation history yet.</p>;
      default:
        return <p>Select a category to view its contents.</p>;
    }
  };

  return (
    <div>
      <div className="activity-navbar">
        <ul className="activity-navbar-nav">
          <li className={activeTab === 'user-approved-posts' ? 'active' : ''}>
              <button onClick={() => handleButtonClick('user-approved-posts')}>Approved Posts</button>
          </li>
          <li className={activeTab === 'user-pending-products' ? 'active' : ''}>
            <button onClick={() => handleButtonClick('user-pending-products')}>Pending Products</button>
          </li>
          <li className={activeTab === 'user-pending-donations' ? 'active' : ''}>
            <button onClick={() => handleButtonClick('user-pending-donations')}>Pending Donations</button>
          </li>
          <li className={activeTab === 'user-declined-posts' ? 'active' : ''}>
            <button onClick={() => handleButtonClick('user-declined-posts')}>Declined Posts</button>
          </li>
          <li className={activeTab === 'user-donation-history' ? 'active' : ''}>
            <button onClick={() => handleButtonClick('user-donation-history')}>Donation History</button>
          </li>
        </ul>
      </div>
      <div className="content-display">
        {renderContent()}
      </div>
    </div>
  );
}

export default ActivityNavbar;
