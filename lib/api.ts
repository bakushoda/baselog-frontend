import axios from 'axios';

const api = axios.create({
  baseURL: 'http://baselog.local/api',
  withCredentials: true,
});

export default api;
