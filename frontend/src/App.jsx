import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, } from 'react-router-dom';
import { FaHome, FaUser, FaSignOutAlt, FaAdjust, FaList, FaBell, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import 'bootstrap/dist/css/bootstrap.min.css';

import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import TaskApp from './task_app/TaskApp';

import HomePage from './pages/HomePage';
import ReturnsPage from './pages/ReturnsPage';
import PrReviewsPage from './pages/PrReviewsPage';
import BreachReviewsPage from './pages/BreachReviewsPage';
import ProfilePage from './pages/ProfilePage';
import InfoPage from './pages/InfoPage';
import ContactPage from './pages/ContactPage';

const App = () => {
  
  return (
    <Router>
      <div id="app-container" className="vh-100 d-flex flex-column">
        
        {/* top navbar */}
        <nav className="navbar-top d-flex align-items-center justify-content-between bg-light">
          <span className="website-header">Prudentia</span>
          <div className="top-navbar-icons d-flex">
                <Link to="/logout" className="nav-icon" data-tooltip="Logout"><FaSignOutAlt size={24} /></Link>
                <Link to="#" className="nav-icon" data-tooltip="Theme"><FaAdjust size={24} /></Link>
          </div>
        </nav>

        {/* left navbar */}
        <nav className="navbar-left d-flex flex-column bg-light">
              <div className="nav-icon hidden-placeholder"></div>
              <Link to="/home" className="nav-icon" data-tooltip="Home"><FaHome size={24} /></Link>
              <Link to="/returns" className="nav-icon" data-tooltip="Returns"><FaList size={24} /></Link>
              <Link to="/pr-reviews" className="nav-icon" data-tooltip="PR Reviews"><FaMagnifyingGlass size={24} /></Link>
              <Link to="/breach-reviews" className="nav-icon" data-tooltip="Breach Reviews"><FaBell size={24} /></Link>
        </nav>

        {/* right navbar */}
        <nav className="navbar-right d-flex flex-column bg-light"></nav>

        {/* bottom navbar */}
        <nav className="navbar-bottom d-flex bg-light">
              <Link to="/profile" className="nav-icon" data-tooltip="Profile"><FaUser size={24} /></Link>
              <Link to="/info" className="nav-icon" data-tooltip="Info"><FaInfoCircle size={24} /></Link>
              <Link to="/contact" className="nav-icon" data-tooltip="Contact"><FaEnvelope size={24} /></Link>
        </nav>

        {/* content container */}
        <div className="content-container container-fluid flex-grow-1">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="main-content p-3 bg-white text-dark text-center">
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/tasks" element={<ProtectedRoute> <TaskApp /> </ProtectedRoute>} />
                  <Route path="/home" element={<ProtectedRoute> <HomePage /> </ProtectedRoute>} />
                  <Route path="/returns" element={<ProtectedRoute> <ReturnsPage /> </ProtectedRoute>} />
                  <Route path="/pr-reviews" element={<ProtectedRoute> <PrReviewsPage /> </ProtectedRoute>} />
                  <Route path="/breach-reviews" element={<ProtectedRoute> <BreachReviewsPage /> </ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute> <ProfilePage /> </ProtectedRoute>} />
                  <Route path="/info" element={<ProtectedRoute> <InfoPage /> </ProtectedRoute>} />
                  <Route path="/contact" element={<ProtectedRoute> <ContactPage /> </ProtectedRoute>} />
                </Routes>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Router>
  );
};

export default App;

