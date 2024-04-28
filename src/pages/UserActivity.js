import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import SidebarOptions from "./SidebarOptions";
import "../css/Admin.css";
import { FaBan, FaUser, FaUserAlt, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


function UserActivity() {
  const { email } = useParams();  
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('pending');
  const isPendingTab = activeTab === 'pending';
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const [pendingDonations, setPendingDonations] = useState([]);
  const [approvedDonations, setApprovedDonations] = useState([]);
  const [declinedDonations, setDeclinedDonations] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      try {
        const q = query(collection(db, 'users'), where('email', '==', email));
        const querySnapshot = await getDocs(q);
        const userData = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              ...data,
              dateRegistered: data.dateRegistered ? data.dateRegistered.toDate() : null,
            };
          })[0];

        setUserDetails(userData);
      } catch (err) {
        console.error("Error fetching user details: ", err);
        setError("Failed to fetch user details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [email]);

  useEffect(() => {
    const fetchProducts = async (status, userEmail) => {
      if (!userEmail) return; 
      const productsRef = collection(db, "products");
      const q = query(
        productsRef,
        where("publicationStatus", "==", status),
        where("seller_email", "==", userEmail)  
      );
      const querySnapshot = await getDocs(q);
      const productList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() ? doc.data().createdAt.toDate() : new Date(),
      })).sort((a, b) => b.createdAt - a.createdAt);
      setProducts(productList);
    };

    if (userDetails && userDetails.email) {
      fetchProducts(activeTab, userDetails.email);
    }
  }, [activeTab, userDetails]);  

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  const fetchPendingProducts = async () => {
    setIsLoading(true);
    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, where("publicationStatus", "==", "pending"));
      const querySnapshot = await getDocs(q);
      const productList = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() ? doc.data().createdAt.toDate() : new Date(),
        }))
        .sort((a, b) => b.createdAt - a.createdAt);
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching pending products: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderProductsContent = () => {
    return (
      <div className="product-list-container">
        {products.length > 0 ? (
          <ul className="product-list">
            {products.map(product => (
              <li key={product.id} className="product-list-item" onClick={() => openModal(product)}>
                <img src={product.photo} alt={`${product.name} thumbnail`} className="product-list-photo" />
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                  <div className="product-detail">
                    <span className="product-price">₱{product.price}</span>
                    <span className="product-category">{product.category}</span>
                    <span className="product-qty">Qty: {product.quantity}</span>
                    <span className="product-seller">From: {product.seller_email}</span>
                    <span className="product-published-date">Published At: {product.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
        <div className="product-info">
          <p className="no-pending">No products yet.</p>
          </div>
        )}
      </div>
    );
  };

  const handleApprove = async (productId) => {
    const confirmApprove = window.confirm("Are you sure you want to approve this product?");
    if (confirmApprove) {
      setIsLoading(true);
      try {
        await updateDoc(doc(db, "products", productId), { publicationStatus: "approved" });
        await fetchPendingProducts();
        closeModal(); 
      } catch (error) {
        console.error("Error updating document: ", error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const handleDecline = async (productId) => {
    const confirmDecline = window.confirm("Are you sure you want to decline this product?");
    if (confirmDecline) {
      setIsLoading(true);
      try {
        await updateDoc(doc(db, "products", productId), { publicationStatus: "declined" });
        await fetchPendingProducts();
        closeModal(); 
      } catch (error) {
        console.error("Error updating document: ", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const renderPendingProductsContent = () => {
    return (
      <div className="product-list-container">
        
        {products.length > 0 ? (
          <ul className="product-list">
            {products.map(product => (
              <li key={product.id} className="product-list-item" onClick={() => openModal(product)}>
                <img src={product.photo} alt={`${product.name} thumbnail`} className="product-list-photo" />
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                  <div className="product-detail">
                    <span className="product-price">₱{product.price}</span>
                    <span className="product-category">{product.category}</span>
                    <span className="product-qty">Qty: {product.quantity}</span>
                    <span className="product-seller">From: {product.seller_email}</span>
                    <div className="product-actions">
                    <button onClick={() => handleApprove(product.id)} className="approve-button">Approve</button>
                    <button onClick={() => handleDecline(product.id)} className="decline-button">Decline</button>
                  </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="product-info">
          <p className="no-pending">No products yet.</p>
          </div>
        )}
      </div>
    );
  };



  const handleApproveDonation = async (donationId) => {
    const confirmApprove = window.confirm("Are you sure you want to approve this donation?");
    if (confirmApprove) {
      setIsLoading(true);
      try {
        await updateDoc(doc(db, "donation", donationId), { publicationStatus: "approved" });
        setPendingDonations(prevDonations => prevDonations.filter(donation => donation.id !== donationId));
        await fetchApprovedDonations();
        closeModal();
      } catch (error) {
        console.error("Error updating document: ", error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const handleDeclineDonation = async (donationId) => {
    const confirmDecline = window.confirm("Are you sure you want to decline this donation?");
    if (confirmDecline) {
      setIsLoading(true);
      try {
        await updateDoc(doc(db, "donation", donationId), { publicationStatus: "declined" });
        setPendingDonations(prevDonations => prevDonations.filter(donation => donation.id !== donationId));
        await fetchDeclinedDonations();
        closeModal();
      } catch (error) {
        console.error("Error updating document: ", error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const fetchPendingDonations = useCallback(async () => {
    setIsLoading(true);
    try {
      const donationsRef = collection(db, "donation");
      const q = query(donationsRef, where("publicationStatus", "==", "pending"), where("donor_email", "==", email));
      const querySnapshot = await getDocs(q);
      const donationList = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() ? doc.data().createdAt.toDate() : new Date(),
        }))
        .sort((a, b) => b.createdAt - a.createdAt);
      setPendingDonations(donationList);
    } catch (error) {
      console.error("Error fetching pending donations: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [email]);

  const fetchApprovedDonations = useCallback(async () => {
    setIsLoading(true);
    try {
      const donationsRef = collection(db, "donation");
      const q = query(donationsRef, where("publicationStatus", "==", "approved"), where("donor_email", "==", email));
      const querySnapshot = await getDocs(q);
      const donationList = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() ? doc.data().createdAt.toDate() : new Date(),
        }))
        .sort((a, b) => b.createdAt - a.createdAt);
      setApprovedDonations(donationList);
    } catch (error) {
      console.error("Error fetching approved donations: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [email]);

  const fetchDeclinedDonations = useCallback(async () => {
    setIsLoading(true);
    try {
      const donationsRef = collection(db, "donation");
      const q = query(donationsRef, where("publicationStatus", "==", "declined"), where("donor_email", "==", email));
      const querySnapshot = await getDocs(q);
      const donationList = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() ? doc.data().createdAt.toDate() : new Date(),
        }))
        .sort((a, b) => b.createdAt - a.createdAt);
      setDeclinedDonations(donationList);
    } catch (error) {
      console.error("Error fetching declined donations: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [email]);

  useEffect(() => {
    fetchPendingDonations();
    fetchApprovedDonations();
    fetchDeclinedDonations();
  }, [fetchPendingDonations, fetchApprovedDonations, fetchDeclinedDonations]);

  const renderDonationsContent = (donations) => {
    return (
      <div className="product-list-container">
        {donations.length > 0 ? (
          <ul className="product-list">
            {donations.map(donation => (
              <li key={donation.id} className="product-list-item" onClick={() => openModal(donation)}>
                <img src={donation.photo} alt={`${donation.name} thumbnail`} className="product-list-photo" />
                <div className="product-info">
                  <div className="product-name">{donation.name}</div>
                  <div className="product-detail">
                    <span className="product-price">{donation.weight}KG</span>
                    <span className="product-category">{donation.category} Bundle</span>
                    <span className="product-qty">
                      {donation.purpose.length > 10 ? `${donation.purpose.substring(0, 10)}...` : donation.purpose}
                    </span>
                    <span className="product-seller">From: {donation.donor_email}</span>
                    <span className="product-published-date">Published At: {donation.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
        <div className="product-info">
          <p className="no-pending">No donations yet.</p>
          </div>
        )}
      </div>
    );
  };

  const renderPendingDonationsContent = () => {
    return (
      <div className="product-list-container">
        {pendingDonations.length > 0 ? (
          <ul className="product-list">
            {pendingDonations.map(donation => (
              <li key={donation.id} className="product-list-item" onClick={() => openModal(donation)}>
                <img src={donation.photo} alt={`${donation.name} thumbnail`} className="product-list-photo" />
                <div className="product-info">
                  <div className="product-name">{donation.name}</div>
                  <div className="product-detail">
                    <span className="product-price">{donation.weight}KG</span>
                    <span className="product-category">{donation.category} Bundle</span>
                    <span className="product-qty">
                      {donation.purpose.length > 10 ? `${donation.purpose.substring(0, 10)}...` : donation.purpose}
                    </span>
                    <span className="product-seller">From: {donation.donor_email}</span>
                    <div className="product-actions">
                      <button onClick={() => handleApproveDonation(donation.id)} className="approve-button">Approve</button>
                      <button onClick={() => handleDeclineDonation(donation.id)} className="decline-button">Decline</button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
        <div className="product-info">
          <p className="no-pending">No donations yet.</p>
          </div>
        )}
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'pending':
        return renderPendingProductsContent();
      case 'approved':
        return renderProductsContent();
      case 'declined':
        return renderProductsContent();
      case 'pending-donation':
        return renderPendingDonationsContent();
      case 'approved-donation':
        return renderDonationsContent(approvedDonations);
      case 'declined-donation':
        return renderDonationsContent(declinedDonations);
      default:
        return 'Invalid';
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userDetails) {
    return <div>No user found.</div>;
  }

  const handleBanUser = async (e) => {
    e.preventDefault();
  
    const confirmBan = window.confirm(`Confirmation to ban ${userDetails.firstName} ${userDetails.lastName}?`);
    
    if (!confirmBan) {
      return; 
    }
  
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
  
    try {
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        alert(`No user found with email: ${email}`);
        return;
      }
  
      querySnapshot.forEach(async (document) => {
        await updateDoc(document.ref, {
          banned: true
        });
      });
  
      alert(`${email} has been banned.`);
      navigate(`/users-information`);
    } catch (error) {
      console.error("Error banning the user: ", error);
      alert("Failed to ban the user.");
    }
  
    const productsRef = collection(db, "products");
    const productsQuery = query(productsRef, where("seller_email", "==", email));
  
    try {
      const productsSnapshot = await getDocs(productsQuery);
  
      productsSnapshot.forEach(async (productDoc) => {
        await updateDoc(productDoc.ref, {
          publicationStatus: 'declined'
        });
      });
  
      console.log(`Products from ${email} have been disabled.`);
    } catch (error) {
      console.error("Error disabling the user's products: ", error);
    }
  
    const donationsRef = collection(db, "donation");
    const donationsQuery = query(donationsRef, where("donor_email", "==", email));
  
    try {
      const donationsSnapshot = await getDocs(donationsQuery);
  
      donationsSnapshot.forEach(async (donationDoc) => {
        await updateDoc(donationDoc.ref, {
          publicationStatus: 'declined'
        });
      });
  
      console.log(`Donations from ${email} have been disabled.`);
    } catch (error) {
      console.error("Error disabling the user's donations: ", error);
    }
  };

  const handleUnBanUser = async (e) => {
    e.preventDefault();
  
    const confirmBan = window.confirm(`Confirmation of enabling ${userDetails.firstName} ${userDetails.lastName}?`);
    
    if (!confirmBan) {
      return; 
    }
  
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
  
    try {
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        alert(`No user found with email: ${email}`);
        return;
      }
  
      querySnapshot.forEach(async (document) => {
        await updateDoc(document.ref, {
          banned: false
        });
      });
  
      alert(`${email} account has been enabled.`);
      navigate(`/users-information`);
    } catch (error) {
      console.error("Error banning the user: ", error);
      alert("Failed to ban the user.");
    }
  
    const productsRef = collection(db, "products");
    const productsQuery = query(productsRef, where("seller_email", "==", email));
  
    try {
      const productsSnapshot = await getDocs(productsQuery);
  
      productsSnapshot.forEach(async (productDoc) => {
        await updateDoc(productDoc.ref, {
          publicationStatus: 'pending'
        });
      });
  
      console.log(`Products from ${email} have been pending.`);
    } catch (error) {
      console.error("Error pending the user's products: ", error);
    }
  
    const donationsRef = collection(db, "donation");
    const donationsQuery = query(donationsRef, where("donor_email", "==", email));
  
    try {
      const donationsSnapshot = await getDocs(donationsQuery);
  
      donationsSnapshot.forEach(async (donationDoc) => {
        await updateDoc(donationDoc.ref, {
          publicationStatus: 'pending'
        });
      });
  
      console.log(`Donations from ${email} have been pending.`);
    } catch (error) {
      console.error("Error disabling the user's donations: ", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <SidebarOptions />
      <div className="admin-dashboard-content">
      <div className="user-details-card">
          {userDetails.banned ? (
            <div className="card-ban-icon">BANNED <FaCog onClick={handleUnBanUser} /></div>
          ) : (
            <FaBan className="card-ban-icon" onClick={handleBanUser} />
          )}
          <div className="card-avatar">
            {userDetails.photoUrl ? (
              <img src={userDetails.photoUrl} alt="Profile" />
            ) : (
              <FaUser size={120} />
            )}
          </div>
          <div className="card-info">
            <h1><FaUserAlt className="info-icon" /> {userDetails.firstName} {userDetails.lastName}</h1>
            <p><FaEnvelope className="info-icon" /> {userDetails.email}</p>
            <p><FaMapMarkerAlt className="info-icon" /> {userDetails.address}</p>
            <p><FaCalendarAlt className="info-icon" /> {userDetails.dateRegistered ? new Date(userDetails.dateRegistered).toLocaleDateString() : 'N/A'}</p>
          </div>
        </div>
        <div className="tabs">
          <div onClick={() => setActiveTab('pending')} className={`tab ${activeTab === 'pending' ? 'active-tab' : ''}`}>Pending Products</div>
          <div onClick={() => setActiveTab('approved')} className={`tab ${activeTab === 'approved' ? 'active-tab' : ''}`}>Approved Products</div>
          <div onClick={() => setActiveTab('declined')} className={`tab ${activeTab === 'declined' ? 'active-tab' : ''}`}>Declined Products</div>
          <div onClick={() => setActiveTab('pending-donation')} className={`tab ${activeTab === 'pending-donation' ? 'active-tab' : ''}`}>Pending Donations</div>
          <div onClick={() => setActiveTab('approved-donation')} className={`tab ${activeTab === 'approved-donation' ? 'active-tab' : ''}`}>Approved Donations</div>
          <div onClick={() => setActiveTab('declined-donation')} className={`tab ${activeTab === 'declined-donation' ? 'active-tab' : ''}`}>Declined Donations</div>
        </div>
        <div className="tab-content">
          {renderTabContent()}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Item Details"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="modal-content">
          <button onClick={closeModal} className="modal-close-btn">
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <h2>{selectedProduct?.name}</h2>
          <div className="modal-photos">
            {selectedProduct?.photo && (
              <div className="main-photo">
                <img src={selectedProduct.photo} alt={`${selectedProduct.name}`} className="modal-photo" />
              </div>
            )}
            {selectedProduct?.subPhotos && selectedProduct?.subPhotos.length >   0 && (
              <div className="sub-photos">
                {selectedProduct.subPhotos.map((subPhoto, index) => (
                  <img key={index} src={subPhoto} alt={`Sub Photo}`} className="modal-sub-photo" />
                ))}
              </div>
            )}
          </div>
          <div className="modal-details">
            <p><strong>Category:</strong> {selectedProduct?.category}</p>
            <p><strong>Quantity:</strong> {selectedProduct?.quantity}</p>
            <p><strong>Date Published:</strong> {selectedProduct?.createdAt.toLocaleDateString()}</p>
            <p><strong>Price:</strong> ₱{selectedProduct?.price}</p>
            <p><strong>Description:</strong> {selectedProduct?.description}</p>
            <p><strong>Seller Email:</strong> {selectedProduct?.seller_email}</p>
            <p><strong>Logistic Packaging - WHL:</strong> {selectedProduct?.shipping ? `${selectedProduct.shipping.width} cm X ${selectedProduct.shipping.height} cm X ${selectedProduct.shipping.length} cm` : 'N/A'}</p>
            <p><strong>Weight:</strong> {selectedProduct?.shipping ? `${selectedProduct.shipping.weight} kg`: 'N/A'}</p>
          </div>
        </div>
      </Modal>
            <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Item Details"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="modal-content">
          <button onClick={closeModal} className="modal-close-btn">
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <h2>{selectedProduct?.name}</h2>
          <div className="modal-photos">
            {selectedProduct?.photo && (
              <div className="main-photo">
                <img src={selectedProduct.photo} alt={`${selectedProduct.name}`} className="modal-photo" />
              </div>
            )}
            {selectedProduct?.subPhotos && selectedProduct?.subPhotos.length >   0 && (
              <div className="sub-photos">
                {selectedProduct.subPhotos.map((subPhoto, index) => (
                  <img key={index} src={subPhoto} alt={`Sub Photo}`} className="modal-sub-photo" />
                ))}
              </div>
            )}
          </div>
          <div className="modal-details">
            <p><strong>Category:</strong> {selectedProduct?.category}</p>
            <p><strong>Quantity:</strong> {selectedProduct?.quantity}</p>
            <p><strong>Date Published:</strong> {selectedProduct?.createdAt.toLocaleDateString()}</p>
            <p><strong>Price:</strong> ₱{selectedProduct?.price}</p>
            <p><strong>Description:</strong> {selectedProduct?.description}</p>
            <p><strong>Seller Email:</strong> {selectedProduct?.seller_email}</p>
            <p><strong>Logistic Packaging - WHL:</strong> {selectedProduct?.shipping ? `${selectedProduct.shipping.width} cm X ${selectedProduct.shipping.height} cm X ${selectedProduct.shipping.length} cm` : 'N/A'}</p>
            <p><strong>Weight:</strong> {selectedProduct?.shipping ? `${selectedProduct.shipping.weight} kg`: 'N/A'}</p>
            {isPendingTab && (
            <div className="modal-actions">
              <button onClick={() => handleApprove(selectedProduct.id)} className="approve-button">Approve</button>
              <button onClick={() => handleDecline(selectedProduct.id)} className="decline-button">Decline</button>
            </div>
          )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UserActivity;