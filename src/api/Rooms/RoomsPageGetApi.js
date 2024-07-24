import { Axios } from '../Axios';

export const fetchRooms = async (page) => {
  try {
    const response = await Axios.get(`/rooms?page=${page}`);
    console.log('전체조회 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('세션 조회 실패:', error);
    throw error;
  }
};
