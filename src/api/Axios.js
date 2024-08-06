import axios from 'axios';
import Cookies from 'js-cookie';

export const Axios = axios.create({
  baseURL: 'https://api.mutsideout.com',
  withCredentials: true,
});

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (window.location.pathname === '/auth/login') {
      return Promise.reject(error);
    }
    console.log(error);
    if (error.response?.status === 401) {
      console.log('실행');
      try {
        console.log('실행2');
        const { data } = await Axios.get('/auth/refresh', {
          withCredentials: true,
        });

        return Axios;
      } catch (refreshError) {
        window.location.replace('/auth/login');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
