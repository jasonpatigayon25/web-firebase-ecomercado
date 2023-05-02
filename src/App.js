import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route, Form } from 'react-router-dom';
import Home from "./pages/Home";
import Login from './pages/Login';
import Registration from './pages/Registration';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <NavBar />
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registration />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;