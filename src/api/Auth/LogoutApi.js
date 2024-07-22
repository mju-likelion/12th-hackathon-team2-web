import { Axios } from '../Axios';

export const LogoutApi = (callbackFunctions) => {
    const { navigateSuccess, navigateError } = callbackFunctions;
    Axios.get(`/auth/logout`)
        .then(() => {
            navigateSuccess();
        })
        .catch((error) => {
            navigateError(error);
        });
};
