// import './App.css'
import Welcome from "./pages/Welcome"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ContactUs from "./pages/ContactUs"
import AboutUs from "./pages/AboutUs"
import Campaign from "./pages/Campaign"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Donate from "./pages/Donate"
import Seller from "./pages/Seller"
import VerifiedSeller from "./pages/VerifiedSeller"
import EcoReward from "./pages/EcoReward"
import Wishlist from "./pages/Wishlist"
import DeleteRecord from "./pages/DeleteRecord"
import ChangePassword from "./pages/ChangePassword"
import OrderHistory from "./pages/OrderHistory"
import ShoppingCart from "./pages/ShoppingCart"
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminDashboard from "./pages/AdminDashboard"
import AdminSales from "./pages/AdminSales"

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
          <Route path="/donate" element={<Donate/>}/>
          <Route path="/campaign" element={<Campaign/>}/>
          <Route path="/shopping-cart" element={<ShoppingCart/>}/>
          <Route path="/seller" element={<Seller/>}/>
          <Route path="/verified-seller" element={<VerifiedSeller/>}/>
          <Route path="/eco-lover-rewards" element={<EcoReward/>}/>
          <Route path="/wishlist" element={<Wishlist/>}/>
          <Route path="/delete-record" element={<DeleteRecord/>}/>
          <Route path="/change-password" element={<ChangePassword/>}/>
          <Route path="/order-history" element={<OrderHistory/>}/>
          <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
          <Route path="/admin-sales" element={<AdminSales/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;