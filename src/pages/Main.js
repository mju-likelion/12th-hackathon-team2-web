import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { gradeGetApi } from '../api/users/gradeGetApi';
import AlertModal from '../components/AlertModal';
import QuestionModal from '../components/Main/QuestionModal';
import AvocadoImage from '../img/Avocado.svg';
import background from '../img/background.svg';
import BananaImage from '../img/Banana.svg';
import Question from '../img/Question.svg';
import TomatoImage from '../img/Tomato.svg';
import GlobalStyle from '../styles/GlobalStyle';
import { Theme } from '../styles/Theme';

const gradeMapping = {
  AVOCADO: { image: AvocadoImage, name: '아보카도' },
  TOMATO: { image: TomatoImage, name: '토마토' },
  BANANA: { image: BananaImage, name: '바나나' },
};

const Main = () => {
  const navigate = useNavigate();
  const [userGrade, setUserGrade] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loginToken = Cookies.get('loginToken');
    if (!loginToken) {
      setAlertMessage('로그인이 필요합니다. \n로그인 페이지로 이동합니다.');
      return;
    }

    gradeGetApi()
      .then((response) => {
        if (response.status === 200) {
          setUserGrade(response.data.data.userGrade);
        }
      })
      .catch((error) => {
        console.error('유저 등급 조회 실패:', error);
      });
  }, [navigate]);

  const handleAlertClose = () => {
    setAlertMessage(null);
  };

  const handleAlertConfirm = () => {
    setAlertMessage(null);
    navigate('/auth/login');
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const gradeInfo = gradeMapping[userGrade] || {};

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <Container>
        <Header>MUTSIDE OUT</Header>
        {gradeInfo.image && (
          <Logo src={gradeInfo.image} alt={`${gradeInfo.name} Logo`} />
        )}
        {userGrade && <UserGrade>유저 등급: {gradeInfo.name}</UserGrade>}
        <Menu>
          <MenuItem onClick={() => navigate('/diaries')}>감정일기</MenuItem>
          <MenuItem onClick={() => navigate('/rooms')}>집중세션</MenuItem>
          <MenuItem onClick={() => navigate('/planners')}>플래너</MenuItem>
          <MenuItem onClick={() => navigate('/pomodoro')}>뽀모도로</MenuItem>
          {/* <MenuItem onClick={() => navigate('/mypage')}>마이페이지</MenuItem> */}
          <QuestionItem onClick={openModal}>
            <QuestionLogo src={Question} />
          </QuestionItem>
        </Menu>
        {alertMessage && (
          <AlertModal
            isOpen={Boolean(alertMessage)}
            message={alertMessage}
            close={handleAlertClose}
            handleConfirm={handleAlertConfirm}
          />
        )}
        <QuestionModal isOpen={isModalOpen} onRequestClose={closeModal} />
      </Container>
    </ThemeProvider>
  );
};

export default Main;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: url(${background}) no-repeat center center;
  background-size: cover;
  position: relative;
  padding: 20px;
  overflow-y: scroll;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 15px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 10px;
  }
`;

const Logo = styled.img`
  width: 200px;
  height: 238px;
  margin-bottom: 20px;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 180px;
    height: 180px;
    margin-bottom: 50px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 140px;
    height: 140px;
    margin-bottom: 30px;
  }
  @media (max-height: 700px) {
    width: 120px;
  }
`;

const QuestionLogo = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 20px;
`;

const Header = styled.h1`
  ${(props) => props.theme.fonts.title};
  color: ${(props) => props.theme.colors.pink3};
  margin: 20px;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const UserGrade = styled.div`
  ${(props) => props.theme.fonts.PageNumber};
  color: ${(props) => props.theme.colors.pink2};
  margin-bottom: 10px;
  font-weight: 700;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 1.2rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const Menu = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    gap: 20px;
    margin-top: 30px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    gap: 15px;
    margin-top: 20px;
  }

  @media (max-height: 900px) {
    gap: 15px;
  }

  @media (max-width: 480px) {
    gap: 10px;
    margin-top: 15px;
  }
`;

const MenuItem = styled.div`
  ${(props) => props.theme.fonts.menuItem};
  color: ${(props) => props.theme.colors.gray};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.pink3};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 25px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 20px;
  }
`;

const QuestionItem = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.pink3};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 1.8rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;
