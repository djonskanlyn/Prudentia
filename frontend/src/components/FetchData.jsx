import axios from 'axios';

// Create an axios instance with a base URL
export const apiClient = axios.create({
  baseURL: 'https://prudentiaapi.onrender.com/api/', // API's base URL
  //baseURL: 'http://localhost:8000/api/',
});

// Request interceptor to include token in headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
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

