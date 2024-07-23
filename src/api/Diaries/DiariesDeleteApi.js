import { Axios } from '../Axios';

const deleteDiary = async (diaryId) => {
  try {
    const url = `/diaries/${diaryId}`;
    console.log(`DELETE ${Axios.defaults.baseURL}${url}`);
    const response = await Axios.delete(url);
    console.log('일기삭제성공: ', response.data);
    return response.data;
  } catch (error) {
    console.error('삭제실패: ', error);
    throw error;
  }
};

export default deleteDiary;
