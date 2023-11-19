import React, { useState, useEffect } from "react";
import { FaUserCheck, FaBoxOpen, FaShoppingBag, FaHeart } from "react-icons/fa";
import SidebarOptions from "./SidebarOptions";
import { db } from '../config/firebase';
import { collection, getDocs, limit, orderBy, query} from "firebase/firestore";
import "../css/Admin.css";

function AdminDashboard() {

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalDonation, setTotalDonation] = useState(0);
  const [recentFetchedUsers, setRecentFetchedUsers] = useState([]);

  useEffect(() => {
    getDocs(collection(db, 'users'))
      .then(snapshot => {
        setTotalUsers(snapshot.size);
      })
      .catch(err => {
        console.error("Error fetching users: ", err);
      });

    getDocs(collection(db, 'products'))
      .then(snapshot => {
        setTotalProducts(snapshot.size);
      })
      .catch(err => {
        console.error("Error fetching products: ", err);
      });

      getDocs(collection(db, 'donation'))
      .then(snapshot => {
        setTotalDonation(snapshot.size);
      })
      .catch(err => {
        console.error("Error fetching donation: ", err);
      });

      getDocs(query(collection(db, 'users'), orderBy('dateRegistered', 'desc'), limit(20)))
        .then(snapshot => {
            const fetchedUsers = snapshot.docs.map(doc => ({
                email: doc.data().email,
                fullName: `${doc.data().firstName} ${doc.data().lastName}`,
                dateRegistered: doc.data().dateRegistered
            }));
            setRecentFetchedUsers(fetchedUsers);
        })
        .catch(err => {
            console.error("Error fetching recent users: ", err);
        });

  }, []);

  return (
    <div className="admin-dashboard">
      <SidebarOptions />
      <div className="admin-dashboard-content">
        <div className="admin-dashboard-cards">
          <div className="admin-dashboard-card">
            <div className="stats-number"><span>{totalUsers}</span></div>
            <div className="stats-icon"><FaUserCheck /></div>
            <div className="stats-label">Total Users</div>
          </div>
          <div className="admin-dashboard-card">
            <div className="stats-number"><span>{totalProducts}</span></div>
            <div className="stats-icon"><FaBoxOpen /></div>
            <div className="stats-label">Total Product Published</div>
          </div>
          <div className="admin-dashboard-card">
            <div className="stats-number"><span>0</span></div>
            <div className="stats-icon"><FaShoppingBag /></div>
            <div className="stats-label">Total Product Sold</div>
          </div>
          <div className="admin-dashboard-card">
            <div className="stats-number"><span>{totalDonation}</span></div>
            <div className="stats-icon"><FaHeart /></div>
            <div className="stats-label">Total Donations</div>
          </div>
        </div>

        <div className="admin-dashboard-recent-users">
                <h1>Recent Users</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Email Address</th>
                            <th>Name</th>
                            <th>Date Registered</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentFetchedUsers.map((user, index) => (
                            <tr key={index}>
                                <td>{user.email}</td>
                                <td>{user.fullName}</td>
                                <td>{user.dateRegistered}</td>
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
