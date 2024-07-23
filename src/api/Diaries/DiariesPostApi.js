import { Axios } from '../Axios';

const postDiary = async (diary) => {
  try {
    const url = '/diaries';
    console.log(` ${Axios.defaults.baseURL}${url}`);
    const response = await Axios.post(url, diary);
    console.log('일기작성성공: ', response.data);
    return response.data;
  } catch (error) {
    console.error('작성실패: ', error);
    throw error;
  }
};

export default postDiary;
