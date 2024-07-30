import axios from 'axios';
import Cookies from 'js-cookie';

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'https://api.mutsideout.com',
  withCredentials: true,
});

Axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get('loginToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(
          '/auth/refresh',
          {},
          {
            withCredentials: true,
          }
        );
        Cookies.set('loginToken', data.token);
        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return Axios(originalRequest);
      } catch (refreshError) {
        Cookies.remove('loginToken');
        window.location.replace('/auth/login');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
