import { Axios } from '../Axios';

export const PlannersPutApi = (plannerId) => {
  return Axios.put(`/planners/${plannerId}`, { isCompleted: true });
};
