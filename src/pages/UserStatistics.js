import React from "react";
import SidebarOptions from "./SidebarOptions";
import "../css/Admin.css";
import { FaUserCheck } from "react-icons/fa";

const totalUsers = 0; 
const weeklyRegisteredUsers = 0;

const recentUsers = [
  { username: 'Username1', date: '2023-06-01' },
  { username: 'Username2', date: '2023-05-25' },
  { username: 'Username3', date: '2023-05-18' },
  { username: 'Username4', date: '2023-05-16' },
  { username: 'Username5', date: '2023-05-10' },
  { username: 'Username6', date: '2023-05-05' },
  { username: 'Username7', date: '2023-04-29' },
  { username: 'Username8', date: '2023-04-20' },
  { username: 'Username9', date: '2023-04-12' },
  { username: 'Username10', date: '2023-04-03' }
];

function UserStatistics() {
  return (
    <div className="admin-dashboard">
      <SidebarOptions />
      <div className="admin-dashboard-content">
        <div className="admin-dashboard-header">
          <h2>USER STATISTICS</h2>
        </div>
        <div className="admin-dashboard-cards">
          <div className="admin-dashboard-card">
            <h2 className="title-label"> Total Users</h2>
            <p className="stats"> <FaUserCheck style={{ color: 'black' }} /> {totalUsers}</p>
          </div>
          <div className="admin-dashboard-card">
            <h2 className="title-label"> Weekly Registered Users</h2>
            <p className="stats"> <FaUserCheck style={{ color: 'black' }} /> {weeklyRegisteredUsers}</p>
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

export default UserStatistics;
