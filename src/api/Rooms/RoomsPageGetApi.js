import { Axios } from '../Axios';

export const fetchRooms = async (page) => {
  try {
    const response = await Axios.get(`/rooms?page=${page}`);
    console.log('전체조회 성공:', response.data);
    const { roomList, pagination } = response.data.data;
    return {
      rooms: roomList,
      totalPages: pagination.totalPage,
      currentPage: pagination.currentPage,
    };
  } catch (error) {
    console.error('세션 조회 실패:', error);
    throw error;
  }
};
