import axios from 'axios';

const BACKEND_URL = 'https://jobfit-ai-backend.onrender.com';
const api = axios.create({
  baseURL: BACKEND_URL,
});

export default api;