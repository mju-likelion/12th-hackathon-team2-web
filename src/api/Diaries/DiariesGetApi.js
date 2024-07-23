import { Axios } from '../Axios';

const fetchDiaries = async (page = 1) => {
  try {
    const response = await Axios.get(`/diaries?page=${page}`);
    console.log('전체조회 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('전체조회 에러;', error);
    throw error;
  }
};

export default fetchDiaries;
