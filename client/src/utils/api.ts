import axios from 'axios';

export const api = axios.create({
  baseURL: '/api', // handled by Vite proxy
  headers: {
    'Content-Type': 'application/json',
  },
});