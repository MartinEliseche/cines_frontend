import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 5000, 
  withCredentials: false, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default api;