import axios from 'axios';
import Cookies from 'js-cookie';

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'https://api.mutsideout.com',
  withCredentials: true,
});

Axios.interceptors.request.use((config) => {
  const token = Cookies.get('loginToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

Axios.interceptors.response.use(
  (response) => response,
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
        Cookies.set('loginToken', data.token, { expires: 1 / 24 / 60 });
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

export const setTokenRefreshTimer = () => {
  const token = Cookies.get('loginToken');
  if (token) {
    let tokenPayload;
    try {
      tokenPayload = JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Invalid token:', error);
      Cookies.remove('loginToken');
      window.location.replace('/auth/login');
      return;
    }

    const exp = tokenPayload.exp * 1000;
    const now = new Date().getTime();
    const timeout = exp - now - 60000;
    if (timeout > 0) {
      setTimeout(async () => {
        try {
          const { data } = await axios.post(
            '/auth/refresh',
            {},
            { withCredentials: true }
          );
          Cookies.set('loginToken', data.token, { expires: 1 / 24 / 60 });
          setTokenRefreshTimer();
        } catch (refreshError) {
          Cookies.remove('loginToken');
          window.location.replace('/auth/login');
        }
      }, timeout);
    }
  }
};

setTokenRefreshTimer();
