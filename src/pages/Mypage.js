import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getMypage, updateMypage, deleteMypage } from '../api/Mypage/MypageApi';
import Header from '../components/Header';
import Loading from '../components/Loading';
import AvocadoImage from '../img/Avocado.svg';
import BananaImage from '../img/Banana.svg';
import TomatoImage from '../img/Tomato.svg';
import { useNavigate } from 'react-router-dom';

const gradeMapping = {
  AVOCADO: { image: AvocadoImage, name: '아보카도' },
  TOMATO: { image: TomatoImage, name: '토마토' },
  BANANA: { image: BananaImage, name: '바나나' },
};

const Mypage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    newName: '',
    originPassword: '',
    newPassword: '',
    deletePassword: '',
  });
  const [error, setError] = useState('');
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMypage();
        setUserData(data.data);
        setFormData((prevFormData) => ({
          ...prevFormData,
          newName: data.data.name,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.originPassword) {
      setError('현재 비밀번호를 입력해주세요.');
      return;
    }
    try {
      const updateData = {
        name: formData.newName,
        originPassword: formData.originPassword,
      };

      if (formData.newPassword) {
        updateData.newPassword = formData.newPassword;
      }

      await updateMypage(
        updateData.name,
        updateData.originPassword,
        updateData.newPassword
      );

      const data = await getMypage();
      setUserData(data.data);
      setIsEditing(false);
      setError('');
    } catch (error) {
      console.error('정보수정실패: ', error);
      setError('비밀번호를 다시 입력해주세요.');
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    if (!formData.deletePassword) {
      setDeleteError('비밀번호를 입력해주세요.');
      return;
    }
    try {
      await deleteMypage(formData.deletePassword);
      alert('회원탈퇴가 완료되었습니다.');
      navigate('/auth/login');
    } catch (error) {
      console.error('탈퇴 실패:', error);
      setDeleteError('비밀번호가 올바르지 않습니다.');
      alert('회원탈퇴에 실패했습니다.');
    }
  };

  const handleDeleteButtonClick = () => {
    setIsDeleting(true);
  };

  if (!userData) {
    return <Loading />;
  }

  const gradeInfo = gradeMapping[userData.grade] || {};

  return (
    <Div>
      <Header />
      <Container>
        <Info>
          <Img>
            <Grade src={gradeInfo.image} />
          </Img>
          <ProfileContainer>
            {isEditing ? (
              <form onSubmit={handleFormSubmit}>
                <UserInfo>
                  <InfoText>
                    닉네임:
                    <Input
                      type='text'
                      name='newName'
                      value={formData.newName}
                      onChange={handleInputChange}
                    />
                  </InfoText>
                  <InfoText>
                    현재 비밀번호:
                    <Input
                      type='password'
                      name='originPassword'
                      value={formData.originPassword}
                      onChange={handleInputChange}
                    />
                  </InfoText>
                  {error && <ErrorText>{error}</ErrorText>}
                  <InfoText>
                    새 비밀번호:
                    <Input
                      type='password'
                      name='newPassword'
                      value={formData.newPassword}
                      onChange={handleInputChange}
                    />
                  </InfoText>
                </UserInfo>
                <ButtonContainer>
                  <Button type='submit'>저장</Button>
                  <Button type='button' onClick={() => setIsEditing(false)}>
                    취소
                  </Button>
                </ButtonContainer>
              </form>
            ) : (
              <>
                <UserInfo>
                  <InfoText>닉네임: {userData.name}</InfoText>
                  <InfoText>이메일: {userData.email}</InfoText>
                  <InfoText>회원등급: {gradeInfo.name}</InfoText>
                </UserInfo>
                <ButtonContainer>
                  <Button onClick={handleEditButtonClick}>정보수정</Button>
                  <Button onClick={handleDeleteButtonClick}>회원탈퇴</Button>
                </ButtonContainer>
              </>
            )}
            {isDeleting && (
              <DeleteContainer>
                <InfoText>비밀번호를 입력해주세요.</InfoText>
                <form onSubmit={handleDeleteAccount}>
                  <Input
                    type='password'
                    name='deletePassword'
                    value={formData.deletePassword}
                    onChange={handleInputChange}
                  />
                  {deleteError && <ErrorText>{deleteError}</ErrorText>}
                  <ButtonContainer>
                    <Button type='submit'>탈퇴</Button>
                    <Button type='button' onClick={() => setIsDeleting(false)}>
                      취소
                    </Button>
                  </ButtonContainer>
                </form>
              </DeleteContainer>
            )}
          </ProfileContainer>
        </Info>
      </Container>
    </Div>
  );
};
const Div = styled.div`
  width: 100%;
  padding: 20px;
`;
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 15px;
  border: 2px solid ${(props) => props.theme.colors.gray};
  padding: 40px;
  width: 80%;
  max-width: 800px;
`;

const ProfileContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const Img = styled.div`
  border: 2px solid ${(props) => props.theme.colors.gray};
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.pink1};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Grade = styled.img`
  width: 60%;
  height: 60%;
`;

const UserInfo = styled.div`
  width: 100%;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.pink1};
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const InfoText = styled.p`
  margin: 5px 0;
  ${(props) => props.theme.fonts.tinyButton};
  text-align: left;
  line-height: 1.5em;
  color: ${(props) => props.theme.colors.darkGray};
`;

const Input = styled.input`
  width: 96%;
  padding: 10px;
  margin-bottom: 8px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button`
  margin-left: 10px;
  padding: 10px 20px;
  background-color: ${(props) => props.theme.colors.pink3};
  color: ${(props) => props.theme.colors.white};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.pink5};
  }
`;
const DeleteContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.pink1};
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

const ErrorText = styled.p`
  color: red;
  ${(props) => props.theme.fonts.tinyButton};
  text-align: left;
  margin-bottom: 10px;
`;
export default Mypage;
