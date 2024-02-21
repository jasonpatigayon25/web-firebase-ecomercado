import React, { useState, useEffect } from 'react';
import "../css/ActivityNavbar.css";
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Modal from 'react-modal'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'; 

function UserApprovedSeller() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchApprovedProducts = async () => {
      const productsRef = collection(db, "products");
      const q = query(productsRef, where("publicationStatus", "==", "approved"));
      const querySnapshot = await getDocs(q);
      const productList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() ? doc.data().createdAt.toDate() : new Date(),
      }));
      setProducts(productList);
    };

    fetchApprovedProducts();
  }, []); 

  const renderProductApproved = () => (
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Seller</th>
          <th>Date Published</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 ? (
          products.map(product => (
            <tr key={product.id}>
              <td><img src={product.photo} alt={product.name} className="rounded-image" style={{width: "50px", height: "50px"}} /></td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>₱{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.seller_email}</td>
              <td>{product.createdAt.toLocaleDateString()}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">No approved products found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );

  return (
    <div className="approved-products-container">
      <h2>Approved Products</h2>
      {renderProductApproved()}
    </div>
  );
}

export default UserApprovedSeller;