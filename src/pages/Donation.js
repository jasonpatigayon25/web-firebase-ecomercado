import React,{useState, useEffect} from "react";
import SidebarOptions from "./SidebarOptions";
import "../css/Admin.css";
import { FaEye } from "react-icons/fa";
import { db } from '../config/firebase';
import { collection, getDocs } from "firebase/firestore";

function Donation() {
  const donors = [
    { username: 'Username1', date: '7/6/23', product: 'T-shirts' },
    { username: 'Username2', date: '7/6/23', product: 'Bags' },
    { username: 'Username3', date: '7/6/23', product: 'Clothes' },
    { username: 'Username4', date: '7/6/23', product: 'Old Compute' },
    { username: 'Username5', date: '7/6/23', product: 'Dresses' },
    { username: 'Username6', date: '7/6/23', product: 'TV' },
    { username: 'Username7', date: '7/6/23', product: 'Cabinet' },
    { username: 'Username8', date: '7/6/23', product: 'Furnitures' },
    { username: 'Username9', date: '7/6/23', product: 'Shirts' },
  ];

  const [totalDonation, setTotalDonation] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);

  const handleOpenModal = (donor) => {
    setSelectedDonor(donor);
    setModalVisible(true);
  }

  const handleCloseModal = () => {
    setSelectedDonor(null);
    setModalVisible(false);
  }

  useEffect(() => {

    getDocs(collection(db, 'donation'))
      .then(snapshot => {
        setTotalDonation(snapshot.size);
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
          <h2>DONATION REPORTS</h2>
        </div>
        <div className="admin-dashboard-recent-users mb-4 shadow">
          <h2>Total Donations: {totalDonation}</h2>
          <div className="divider"></div>
          <table className="donation-table">
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Username</th>
                <th>Date</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor, index) => (
                <tr key={index}>
                  <td className="user-image">
                    <img src="https://via.placeholder.com/150" alt="User" />
                  </td>
                  <td>{donor.product}</td>
                  <td>{donor.username}</td>
                  <td>{donor.date}</td>
                  <td>
                  <FaEye onClick={() => handleOpenModal(donor)} style={{ cursor: 'pointer', color: '#05652D' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isModalVisible && (
          <DonorDetailsModal donor={selectedDonor} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
}

function DonorDetailsModal({ donor, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{donor.product}</h2>
        <p>Donor Username: {donor.username}</p>
        <p>Date: {donor.date}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Donation;
