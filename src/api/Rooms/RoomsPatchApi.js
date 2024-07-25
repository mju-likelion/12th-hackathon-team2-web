import { Axios } from '../Axios';

export const updateRoom = async (roomId, roomData) => {
  try {
    const response = await Axios.patch(`/rooms/${roomId}`, roomData);
    console.log('수정 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('수정 실패:', error);
    throw error;
  }
};
