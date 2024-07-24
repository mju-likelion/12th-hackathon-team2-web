import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { gradeGetApi } from '../api/users/gradeGetApi';
import Container from "../components/Container";
import AvocadoImage from "../img/Avocado.svg";
import BananaImage from "../img/Banana.svg";
import TomatoImage from "../img/Tomato.svg";
import GlobalStyle from "../styles/GlobalStyle";
import { Theme } from "../styles/Theme";

const gradeMapping = {
  AVOCADO: { image: AvocadoImage, name: '아보카도' },
  TOMATO: { image: TomatoImage, name: '토마토' },
  BANANA: { image: BananaImage, name: '바나나' },
};

const Main = () => {
  const navigate = useNavigate();
  const [userGrade, setUserGrade] = useState(null);

  useEffect(() => {
    const loginToken = Cookies.get('loginToken');
    if (!loginToken) {
      alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      navigate('/auth/login');
      return;
    }

    gradeGetApi().then(response => {
      if (response.status === 200) {
        setUserGrade(response.data.data.grade);
      }
    }).catch(error => {
      console.error('유저 등급 조회 실패:', error);
    });
  }, [navigate]);

  const gradeInfo = gradeMapping[userGrade] || {};

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <Container>
        {gradeInfo.image && <Logo src={gradeInfo.image} alt={`${gradeInfo.name} Logo`} />}
        <Header>Mutside Out</Header>
        {userGrade && <UserGrade>유저 등급: {gradeInfo.name}</UserGrade>}
        <Menu>
          <MenuItem onClick={() => navigate("/planners")}>플래너</MenuItem>
          <MenuItem onClick={() => navigate("/diaries")}>감정일기</MenuItem>
          <MenuItem onClick={() => navigate("/rooms")}>집중세션</MenuItem>
          <MenuItem onClick={() => navigate("/pomodoro")}>뽀모도로</MenuItem>
        </Menu>
      </Container>
    </ThemeProvider>
  );
};

export default Main;

const Logo = styled.img`
  width: 238px;
  height: 238px;
  margin-bottom: 69px;
`;

const Header = styled.h1`
  ${(props) => props.theme.fonts.title};
  color: ${(props) => props.theme.colors.pink3};
  margin-bottom: 50px;
`;

const UserGrade = styled.div`
  ${(props) => props.theme.fonts.menuItem};
  color: ${(props) => props.theme.colors.gray};
  margin-bottom: 20px;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 26px;
`;

const MenuItem = styled.div`
  ${(props) => props.theme.fonts.menuItem};
  color: ${(props) => props.theme.colors.gray};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.pink3};
  }
`;
