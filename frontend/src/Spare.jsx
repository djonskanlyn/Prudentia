import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { FaHome, FaUser, FaSignOutAlt, FaAdjust, FaList, FaBell, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/Login';
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
      <div id="app-container">

        {/* top navbar */}
        <nav className="navbar-top">
          <span className="website-header">Prudentia</span>
          <div className="top-navbar-icons">
            <a href="#" className="nav-icon" data-tooltip="Logout"><FaSignOutAlt size={24} /></a>
            <a href="#" className="nav-icon" data-tooltip="Theme"><FaAdjust size={24} /></a>
          </div>
        </nav>

        {/* left navbar */}
        <nav className="navbar-left">
          <a href="#" className="nav-icon hidden-placeholder"></a>
          <Link to="/home" className="nav-icon" data-tooltip="Home"><FaHome size={24} /></Link>
          <Link to="/returns" className="nav-icon" data-tooltip="Returns"><FaList size={24} /></Link>
          <Link to="/pr-reviews" className="nav-icon" data-tooltip="PR Reviews"><FaMagnifyingGlass size={24} /></Link>
          <Link to="/breach-reviews" className="nav-icon" data-tooltip="Breach Reviews"><FaBell size={24} /></Link>
        </nav>

        {/* right navbar */}
        <nav className="navbar-right"></nav>

        {/* bottom navbar */}
        <nav className="navbar-bottom">
          <Link to="/profile" className="nav-icon" data-tooltip="Profile"><FaUser size={24} /></Link>
          <Link to="/info" className="nav-icon" data-tooltip="Info"><FaInfoCircle size={24} /></Link>
          <Link to="/contact" className="nav-icon" data-tooltip="Contact"><FaEnvelope size={24} /></Link>
        </nav>

        {/* content container */}
        <div className="content-container">
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/tasks" element={<TaskApp />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/returns" element={<ReturnsPage />} />
              <Route path="/pr-reviews" element={<PrReviewsPage />} />
              <Route path="/breach-reviews" element={<BreachReviewsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/info" element={<InfoPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </div>
        </div>

      </div>
    </Router>
  );
};

export default App;