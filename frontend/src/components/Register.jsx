import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/register/', formData);
      // const response = await axios.post('https://prudentiaapi.onrender.com/api/register/', formData);
      // const response = await axios.post(`${import.meta.env.VITE_PRUDENTIA_API_BASE_URL}register/`, formData);
      console.log('Registration successful:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="outer-placeholder">
      <div className="login-register-box" style={{ width: '400px' }}>
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Register</h2>

          <div className="form-group mb-3">
            <input
              type="text"
              className="style-form-control"
              id="username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group mb-3">
            <input
              type="email"
              className="style-form-control"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group mb-3">
            <input
              type="password"
              className="style-form-control"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="style-button">Register</button>

          <div className="mt-3 text-center">
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;