import axios from 'axios';

const api = axios.create({
  baseURL: 'localhost:3101',
});

export default api;
