import { Axios } from '../Axios';

const getDiary = async (diaryId) => {
  try {
    const url = `/diaries/${diaryId}`;
    console.log(`GET ${Axios.defaults.baseURL}${url}`);
    const response = await Axios.get(url);
    console.log('일기조회성공: ', response.data);
    return response.data;
  } catch (error) {
    console.error('조회실패: ', error);
    throw error;
  }
};

export default getDiary;
