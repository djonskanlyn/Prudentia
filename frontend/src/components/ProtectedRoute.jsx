import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);  // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem('access_token');

      // Simulate an async authentication check
      if (!accessToken) {
        navigate('/login');  // Redirect to login if no token
      } else {
        setLoading(false);  // Stop loading once authenticated
      }
    };

    checkAuth();  // Check authentication
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;  // Display loading indicator while checking authentication
  }

  return children;  // If authenticated, render the children components
};

export default ProtectedRoute;