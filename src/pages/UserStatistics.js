import React, {useState, useEffect} from "react";
import SidebarOptions from "./SidebarOptions";
import "../css/Admin.css";
import { FaUserCheck } from "react-icons/fa";
import { db } from '../config/firebase';
import { collection, getDocs, limit } from "firebase/firestore";

const weeklyRegisteredUsers = 0;

function UserStatistics() {

  const [totalUsers, setTotalUsers] = useState(0);
  const [recentFetchedUsers, setRecentFetchedUsers] = useState([]);

  useEffect(() => {

    getDocs(collection(db, 'users'))
      .then(snapshot => {
        setTotalUsers(snapshot.size);
      })
      .catch(err => {
        console.error("Error fetching products: ", err);
      });
    
      getDocs(collection(db, 'users'), limit(20))
      .then(snapshot => {
          const fetchedUsers = snapshot.docs.map(doc => ({
              user: doc.data().user,
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,
              dateRegistered: doc.data().dateRegistered || "--"
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
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Date Registered</th>
                        </tr>
                    </thead>
                      <tbody>
                        {recentFetchedUsers.map((user, index) => (
                          <tr key={index}>
                              <td>{user.user}</td>
                              <td>{user.firstName}</td>
                              <td>{user.lastName}</td>
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
