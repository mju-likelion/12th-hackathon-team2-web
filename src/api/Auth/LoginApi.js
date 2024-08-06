import Cookies from 'js-cookie';
import { Axios } from '../Axios';

export const LoginApi = async (data, callbackFunctions) => {
  const { navigateSuccess, navigateError } = callbackFunctions;
  await Axios.post('/auth/login', data)
    .then(() => {
      navigateSuccess();
    })
    .catch((error) => {
      const errorMessage = error.response?.data?.message;
      navigateError(errorMessage);
    });
};
