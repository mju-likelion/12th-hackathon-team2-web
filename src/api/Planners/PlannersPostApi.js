import { Axios } from '../Axios';

export const PlannersPostApi = (content) => {
    return Axios.post('/planners', { content });
};
