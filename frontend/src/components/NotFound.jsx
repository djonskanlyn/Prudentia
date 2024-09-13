import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="outer-placeholder">
      <div className="login-register-box" style={{ width: '800px' }}>
        <h2>404 - Page Not Found</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/home">Go Back to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;