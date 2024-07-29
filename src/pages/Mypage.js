import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import styled from 'styled-components';
import { getMypage } from '../api/Mypage/MypageApi'; // API 파일을 임포트합니다.
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
    return <div>Loading...</div>;
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
          <Button>회원탈퇴</Button>
          <Button>정보수정</Button>
        </ProfileContainer>
      </Info>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 20px;
`;

const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
  /* background-color: gray; */
`;

const ProfileContainer = styled.div`
  width: 80%;
  /* background-color: yellow; */
  padding: 30px;
`;

const Img = styled.div`
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.pink1};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
`;

const Grade = styled.img`
  width: 60%;
  height: 60%;
`;

const UserInfo = styled.div`
  width: 100%;
  height: 16vw;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.pink1};
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 10px;
`;

const InfoText = styled.p`
  margin: 5px 0;
  ${(props) => props.theme.fonts.tinyButton};
  text-align: left;
  line-height: 1.5em;
`;

const Button = styled.button`
  margin-top: 10px;
  margin-left: 10px;
  padding: 10px 20px;
  background-color: ${(props) => props.theme.colors.pink3};
  color: ${(props) => props.theme.colors.white};
  border-radius: 5px;
  float: right;
  cursor: pointer;
  &:hover {
    background-color: #ff4757;
  }
`;

export default Mypage;
