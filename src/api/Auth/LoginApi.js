import Cookies from 'js-cookie';
import { Axios } from '../Axios';

export const LoginApi = (data, callbackFunctions) => {
    const { navigateSuccess, navigateError } = callbackFunctions;
    Axios.post('/auth/login', data)
        .then(response => {
            Cookies.set('loginToken', response.data.token);
            navigateSuccess();
        })
        .catch(error => {
            navigateError(error);
        });
};
