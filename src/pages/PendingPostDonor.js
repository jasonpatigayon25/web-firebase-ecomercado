import React, { useState, useEffect } from "react";
import SidebarOptions from "./SidebarOptions";
import "../css/Admin.css";
import { db } from '../config/firebase';
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function PendingPostDonor() {
  const [donations, setDonations] = useState([]);
  const [totalDonation, setTotalDonation] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);

  const [approvedDonations, setApprovedDonations] = useState(0);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handleOpenModal = (donation) => {
    setSelectedDonation(donation);
    setModalVisible(true);
  }

  const handleCloseModal = () => {
    setSelectedDonation(null);
    setModalVisible(false);
  }

  useEffect(() => {
    const fetchDonations = async () => {
      const donationCollection = collection(db, 'donation');
      const donationQuery = query(donationCollection, orderBy('createdAt', 'desc'));
      const donationData = await getDocs(donationQuery);
      const donations = donationData.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        photo: doc.data().photo,
        location: doc.data().location,
        message: doc.data().message,
        donor_email: doc.data().donor_email,
        createdAt: doc.data().createdAt
      }));
      setDonations(donations);
      setTotalDonation(donationData.size);
    };
  
    const fetchApprovedDonations = async () => {
      const donationCollection = collection(db, 'donation');
      const approvedDonationsQuery = query(donationCollection, where('isDonated', '==', true));
      try {
        const querySnapshot = await getDocs(approvedDonationsQuery);
        setApprovedDonations(querySnapshot.size); 
      } catch (error) {
        console.error("Error fetching approved donations: ", error);
      }
    };

    fetchDonations();
    fetchApprovedDonations();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(donations.length / itemsPerPage);
  const currentDonations = donations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const donationChartData = [
    { name: 'Total Donations', value: totalDonation },
    { name: 'Approved Donations', value: approvedDonations },
  ];

  const [isStatsCardHovered, setIsStatsCardHovered] = useState(false);

  return (
    <div className="admin-dashboard">
      <SidebarOptions />
      <div className="admin-dashboard-content">
      <div className="admin-dashboard-cards">
      <div 
          className="admin-dashboard-card"
          onMouseEnter={() => setIsStatsCardHovered(true)}
          onMouseLeave={() => setIsStatsCardHovered(false)}
        >
        <h1 className="statistics-title" style={{ color: isStatsCardHovered ? '#008000' : '#ffffff' }}>Donation Overview</h1>
          <BarChart width={600} height={300} data={donationChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#4CAF50" />
          </BarChart>
        </div>
        </div>
        <div className="admin-dashboard-recent-users">
          <h2>Total Donations: {totalDonation}</h2>
          <table className="admin-dashboard-recent-users">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>Image</th>
                <th style={{ width: '100px' }}>Product</th>
                <th style={{ width: '100px' }}>Donor</th>
                <th style={{ width: '300px' }}>Location</th>
                <th style={{ width: '80px' }}>View</th>
              </tr>
            </thead>
            <tbody>
              {currentDonations.map((donation, index) => (
                <tr key={index}>
                  <td className="user-image" style={{ width: '80px' }}> 
                    <img src={donation.photo} alt="Donation" width="50" height="50"/>
                  </td>
                  <td style={{ width: '100px' }}>{donation.name}</td>
                  <td style={{ width: '100px' }}>{donation.donor_email}</td>
                  <td style={{ width: '300px' }}>{donation.location}</td>
                  <button  className="view-link" onClick={() => handleOpenModal(donation)} style={{ cursor: 'pointer' }}>
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
            <DonationDetailsModal donation={selectedDonation} onClose={handleCloseModal} />
          )}
        </div>
      </div>
    </div>
  );
}

function DonationDetailsModal({ donation, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={donation.photo} alt={donation.name} width="100%" />
        <h2 style={{ color: 'black' }}>{donation.name}</h2>
        <p>Donor Email: {donation.donor_email}</p>
        <p>Location: {donation.location}</p>
        <p>Message: {donation.message}</p>
        <button className="modal-close-button" onClick={onClose}>✕</button>
      </div>
    </div>
  );
}

export default PendingPostDonor;
