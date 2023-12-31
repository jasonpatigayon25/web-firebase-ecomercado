// import './App.css'
import Welcome from "./pages/Welcome"
import Login from "./pages/Login"
//import Signup from "./pages/Signup"           <Route path="/signup" element={<Signup/>}/>
import ContactUs from "./pages/ContactUs"
import AboutUs from "./pages/AboutUs"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminDashboard from "./pages/AdminDashboard"
import UserStatistics from "./pages/UserStatistics"
import Donation from "./pages/Donation"
import UserFeedback from "./pages/UserFeedback"
import ProductMetrics from "./pages/ProductMetrics"
import ForgotPassword from "./pages/ForgotPassword"
import Notification from "./pages/Notification"
import SwitchAccount from "./pages/SwitchAccount"
import AdminChangePassword from "./pages/AdminChangePassword"
import AdminProfile from "./pages/AdminProfile"
import BanUser from "./pages/BanUser"

import { auth } from "./config/firebase"; 
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function AuthRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {

      if (user && (location.pathname === '/' || location.pathname === '/login')) {
        navigate('/admin-dashboard');
      }
    });

    return () => unsubscribe();
  }, [navigate, location.pathname]);

  return null;
}

function App() {
  
  return (
    <div className="App">
      <Router>
      <AuthRedirect />
        <Routes>
          <Route path="/" element={<Welcome />}/>
          <Route path="/about-us" element={<AboutUs/>}/>
          <Route path="/contact-us" element={<ContactUs/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
          <Route path="/user-statistics" element={<UserStatistics/>}/>
          <Route path="/donations" element={<Donation/>}/>
          <Route path="/user-feedback" element={<UserFeedback/>}/>
          <Route path="/product-metrics" element={<ProductMetrics/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/delete-profile" element={<BanUser/>}/>
          <Route path="/notification" element={<Notification/>}/>
          <Route path="/switch-account" element={<SwitchAccount/>}/>
          <Route path="/change-password" element={<AdminChangePassword/>}/>
          <Route path="/admin-profile" element={<AdminProfile/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;