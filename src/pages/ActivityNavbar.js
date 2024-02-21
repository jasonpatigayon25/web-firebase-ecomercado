import React, { useState, useEffect, useCallback } from 'react';
import "../css/ActivityNavbar.css";
import { db } from '../config/firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

function ActivityNavbar({ email }) {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpenDonation, setIsOpenDonation] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [currentDonation, setCurrentDonation] = useState(null);

  const [activeTab, setActiveTab] = useState('user-approved-products');
  const [products, setProducts] = useState([]);

  const [donations, setDonations] = useState([]);

  const fetchProducts = useCallback(async () => {
    let q;
    switch (activeTab) {
      case 'user-approved-products':
        q = query(
          collection(db, 'products'), 
          where('seller_email', '==', email),
          where('publicationStatus', '==', 'approved')
        );
        break;  
      case 'user-pending-products':
        q = query(
          collection(db, 'products'), 
          where('seller_email', '==', email),
          where('publicationStatus', '==', 'pending')
        );
        break;
      case 'user-declined-products':
        q = query(
          collection(db, 'products'), 
          where('seller_email', '==', email),
          where('publicationStatus', '==', 'declined')
        );
        break;
      default:
        setProducts([]);
        return;
    }
    
    const querySnapshot = await getDocs(q);
    setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  }, [email, activeTab]);

  
  const fetchDonations = useCallback(async () => {
    let q;
    switch (activeTab) {
      case 'user-approved-donations':
        q = query(
          collection(db, 'donation'),
          where('donor_email', '==', email),
          where('publicationStatus', '==', 'approved')
        );
        break;
      case 'user-pending-donations':
        q = query(
          collection(db, 'donation'),
          where('donor_email', '==', email),
          where('publicationStatus', '==', 'pending')
        );
        break;
      case 'user-declined-donations':
        q = query(
          collection(db, 'donation'),
          where('donor_email', '==', email),
          where('publicationStatus', '==', 'declined')
        );
        break;
      default:
        return; 
    }
  
    const querySnapshot = await getDocs(q);
    setDonations(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  }, [email, activeTab]);
  
  useEffect(() => {
    if (activeTab === 'user-approved-donations' || activeTab === 'user-declined-donations' || activeTab === 'user-pending-donations') {
      fetchDonations();
    } else {
      fetchProducts();
    }
  }, [email, activeTab, fetchProducts, fetchDonations]);

  const handleButtonClick = (tabName) => {
    if (activeTab !== tabName) {
      setActiveTab(tabName);
      setProducts([]);
    }
  };
  
  function openModal(item) {
    setCurrentItem(item);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openDonationModal(donation) {
    setCurrentDonation(donation);
    setIsOpenDonation(true);
  }

  function closeDonationModal() {
    setIsOpenDonation(false);
  }

  const renderProductApproved = () => (
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Date Published</th>
        </tr>
      </thead>
      <tbody>
        {products.length ? (
          products.map(product => (
            <tr key={product.id} onClick={() => openModal(product)}>
              <td><img src={product.photo} alt={product.name} className="rounded-image" /></td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>₱ {product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.createdAt.toDate().toLocaleDateString()}</td>
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

  const renderProductDeclined= () => (
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Date Published</th>
        </tr>
      </thead>
      <tbody>
        {products.length ? (
          products.map(product => (
            <tr key={product.id} onClick={() => openModal(product)}>
              <td><img src={product.photo} alt={product.name} className="rounded-image" /></td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>₱ {product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.createdAt.toDate().toLocaleDateString()}</td>
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

  const renderApprovedDonations = () => (
    <table className="donation-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Date Offered</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {donations.length ? (
            donations.map(donation => (
              <tr key={donation.id} onClick={() => openDonationModal(donation)}>
                <td><img src={donation.photo} alt={donation.name} className="rounded-image" /></td>
                <td>{donation.name}</td>
                <td>{donation.location}</td>
                <td>{donation.createdAt.toDate().toLocaleDateString()}</td>
                <td>{donation.message}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No donations yet.</td>
            </tr>
          )}
        </tbody>
      </table>
  );
  
  const renderDeclinedDonations = () => (
    <table className="donation-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Date Offered</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {donations.length ? (
            donations.map(donation => (
              <tr key={donation.id} onClick={() => openDonationModal(donation)}>
                <td><img src={donation.photo} alt={donation.name} className="rounded-image" /></td>
                <td>{donation.name}</td>
                <td>{donation.location}</td>
                <td>{donation.createdAt.toDate().toLocaleDateString()}</td>
                <td>{donation.message}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No donations yet.</td>
            </tr>
          )}
        </tbody>
      </table>
  );

  const handleApprove = async (productId) => {
    const productRef = doc(db, 'products', productId);
    try {
      await updateDoc(productRef, {
        publicationStatus: 'approved'
      });
      console.log('Product approved successfully');
      fetchProducts();
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleDecline = async (productId) => {
    const productRef = doc(db, 'products', productId);
    try {
      await updateDoc(productRef, {
        publicationStatus: 'declined'
      });
      console.log('Product declined successfully');
      fetchProducts(); 
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleApproveDonation = async (donationId) => {
    const donationRef = doc(db, 'donation', donationId);
    try {
      await updateDoc(donationRef, {
        publicationStatus: 'approved'
      });
      console.log('Donation approved successfully');
      fetchDonations();
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleDeclineDonation = async (donationId) => {
    const donationRef = doc(db, 'donation', donationId);
    try {
      await updateDoc(donationRef, {
        publicationStatus: 'declined'
      });
      console.log('Donation declined successfully');
      fetchDonations(); 
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const renderActionButtons = (productId) => (
    <td className="action-buttons">
      <button className="button-approve" onClick={(e) => { e.stopPropagation(); handleApprove(productId); }}>
        <FontAwesomeIcon icon={faCheck} />
      </button>
      <button className="button-decline" onClick={(e) => { e.stopPropagation(); handleDecline(productId); }}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </td>
  );

  const renderActionButtonsDonations = (donationId) => (
    <td className="action-buttons-donation">
      <button className="button-approve" onClick={(e) => { e.stopPropagation(); handleApproveDonation(donationId); }}>
        <FontAwesomeIcon icon={faCheck} />
      </button>
      <button className="button-decline" onClick={(e) => { e.stopPropagation(); handleDeclineDonation(donationId); }}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </td>
  );

  const renderPendingProducts = () => (
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Date Published</th>
          <th>Actions</th> 
        </tr>
      </thead>
      <tbody>
        {products.length ? (
          products.map(product => (
            <tr key={product.id} onClick={() => openModal(product)}>
              <td><img src={product.photo} alt={product.name} className="rounded-image" /></td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>₱ {product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.createdAt.toDate().toLocaleDateString()}</td>
              {renderActionButtons(product.id)}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">No pending products yet.</td>
          </tr>
        )}
      </tbody>
    </table>
  );


  const renderPendingDonations = () => (
    <table className="donation-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Date Offered</th>
            <th>Actions</th> 
          </tr>
        </thead>
        <tbody>
          {donations.length ? (
            donations.map(donation => (
              <tr key={donation.id} onClick={() => openDonationModal(donation)}>
                <td><img src={donation.photo} alt={donation.name} className="rounded-image" /></td>
                <td>{donation.name}</td>
                <td>{donation.location}</td>
                <td>{donation.createdAt.toDate().toLocaleDateString()}</td>
                {renderActionButtonsDonations(donation.id)}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No donations yet.</td>
            </tr>
          )}
        </tbody>
      </table>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'user-approved-products':
        return renderProductApproved();
      case 'user-pending-products':
        return renderPendingProducts();
      case 'user-pending-donations':
        return renderPendingDonations();
      case 'user-declined-products':
        return renderProductDeclined();
      case 'user-approved-donations':
        return renderApprovedDonations(); 
      case 'user-declined-donations':
        return renderDeclinedDonations(); 
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
          <li className={activeTab === 'user-approved-products' ? 'active' : ''}>
              <button disabled={activeTab === 'user-approved-products]'} onClick={() => handleButtonClick('user-approved-products')}>Approved Products</button>
          </li>
          <li className={activeTab === 'user-approved-donations' ? 'active' : ''}>
            <button disabled={activeTab === 'user-approved-donations'} onClick={() => handleButtonClick('user-approved-donations')}>Approved Donations</button>
          </li>
          <li className={activeTab === 'user-pending-products' ? 'active' : ''}>
            <button disabled={activeTab === 'user-pending-products'} onClick={() => handleButtonClick('user-pending-products')}>Pending Products</button>
          </li>
          <li className={activeTab === 'user-pending-donations' ? 'active' : ''}>
            <button disabled={activeTab === 'user-pending-donations'} onClick={() => handleButtonClick('user-pending-donations')}>Pending Donations</button>
          </li>
          <li className={activeTab === 'user-declined-products' ? 'active' : ''}>
            <button disabled={activeTab === 'user-declined-products'} onClick={() => handleButtonClick('user-declined-products')}>Declined Products</button>
          </li>
          <li className={activeTab === 'user-declined-donations' ? 'active' : ''}>
            <button disabled={activeTab === 'user-declined-donations'} onClick={() => handleButtonClick('user-declined-donations')}>Declined Donations</button>
          </li>
          <li className={activeTab === 'user-donation-history' ? 'active' : ''}>
            <button disabled={activeTab === 'user-donation-history'} onClick={() => handleButtonClick('user-donation-history')}>Donation History</button>
          </li>
        </ul>
      </div>
      <div className="content-display">
        {renderContent()}
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
          <img src={currentItem?.photo} alt={currentItem?.name} className="modal-image" />
          <h2>{currentItem?.name}</h2>
          <div className="modal-details">
            <p><strong>Category:</strong> {currentItem?.category}</p>
            <p><strong>Quantity:</strong> {currentItem?.quantity}</p>
            <p><strong>Date Published:</strong> {currentItem?.createdAt.toDate().toLocaleDateString()}</p>
            <p><strong>Price:</strong> {currentItem?.price}</p>
            <p><strong>Description:</strong> {currentItem?.description}</p>
            <p><strong>Seller Email:</strong> {currentItem?.seller_email}</p>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={modalIsOpenDonation}
        onRequestClose={closeDonationModal}
        contentLabel="Donation Details"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="modal-content">
          <button onClick={closeDonationModal} className="modal-close-btn">
            <FontAwesomeIcon icon={faTimes} />
          </button>
          {currentDonation && (
            <>
              <img src={currentDonation.photo} alt={currentDonation.name} className="modal-image" />
              <h2>{currentDonation.name}</h2>
              <div className="modal-details">
                <p><strong>Location:</strong> {currentDonation.location}</p>
                <p><strong>Message:</strong> {currentDonation.message}</p>
                <p><strong>Date Offered:</strong> {currentDonation.createdAt.toDate().toLocaleDateString()}</p>
                <p><strong>Donor Email:</strong> {currentDonation.donor_email}</p>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default ActivityNavbar;
