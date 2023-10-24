import React,{useState, useEffect} from "react";
import SidebarOptions from "./SidebarOptions";
import "../css/Admin.css";
import { FaEye } from "react-icons/fa";
import { db } from '../config/firebase';
import { collection, getDocs } from "firebase/firestore";

function Donation() {
  const [donations, setDonations] = useState([]);

  const [totalDonation, setTotalDonation] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);

  const handleOpenModal = (donation) => {
    setSelectedDonation(donation);
    setModalVisible(true);
  }

  const handleCloseModal = () => {
    setSelectedDonation(null);
    setModalVisible(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      const donationCollection = collection(db, 'donation');
      const donationData = await getDocs(donationCollection);
      const donations = donationData.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        photo: doc.data().photo,
        location: doc.data().location,
        message: doc.data().description
      }));
      setDonations(donations);
      setTotalDonation(donationData.size);
    };
    fetchData();
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
                <th>Image</th>
                <th>Product</th>
                <th>Location</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <tr key={index}>
                  <td className="user-image">
                    <img src={donation.photo} alt="Donation" width="50" height="50"/>
                  </td>
                  <td>{donation.name}</td>
                  <td>{donation.location}</td>
                  <td>
                    <FaEye onClick={() => handleOpenModal(donation)} style={{ cursor: 'pointer', color: '#05652D' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isModalVisible && (
          <DonationDetailsModal donation={selectedDonation} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
}

function DonationDetailsModal({ donation, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={donation.photo} alt={donation.name} width="100%" />
        <h2>{donation.name}</h2>
        <p>Price: ₱{donation.price}</p>
        <p>Location: {donation.location}</p>
        <p>Message: {donation.message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Donation;
