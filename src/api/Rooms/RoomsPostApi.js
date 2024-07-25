import { Axios } from '../Axios';

export const createRoom = async (roomData) => {
  try {
    const response = await Axios.post('/rooms', roomData);
    console.log('방 생성 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('방 생성 실패:', error);
    throw error;
  }
};
