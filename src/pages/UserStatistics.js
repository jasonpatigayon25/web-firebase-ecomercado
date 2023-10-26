import React, {useState, useEffect} from "react";
import SidebarOptions from "./SidebarOptions";
import "../css/Admin.css";
import { FaUserCheck } from "react-icons/fa";
import { db } from '../config/firebase';
import { collection, getDocs, limit } from "firebase/firestore";
import { where, query, orderBy } from "firebase/firestore";

function UserStatistics() {

  const [totalUsers, setTotalUsers] = useState(0);
  const [recentFetchedUsers, setRecentFetchedUsers] = useState([]);
  const [weeklyRegisteredUsers, setWeeklyRegisteredUsers] = useState(0);

  useEffect(() => {
    getDocs(collection(db, 'users'))
      .then(snapshot => {
        setTotalUsers(snapshot.size);
      })
      .catch(err => {
        console.error("Error fetching products: ", err);
      });

    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (dayOfWeek - 1));
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const q = query(
      collection(db, 'users'),
      where('dateRegistered', '>=', startOfWeek),
      where('dateRegistered', '<=', endOfWeek)
    );

    getDocs(q)
      .then(snapshot => {
        setWeeklyRegisteredUsers(snapshot.size);
      })
      .catch(err => {
        console.error("Error fetching weekly registered users: ", err);
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
            <div className="stats-number"><span>{weeklyRegisteredUsers}</span></div>
            <div className="stats-icon"><FaUserCheck /></div>
            <div className="stats-label">Weekly Registered Users</div>
          </div>
        </div>

        <div className="admin-dashboard-recent-users mb-4 shadow">
                <h1>Recent Users</h1>
                <div className="divider"></div>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
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

export default UserStatistics;
