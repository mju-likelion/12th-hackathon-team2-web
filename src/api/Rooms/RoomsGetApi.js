import { Axios } from '../Axios';

export const getRoom = async (roomId) => {
  try {
    const response = await Axios.get(`/rooms/${roomId}`);
    console.log('상세 조회 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('상세 조회 실패:', error);
    throw error;
  }
};
