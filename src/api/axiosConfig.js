import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'https://api-seguridad-qzw2.onrender.com', 
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosConfig;
