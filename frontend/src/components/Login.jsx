import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/token/', formData);
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      console.log('Login successful:', response.data);
    } catch (error) {
      setError('Invalid username or password');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="bg-light p-4 rounded shadow" style={{ width: '400px' }}>
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Login</h2>
          {error && <div className="alert alert-danger text-center">{error}</div>}
          
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-outline-secondary">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;