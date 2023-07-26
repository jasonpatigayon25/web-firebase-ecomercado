import React from "react";
import SidebarOptions from "./SidebarOptions";
import "../css/Admin.css";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

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

  return (
    <div className="admin-dashboard">
      <SidebarOptions />
      <div className="admin-dashboard-content">
        <h2>DONATIONS</h2>
        <div className="divider"></div>
        <div className="admin-dashboard-recent-users mb-4 shadow">
          <h2>Total Donors: {donors.length}</h2>
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
                    <Link to={`/view-product/${donor.product}`}>
                      <FaEye color="#05652D" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Donation;
