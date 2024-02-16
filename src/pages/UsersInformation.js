import React, {useState, useEffect} from "react";
import SidebarOptions from "./SidebarOptions";
import "../css/Admin.css";
import { FaUserCheck, FaUser} from "react-icons/fa";
import { db } from '../config/firebase';
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import Modal from 'react-modal';

function UsersInformation() {

  const [totalUsers, setTotalUsers] = useState(0);
  const [recentFetchedUsers, setRecentFetchedUsers] = useState([]);
  const [weeklyRegisteredUsers, setWeeklyRegisteredUsers] = useState(0);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [userModalContent, setUserModalContent] = useState([]);

  const [isWeeklyUserModalOpen, setIsWeeklyUserModalOpen] = useState(false);
  const [weeklyUserModalContent, setWeeklyUserModalContent] = useState([]);



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
    
      getDocs(query(collection(db, 'users'), orderBy('dateRegistered', 'desc')))
      .then(snapshot => {
        const fetchedUsers = snapshot.docs.map(doc => {
          const userData = doc.data();
          return {
            email: userData.email,
            fullName: `${userData.firstName} ${userData.lastName}`,
            dateRegistered: userData.dateRegistered.toDate().toLocaleString(),
            photoUrl: userData.photoUrl, 
            address: userData.address, 
          };
        });
        setRecentFetchedUsers(fetchedUsers);
        setTotalPages(Math.ceil(fetchedUsers.length / itemsPerPage));
      })
      .catch(err => {
        console.error("Error fetching recent users: ", err);
      });

    fetchWeeklyUsers(); 
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const currentUsers = recentFetchedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const fetchUsers = async () => {
    try {
      const userSnapshot = await getDocs(collection(db, 'users'));
      const users = userSnapshot.docs.map(doc => {
        const userData = doc.data();
        return {
          photoUrl: userData.photoUrl,
          email: userData.email,
          fullName: `${userData.firstName} ${userData.lastName}`
        };
      });
      setUserModalContent(users);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };

  const fetchWeeklyUsers = async () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const q = query(
      collection(db, 'users'),
      where('dateRegistered', '>=', startOfWeek),
      where('dateRegistered', '<=', endOfWeek),
      orderBy('dateRegistered', 'desc')
    );

    try {
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setWeeklyUserModalContent([{ message: 'No registered users this week.' }]);
        setWeeklyRegisteredUsers(0);
      } else {
        const users = snapshot.docs.map(doc => {
          const userData = doc.data();
          return {
            photoUrl: userData.photoUrl,
            email: userData.email,
            fullName: `${userData.firstName} ${userData.lastName}`,
            dateRegistered: userData.dateRegistered.toDate().toLocaleString()
          };
        });
        setWeeklyUserModalContent(users);
        setWeeklyRegisteredUsers(users.length);
      }
    } catch (error) {
      console.error("Error fetching weekly registered users: ", error);
      setWeeklyRegisteredUsers(0);
    }
  };

  return (
    <div className="admin-dashboard">
      <SidebarOptions />
      <div className="admin-dashboard-content">
        <div className="admin-dashboard-cards">
          <div 
          className="admin-dashboard-card"
          onClick={() => {
            setIsUserModalOpen(true);
            fetchUsers();
          }}>
            <div className="stats-number"><span>{totalUsers}</span></div>
            <div className="stats-icon"><FaUserCheck /></div>
            <div className="stats-label">Total Users</div>
          </div>
          <div 
            className="admin-dashboard-card"
            onClick={() => {
              setIsWeeklyUserModalOpen(true);
              fetchWeeklyUsers();
            }}
          >
            <div className="stats-number"><span>{weeklyRegisteredUsers}</span></div>
            <div className="stats-icon"><FaUserCheck /></div>
            <div className="stats-label">Weekly Registered Users</div>
          </div>
        </div>
        <div className="admin-dashboard-recent-users">
        <div className="scrollable-users-list">
          {recentFetchedUsers.map((user, index) => (
            <div key={index} className="user-item">
              {user.photoUrl
                ? <img src={user.photoUrl} alt={user.fullName} />
                : <FaUser size={50} style={{ backgroundColor: 'white', borderRadius: '50%' }} />
              }
              <span>{user.email}</span>
            </div>
          ))}
        </div>
        </div>

        <div className="admin-dashboard-recent-users">
                <h1>Recent Users</h1>
                <table>
                    <thead>
                        <tr>
                          <th style={{ width: '80px' }}>Photo</th>
                            <th style={{ width: '25%' }}>Username</th>
                            <th style={{ width: '25%' }}>Name</th>
                            <th style={{ width: '40%' }}>Address</th>    
                            <th style={{ width: '25%' }}>Date Registered</th>
                        </tr>
                    </thead>
                    <tbody>
              {currentUsers.map((user, index) => (
                <tr key={index}>
                  <td style={{ width: '80px' }}>
                    {user.photoUrl 
                      ? <img src={user.photoUrl} alt="Profile" className="user-profile-pic" />
                      : <FaUser size={40} className="user-icon" />
                    }
                  </td>
                  <td style={{ width: '25%' }}>{user.email}</td>
                  <td style={{ width: '25%' }}>{user.fullName}</td>
                  <td style={{ width: '40%' }}>{user.address}</td> 
                  <td style={{ width: '25%' }}>{user.dateRegistered}</td>
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
            </div>
          </div>
          <Modal
          isOpen={isUserModalOpen}
          onRequestClose={() => setIsUserModalOpen(false)}
          contentLabel="User Modal"
          className="ReactModal__Content"
          overlayClassName="ReactModal__Overlay"
        >
          <div className="modal-header">
            <h2 className="modal-title">Users</h2>
            <button className="modal-close-button" onClick={() => setIsUserModalOpen(false)}>✕</button>
          </div>
          <div className="product-list">
            {userModalContent.map((user, index) => (
              <div key={index} className="product-card">
            {user.photoUrl
                    ? <img src={user.photoUrl} alt={user.fullName} className="product-image" />
                    : <FaUser size="3em" /> 
                  }
                <p className="product-name">{user.email}</p>
                <p className="product-category">{user.fullName}</p>
              </div>
            ))}
          </div>
        </Modal>
        <Modal
          isOpen={isWeeklyUserModalOpen}
          onRequestClose={() => setIsWeeklyUserModalOpen(false)}
          contentLabel="Weekly Registered Users"
          className="ReactModal__Content"
          overlayClassName="ReactModal__Overlay"
        >
          <div className="modal-header">
            <h2 className="modal-title">Weekly Registered Users</h2>
            <button className="modal-close-button" onClick={() => setIsWeeklyUserModalOpen(false)}>✕</button>
          </div>
          <div className="product-list">
            {weeklyUserModalContent.length === 0 || weeklyUserModalContent[0].message ? (
              <div className="no-users-message">
                {weeklyUserModalContent[0]?.message || 'No users registered this week.'}
              </div>
            ) : (
              weeklyUserModalContent.map((user, index) => (
                <div key={index} className="product-card">
                  {user.photoUrl
                    ? <img src={user.photoUrl} alt={user.fullName} className="product-image" />
                    : <FaUser size="3em" />
                  }
                  <p className="product-name">{user.email}</p>
                  <p className="product-category">{user.fullName}</p>
                  <p className="product-date">{user.dateRegistered}</p>
                </div>
              ))
            )}
          </div>
        </Modal>
        </div>
      );
    }

    export default UsersInformation;