import React from "react";
import { FaUserCheck, FaBoxOpen, FaShoppingBag, FaHeart } from "react-icons/fa";
import SidebarOptions from "./SidebarOptions";
import "../css/Admin.css";

const recentUsers = [
  {username: 'Username1', date: '2023-06-01'},
  {username: 'Username2', date: '2023-05-25'},
  {username: 'Username3', date: '2023-05-18'},
  {username: 'Username4', date: '2023-05-16'},
  {username: 'Username5', date: '2023-05-10'},
  {username: 'Username6', date: '2023-05-05'},
  {username: 'Username7', date: '2023-04-29'},
  {username: 'Username8', date: '2023-04-20'},
  {username: 'Username9', date: '2023-04-12'},
  {username: 'Username10', date: '2023-04-03'}
];

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <SidebarOptions />
      <div className="admin-dashboard-content">
        <h2>ADMIN DASHBOARD</h2> 
        <div className="divider"></div>
        <div className="admin-dashboard-cards">
          <div className="admin-dashboard-card">
            <h2 className="title-label"> Total Users/Customers</h2>
            <p className="stats"> <FaUserCheck style={{ color: 'black' }} /> 0</p>
          </div>
          <div className="admin-dashboard-card">
            <h2 className="title-label"> Total Product Published</h2>
            <p className="stats"> <FaBoxOpen style={{ color: 'black' }} /> 0</p>
          </div>
          <div className="admin-dashboard-card">
            <h2 className="title-label"> Total Product Sold</h2>
            <p className="stats"> <FaShoppingBag style={{ color: 'black' }} /> 0</p>
          </div>
          <div className="admin-dashboard-card center-card">
            <h2 className="title-label"> Total Donors</h2>
            <p className="stats"> <FaHeart style={{ color: 'black' }} /> 0</p>
          </div>
        </div>

        <div className="admin-dashboard-recent-users mb-4 shadow">
          <h1>Recent Users</h1>
          <div className="divider"></div>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Date Registered</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
