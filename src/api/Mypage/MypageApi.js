import { Axios } from '../Axios';

export const getMypage = async () => {
  try {
    const response = await Axios.get('/users/mypage');
    return response.data;
  } catch (error) {
    console.error('마이페이지 조회 실패: ', error);
    throw error;
  }
};

export const updateMypage = async (name, originPassword, newPassword) => {
  try {
    const response = await Axios.patch('/users', {
      name,
      originPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error('회원정보수정실패: ', error);
    throw error;
  }
};

export const deleteMypage = async (password) => {
  try {
    const response = await Axios.delete('/users', { data: { password } });
    return response.data;
  } catch (error) {
    console.error('탈퇴 실패:', error);
    throw error;
  }
};
