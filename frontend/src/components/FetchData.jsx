import axios from 'axios';

// Create an axios instance with a base URL
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_PRUDENTIA_API_BASE_URL,
  //baseURL: 'https://prudentiaapi.onrender.com/api/',
  //baseURL: 'http://localhost:8000/api/',
});

// Function to refresh the access token
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  if (refreshToken) {
    try {
      const response = await apiClient.post('token/refresh/', {
        refresh: refreshToken,
      });
      localStorage.setItem('access_token', response.data.access);  // Store new access token
      return response.data.access;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  }
  return null;
};

// Request interceptor to include token in headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration and retry failed requests
apiClient.interceptors.response.use(
  (response) => {
    return response;  // If the response is successful, just return it
  },
  async (error) => {
    const originalRequest = error.config;

    // If a 401 error occurs, try to refresh the token and retry the request
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;  // Prevent infinite loops
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        // Update the Authorization header and retry the request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);  // Retry the original request
      }
    }

    return Promise.reject(error);
  }
);

// Generic function to fetch data using the axios instance
export const fetchData = async (url) => {
  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to handle PUT requests
export const updateData = async (url, data) => {
  try {
    const response = await apiClient.put(url, data);  // Using axios PUT method
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
