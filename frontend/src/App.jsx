import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaHome, FaUser, FaSignOutAlt, FaList, FaBell, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import { ThemeProvider, useTheme } from './components/ThemeContext'; // Correctly import ThemeContext
import ThemeToggleIcon from './components/ThemeToggleIcon';

import TaskApp from './task_app/TaskApp';
import HomePage from './pages/HomePage';
import ReturnsPage from './pages/ReturnsPage';
import PrReviewsPage from './pages/PrReviewsPage';
import BreachReviewsPage from './pages/BreachReviewsPage';
import ProfilePage from './pages/ProfilePage';
import InfoPage from './pages/InfoPage';
import ContactPage from './pages/ContactPage';

// ContentContainer handles the routes and theme class for the content area
const ContentContainer = () => {
  const { isDarkTheme } = useTheme(); // Access the current theme state

  return (
    <div className={`content-area ${isDarkTheme ? 'dark-theme' : ''}`}>
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
  );
};

// AppContent is now responsible for applying theme to the main app container
const AppContent = () => {
  const { isDarkTheme } = useTheme(); // Access the theme state here

  return (
    <div id="app-container" className={`${isDarkTheme ? 'dark-theme' : ''}`}>
      
      {/* top navbar */}
      <nav className="navbar-top">
        <span className="website-header">Prudentia</span>
        <div className="top-bottom-navbar-icons">
          <Link to="/logout" className="nav-icon" data-tooltip="Logout"> <FaSignOutAlt size={24} /> </Link>
          <ThemeToggleIcon />
        </div>
      </nav>

      {/* bottom navbar */}
      <nav className="navbar-bottom">
        <div className="top-bottom-navbar-icons">
          <Link to="/profile" className="nav-icon" data-tooltip="Profile"> <FaUser size={24} /> </Link>
          <Link to="/info" className="nav-icon" data-tooltip="Info"> <FaInfoCircle size={24} /> </Link>
          <Link to="/contact" className="nav-icon" data-tooltip="Contact"> <FaEnvelope size={24} /> </Link>
        </div>
        <span className="website-footer">&copy; 2024 Prudentia. All Rights Reserved.</span>
      </nav>

      {/* left navbar */}
      <nav className="navbar-left">
        <div className="nav-icon hidden-placeholder"></div>
        <Link to="/home" className="nav-icon" data-tooltip="Home"> <FaHome size={24} /> </Link>
        <Link to="/returns" className="nav-icon" data-tooltip="Returns"> <FaList size={24} /> </Link>
        <Link to="/pr-reviews" className="nav-icon" data-tooltip="PR Reviews"> <FaMagnifyingGlass size={24} /> </Link>
        <Link to="/breach-reviews" className="nav-icon" data-tooltip="Breach Reviews"> <FaBell size={24} /> </Link>
      </nav>

      {/* right navbar */}
      <nav className="navbar-right">
        <div className="nav-icon hidden-placeholder"></div>
      </nav>

      {/* content container */}
      <ContentContainer />
    </div>
  );
};

// App now wraps everything inside ThemeProvider and routes are handled within
const App = () => {
  return (
    <ThemeProvider> {/* Ensure ThemeProvider wraps everything */}
      <Router>
        <AppContent /> {/* All theme-dependent components are inside AppContent */}
      </Router>
    </ThemeProvider>
  );
};

export default App;


