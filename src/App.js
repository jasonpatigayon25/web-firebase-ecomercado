// import './App.css'
import Welcome from "./pages/Welcome"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ContactUs from "./pages/ContactUs"
import AboutUs from "./pages/AboutUs"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminDashboard from "./pages/AdminDashboard"
import ProductViewer from "./pages/ProductViewer"
import UserStatistics from "./pages/UserStatistics"
import Donation from "./pages/Donation"
import UserFeedback from "./pages/UserFeedback"
import ProductMetrics from "./pages/ProductMetrics"
import ForgotPassword from "./pages/ForgotPassword"
import EditProfile from "./pages/EditProfile"
import DeleteProfile from "./pages/DeleteProfile"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />}/>
          <Route path="/about-us" element={<AboutUs/>}/>
          <Route path="/contact-us" element={<ContactUs/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
          <Route path="/product-viewer" element={<ProductViewer/>}/>
          <Route path="/user-statistics" element={<UserStatistics/>}/>
          <Route path="/donations" element={<Donation/>}/>
          <Route path="/user-feedback" element={<UserFeedback/>}/>
          <Route path="/product-metrics" element={<ProductMetrics/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/edit-profile" element={<EditProfile/>}/>
          <Route path="/delete-profile" element={<DeleteProfile/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;