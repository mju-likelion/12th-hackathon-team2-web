import { Axios } from '../Axios';

export const PlannersCalendarGetApi = (month) => {
  return Axios.get(`/planners/calendars?month=${month}`)
    .then((response) => {
      console.log('API Response:', response);
      return response.data.data;
    })
    .catch((error) => {
      console.error('There was an error fetching the calendar data!', error);
      throw error;
    });
};
