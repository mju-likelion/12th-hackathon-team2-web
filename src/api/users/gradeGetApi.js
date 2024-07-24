import { Axios } from '../Axios';

export const gradeGetApi = () => {
    return Axios.get('/users/grade');
};
