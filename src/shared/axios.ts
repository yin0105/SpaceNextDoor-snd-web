import axios from 'axios';
import { AUTH_TOKEN_KEY } from '../modules/app/stores/AuthStore';

axios.interceptors.request.use((config) => {
  // perform a task before the request is sent
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${token && token !== 'undefined' ? token : ''}`;
  return config;
}, (error) => Promise.reject(error));

export default axios;
