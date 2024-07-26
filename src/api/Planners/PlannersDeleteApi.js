import { Axios } from '../Axios';

export const PlannersDeleteApi = (plannerId) => {
    return Axios.delete(`/planners/${plannerId}`);
};
