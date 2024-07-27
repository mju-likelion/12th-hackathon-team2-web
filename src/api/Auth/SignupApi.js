import { Axios } from '../Axios';
export const SignupApi = (data, callbackFunctions) => {
  const { navigateSuccess, navigateError } = callbackFunctions;
  Axios.post(`/auth/signup`, {
    email: data.email,
    password: data.pw,
    name: data.nickname,
  })
    .then(() => {
      navigateSuccess();
    })
    .catch((error) => {
      navigateError(error);
    });
};
