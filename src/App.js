// import './App.css'
import Welcome from "./pages/Welcome"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ContactUs from "./pages/ContactUs"
import AboutUs from "./pages/AboutUs"
import Campaign from "./pages/Campaign"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart"
import Donate from "./pages/Donate"
import Seller from "./pages/Seller"
import 'bootstrap/dist/css/bootstrap.min.css';
import VerifiedSeller from "./pages/VerifiedSeller"


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
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/seller" element={<Seller/>}/>
          <Route path="/verified-seller" element={<VerifiedSeller/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;