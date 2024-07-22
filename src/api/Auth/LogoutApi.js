import axios from 'axios';

export const LogoutApi = (callbackFunctions) => {
    const { navigateSuccess, navigateError } = callbackFunctions;
    axios.get(`/auth/logout`)
        .then(() => {
            navigateSuccess();
        })
        .catch((error) => {
            navigateError(error);
        });
};
