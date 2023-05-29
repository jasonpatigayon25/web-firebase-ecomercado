// import './App.css'
import Welcome from "./pages/Welcome"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ChangePassword from "./pages/ChangePassword"
import DeleteRecord from "./pages/DeleteRecord"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/changepassword" element={<ChangePassword/>}/>
          <Route path="/deleterecord" element={<DeleteRecord/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;