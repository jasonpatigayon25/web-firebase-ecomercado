// import './App.css'
import Welcome from "./pages/Welcome"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ChangePassword from "./pages/ChangePassword"
import ContactUs from "./pages/ContactUs"
import AboutUs from "./pages/AboutUs"
import SkillsAssessment from "./pages/SkillsAssessment"
import SkillDevelopment from "./pages/SkillDevelopment"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


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
          <Route path="/skills-assessment" element={<SkillsAssessment/>}/>
          <Route path="/skill-development" element={<SkillDevelopment/>}/>
          <Route path="/changepassword" element={<ChangePassword/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;