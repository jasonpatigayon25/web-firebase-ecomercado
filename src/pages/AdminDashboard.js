import React, { useState, useEffect } from "react";
import { FaUserCheck, FaBoxOpen, FaShoppingBag, FaHeart } from "react-icons/fa";
import SidebarOptions from "./SidebarOptions";
import { db } from '../config/firebase';
import { collection, getDocs, limit} from "firebase/firestore";
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

      getDocs(collection(db, 'users'), limit(20))
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
        <div className="admin-dashboard-header">
          <h2>ADMIN DASHBOARD</h2>
        </div>
        <div className="admin-dashboard-cards">
          <div className="admin-dashboard-card">
            <h2 className="title-label"> Total Users</h2>
            <p className="stats"> <FaUserCheck style={{ color: 'black' }} /> {totalUsers}</p>
          </div>
          <div className="admin-dashboard-card">
            <h2 className="title-label"> Total Product Published</h2>
            <p className="stats"> <FaBoxOpen style={{ color: 'black' }} /> {totalProducts}</p>
          </div>
          <div className="admin-dashboard-card">
            <h2 className="title-label"> Total Product Sold</h2>
            <p className="stats"> <FaShoppingBag style={{ color: 'black' }} /> 0 </p>
          </div>
          <div className="admin-dashboard-card center-card">
            <h2 className="title-label"> Total Donations</h2>
            <p className="stats"> <FaHeart style={{ color: 'black' }} />  {totalDonation}</p>
          </div>
        </div>

        <div className="admin-dashboard-recent-users mb-4 shadow">
                <h1>Recent Users</h1>
                <div className="divider"></div>
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
