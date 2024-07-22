import Cookies from 'js-cookie';
import { Axios } from '../Axios';

export const LogoutApi = (callbackFunctions) => {
    const { navigateSuccess, navigateError } = callbackFunctions;
    Axios.post('/auth/logout')
        .then(() => {
            Cookies.remove('loginToken');
            navigateSuccess();
        })
        .catch((error) => {
            navigateError(error);
        });
};
