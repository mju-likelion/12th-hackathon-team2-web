import { Axios } from '../Axios';

const postDiary = async (diary, imageFiles = []) => {
  try {
    const url = '/diaries';
    const formData = new FormData();
    formData.append(
      'data',
      new Blob([JSON.stringify(diary)], { type: 'application/json' })
    );
    imageFiles.forEach((file) => {
      formData.append('image', file);
    });

    const response = await Axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('일기 작성 성공: ', response.data);
    return response.data;
  } catch (error) {
    console.error('작성 실패: ', error);
    throw error;
  }
};

export default postDiary;
