import { Axios } from '../Axios';

export const PlannersCompleteGetApi = () => {
    return Axios.get('/planners/completed');
};
