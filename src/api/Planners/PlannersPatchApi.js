import { Axios } from '../Axios';

export const PlannersPatchApi = (plannerId, content) => {
  return Axios.patch(`/planners/${plannerId}`, { content });
};
