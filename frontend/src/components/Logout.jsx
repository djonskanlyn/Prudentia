import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear tokens from localStorage when the component is mounted
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    // Redirect to the login page after logout
    navigate('/login');
  }, [navigate]);

  return (
    <div className="text-center">
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;


