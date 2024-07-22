import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Theme } from "../styles/Theme";
import SurveyButton from './SurveyButton';
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activePath = location.pathname.toLowerCase();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => {
    return activePath.startsWith(path.toLowerCase());
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    console.log('Logged out');
    navigate('/auth/login');
    setMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <Title onClick={() => handleNavigation('/main')}>Mutside Out</Title>
      <Menu open={menuOpen}>
        <MenuItem
          $active={isActive('/diaries')}
          onClick={() => handleNavigation('/diaries')}
        >
          감정일기
        </MenuItem>
        <MenuItem
          $active={isActive('/rooms')}
          onClick={() => handleNavigation('/rooms')}
        >
          집중세션
        </MenuItem>
        <MenuItem
          $active={isActive('/planners')}
          onClick={() => handleNavigation('/planners')}
        >
          플래너
        </MenuItem>
        <MenuItem
          $active={isActive('/pomodoro')}
          onClick={() => handleNavigation('/pomodoro')}
        >
          뽀모도로
        </MenuItem>
      </Menu>
      <LogoutButton content="로그아웃" onClick={handleLogout} />
    </HeaderContainer>
  );
};



const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${(props) => props.theme.colors.pink2};
  padding: 10px 40px;
  margin: 0 20px;
  min-width: 300px;

  @media (max-width: 1030px) {
    padding: 10px 20px;
  }
`;

const Title = styled.h1`
  ${(props) => props.theme.fonts.title};
  color: ${(props) => props.theme.colors.pink3};
  font-size: 35px;
  cursor: pointer;
  white-space: nowrap;

  @media (max-width: 1030px) {
    font-size: 30px;
  }

  @media (max-width: 600px) {
    font-size: 25px;
  }
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5vw;
  ${(props) => props.theme.fonts.Context};
  flex-grow: 1;
  flex-wrap: nowrap;

  @media (max-width: 1200px) {
    gap: 4vw;
  }

  @media (max-width: 900px) {
    gap: 0.5vw;
  }

  @media (max-width: 600px) {
    gap: 0;
  }
`;

const MenuItem = styled.div`
  cursor: pointer;
  text-align: center;
  padding: 7px 15px;
  font-weight: ${(props) => (props.$active ? 'bold' : 'normal')};
  border-bottom: ${(props) =>
    props.$active ? `5px solid ${props.theme.colors.pink3}` : 'none'};
  color: ${(props) =>
    props.$active ? props.theme.colors.black : props.theme.colors.gray};
  white-space: nowrap;

  @media (max-width: 1030px) {
    padding: 5px 10px;
    border-bottom: ${(props) =>
      props.$active ? `3px solid ${props.theme.colors.pink3}` : 'none'};
  }

  @media (max-width: 600px) {
    padding: 3px 5px;
    font-size: 0.9rem;
  }
`;

const LogoutButton = styled(SurveyButton)`
  padding: 7px 15px;
  white-space: nowrap;
  color: ${(props) => props.theme.colors.white};
  background-color: ${Theme.colors.pink2};
  width: 100px;
  height: 40px;

  @media (max-width: 1030px) {
    padding: 5px 10px;
  }

  @media (max-width: 600px) {
    padding: 3px 5px;
    font-size: 0.9rem;
  }
`;

export default Header;
