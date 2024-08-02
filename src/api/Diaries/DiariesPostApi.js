import { Axios } from '../Axios';

const postDiary = async (diary, imageFile = null) => {
  try {
    const url = '/diaries';
    let response;

    if (imageFile) {
      const formData = new FormData();
      formData.append(
        'data',
        new Blob([JSON.stringify(diary)], { type: 'application/json' })
      );
      formData.append('image', imageFile);

      response = await Axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      const formData = new FormData();
      formData.append(
        'data',
        new Blob([JSON.stringify(diary)], { type: 'application/json' })
      );

      response = await Axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }

    console.log('일기 작성 성공: ', response.data);
    return response.data;
  } catch (error) {
    console.error('작성 실패: ', error);
    throw error;
  }
};

export default postDiary;
