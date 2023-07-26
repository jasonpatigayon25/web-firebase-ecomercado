// import './App.css'
import Welcome from "./pages/Welcome"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ContactUs from "./pages/ContactUs"
import AboutUs from "./pages/AboutUs"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminDashboard from "./pages/AdminDashboard"
import AdminSales from "./pages/AdminSales"
import AdminDonations from "./pages/AdminDonations"
import AdminSellerRequest from "./pages/AdminSellerRequest"
import AdminUserFeedback from "./pages/AdminUserFeedback"
import AdminUserStatistics from "./pages/AdminUserStatistics"
import ProductViewer from "./pages/ProductViewer"
import UserStatistics from "./pages/UserStatistics"
import Donation from "./pages/Donation"
import UserFeedback from "./pages/UserFeedback"
import ProductMetrics from "./pages/ProductMetrics"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome/>}/>
          <Route path="/about-us" element={<AboutUs/>}/>
          <Route path="/contact-us" element={<ContactUs/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
          <Route path="/admin-sales" element={<AdminSales/>}/>
          <Route path="/admin-donations" element={<AdminDonations/>}/>
          <Route path="/admin-seller" element={<AdminSellerRequest/>}/>
          <Route path="/admin-feedback" element={<AdminUserFeedback/>}/>
          <Route path="/admin-users" element={<AdminUserStatistics/>}/>
          <Route path="/product-viewer" element={<ProductViewer/>}/>
          <Route path="/user-statistics" element={<UserStatistics/>}/>
          <Route path="/donations" element={<Donation/>}/>
          <Route path="/user-feedback" element={<UserFeedback/>}/>
          <Route path="/product-metrics" element={<ProductMetrics/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;