import axios from 'axios';

const URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';
export const apiRequest = axios.create({
  baseURL: URL
});
