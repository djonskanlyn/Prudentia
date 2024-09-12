import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the access token exists in localStorage
    const accessToken = localStorage.getItem('access_token');

    // Redirect to login if the token doesn't exist
    if (!accessToken) {
      navigate('/login');
    }
  }, [navigate]);

  return children;  // If the user is authenticated, render the children components
};

export default ProtectedRoute;