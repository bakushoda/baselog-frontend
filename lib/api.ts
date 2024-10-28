import axios from 'axios';

const api = axios.create({
  baseURL: 'http://baselog.local/api',
  withCredentials: true,
});

// リクエスト時に認証トークンを追加するインターセプター
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
