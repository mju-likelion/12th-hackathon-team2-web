import { Axios } from '../Axios';

export const deleteRoom = async (roomId) => {
  try {
    const response = await Axios.delete(`/rooms/${roomId}`);
    console.log('삭제 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('삭제 실패:', error);
    throw error;
  }
};
