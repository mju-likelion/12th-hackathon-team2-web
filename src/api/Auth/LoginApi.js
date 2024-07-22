import { Axios } from '../Axios';
export const LoginApi = (data, callbackFunctions) => {
    const { navigateSuccess, navigateError } = callbackFunctions;
    Axios.post(`https://api.mutsideout.com/auth/login`, {
        email: data.email,
        password: data.password,
    })
        .then(() => {
            navigateSuccess();
        })
        .catch((error) => {
            navigateError(error);
        });
};