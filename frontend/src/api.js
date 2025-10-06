import axios from 'axios';
// export const BACKEND_URL = 'http://localhost:5000';
export const BACKEND_URL = 'https://jobfit-ai-backend.onrender.com';

const api = axios.create({
  baseURL: BACKEND_URL,
});

export default api;

