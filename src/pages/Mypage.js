import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getMypage } from '../api/Mypage/MypageApi';
import Header from '../components/Header';
import Loading from '../components/Loading';
import AvocadoImage from '../img/Avocado.svg';
import BananaImage from '../img/Banana.svg';
import TomatoImage from '../img/Tomato.svg';

const gradeMapping = {
  AVOCADO: { image: AvocadoImage, name: '아보카도' },
  TOMATO: { image: TomatoImage, name: '토마토' },
  BANANA: { image: BananaImage, name: '바나나' },
};

const Mypage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMypage();
        setUserData(data.data);
      } catch (error) {
        console.error('Failed to fetch mypage information:', error);
      }
    };

    fetchData();
  }, []);

  if (!userData) {
    return <Loading />;
  }

  const gradeInfo = gradeMapping[userData.grade] || {};

  return (
    <Container>
      <Header />
      <Info>
        <Img>
          <Grade src={gradeInfo.image} alt={gradeInfo.name} />
        </Img>
        <ProfileContainer>
          <UserInfo>
            <InfoText>닉네임: {userData.name}</InfoText>
            <InfoText>이메일: {userData.email}</InfoText>
            <InfoText>회원등급: {gradeInfo.name}</InfoText>
          </UserInfo>
          <ButtonContainer>
            <Button>회원탈퇴</Button>
            <Button>정보수정</Button>
          </ButtonContainer>
        </ProfileContainer>
      </Info>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.lightGray};
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

export default Mypage;
