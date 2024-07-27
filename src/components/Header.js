import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LogoutApi } from '../api/Auth/LogoutApi';
import { Theme } from '../styles/Theme';
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
    LogoutApi({
      navigateSuccess: () => {
        console.log('Logged out');
        Cookies.remove('loginToken');
        window.location.replace('/auth/login');
        alert('로그아웃되었습니다. 다시 로그인화면으로 돌아갑니다.');
        setMenuOpen(false);
      },
      navigateError: (error) => {
        console.error('Logout failed', error);
        error.response && navigate('/*');
      },
    });
  };

  return (
    <HeaderContainer>
      <Sidebar>
        <Title onClick={() => handleNavigation('/main')}>Mutside Out</Title>
        <SideMenu onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <Close /> : <MenuBars />}
        </SideMenu>
      </Sidebar>
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
        <MenuItem className='logout' onClick={handleLogout}>
          로그아웃
        </MenuItem>
      </Menu>
      <LogoutButton content='로그아웃' onClick={handleLogout} />
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
  padding-bottom: 0px;

  @media (max-width: 1030px) {
    padding: 10px 20px;
    padding-bottom: 0px;
  }

  @media (max-width: 680px) {
    flex-direction: column;
    height: auto;
    padding-bottom: 10px;
  }
`;

const Sidebar = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 680px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const SideMenu = styled.div`
  display: none;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 680px) {
    display: block;
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
    padding-bottom: 0px;
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

  @media (max-width: 680px) {
    flex-direction: column;
    gap: 5px;
    width: 100%;
    display: ${(props) => (props.open ? 'flex' : 'none')};
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

  @media (max-width: 680px) {
    padding: 5px 0;
    border-bottom: ${(props) =>
      props.$active ? `3px solid ${props.theme.colors.pink3}` : 'none'};
  }

  &.logout {
    display: none;

    @media (max-width: 680px) {
      display: block;
    }
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

  @media (max-width: 680px) {
    display: none;
  }
`;

const MenuBars = styled(FaBars)`
  color: ${(props) => props.theme.colors.pink3};
`;
const Close = styled(FaTimes)`
  color: ${(props) => props.theme.colors.pink3};
`;

export default Header;
