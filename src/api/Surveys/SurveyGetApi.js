import { Axios } from '../Axios';

export const fetchSurveyQuestions = async () => {
  try {
    const response = await Axios.get('/surveys');
    return response.data.data.surveyQuestionDataList;
  } catch (error) {
    console.error('에러:', error);
    throw error;
  }
};
