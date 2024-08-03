import { Axios } from '../Axios';

const getDiary = async (diaryId) => {
  try {
    const url = `/diaries/${diaryId}`;
    console.log(`GET ${Axios.defaults.baseURL}${url}`);
    const response = await Axios.get(url);
    console.log('일기조회성공: ', response.data);

    const { data } = response.data;
    const imageUrls = data.imageDataList
      ? data.imageDataList.map((image) => ({
          id: image.imageId,
          url: image.imageUrl,
        }))
      : [];

    return {
      id: data.id,
      title: data.title,
      content: data.content,
      date: data.createdAt,
      imageData: imageUrls,
    };
  } catch (error) {
    console.error('조회실패: ', error);
    throw error;
  }
};

export default getDiary;
