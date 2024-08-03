import { Axios } from '../Axios';

const updateDiary = async (
  diaryId,
  updatedDiary,
  imageFiles = [],
  deleteImageIds = []
) => {
  try {
    const url = `/diaries/${diaryId}`;

    const formData = new FormData();
    formData.append(
      'data',
      new Blob([JSON.stringify(updatedDiary)], { type: 'application/json' })
    );

    if (imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        formData.append('image', file);
      });
    }

    if (deleteImageIds.length > 0) {
      formData.append(
        'deleteImageIds',
        new Blob([JSON.stringify(deleteImageIds)], { type: 'application/json' })
      );
    }
    const response = await Axios.patch(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

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
