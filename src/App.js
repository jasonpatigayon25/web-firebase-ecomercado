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
          <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
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