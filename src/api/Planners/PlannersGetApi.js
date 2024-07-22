import { Axios } from '../Axios';

export const PlannersGetApi = () => {
    return Axios.get('/planners');
};
