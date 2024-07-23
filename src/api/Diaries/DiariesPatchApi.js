import { Axios } from '../Axios';

const updateDiary = async (diaryId, updatedDiary) => {
  try {
    const url = `/diaries/${diaryId}`;
    console.log(`PATCH ${Axios.defaults.baseURL}${url}`);
    const response = await Axios.patch(url, updatedDiary);
    console.log('일기 수정 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      '일기 수정 실패:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export default updateDiary;
