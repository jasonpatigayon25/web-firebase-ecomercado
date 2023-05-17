import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import TestingPage from './pages/TestingPage';
import Login from './pages/Login';
import Registration from './pages/Registration';


function App() {
  return (
    <div className='App'>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/testingpage' element={<TestingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Registration />} />  
      </Routes>
    </div>
  );
}

export default App;