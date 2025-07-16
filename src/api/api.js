import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7283', // Adjust to your backend
});

export default api;