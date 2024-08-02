import { Axios } from '../Axios';

const updateDiary = async (diaryId, updatedDiary, imageFiles = []) => {
  try {
    const url = `/diaries/${diaryId}`;
    let response;

    if (imageFiles) {
      const formData = new FormData();
      formData.append(
        'data',
        new Blob([JSON.stringify(updatedDiary)], { type: 'application/json' })
      );
      imageFiles.forEach((file) => {
        formData.append('image', file);
      });

      response = await Axios.patch(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      const formData = new FormData();
      formData.append(
        'data',
        new Blob([JSON.stringify(updatedDiary)], { type: 'application/json' })
      );

      response = await Axios.patch(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }

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
