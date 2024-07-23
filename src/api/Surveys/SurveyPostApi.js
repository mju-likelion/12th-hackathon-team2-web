import { Axios } from '../Axios';

export const submitSurveyResults = async (surveyResults) => {
  try {
    const response = await Axios.post('/surveys', surveyResults);
    return response.data;
  } catch (error) {
    console.error('에러:', error);
    throw error;
  }
};
