import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

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
    setMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <Sidebar>
        <Title onClick={() => handleNavigation('/main')}>Mutside Out</Title>
        <SideMenu onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <MenuBars /> : <Close />}
        </SideMenu>
      </Sidebar>
      <Menu open={menuOpen}>
        <MenuItem
          active={isActive('/diaries')}
          onClick={() => handleNavigation('/diaries')}
        >
          감정일기
        </MenuItem>
        <MenuItem
          active={isActive('/rooms')}
          onClick={() => handleNavigation('/rooms')}
        >
          집중세션
        </MenuItem>
        <MenuItem
          active={isActive('/planners')}
          onClick={() => handleNavigation('/planners')}
        >
          플래너
        </MenuItem>
        <MenuItem
          active={isActive('/pomodoro')}
          onClick={() => handleNavigation('/pomodoro')}
        >
          뽀모도로
        </MenuItem>
        <MenuItem className='logout' onClick={handleLogout}>
          로그아웃
        </MenuItem>
      </Menu>
      <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  height: 65px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${(props) => props.theme.colors.pink2};
  padding: 10px 40px;
  margin: 0 20px;

  /* @media (max-width: 1030px) {
    flex-direction: column;
    height: auto;
  } */
`;

const Sidebar = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  /* @media (max-width: 1030px) {
    width: 100%;
    justify-content: space-between;
  } */
`;

const SideMenu = styled.div`
  display: none;
  font-size: 24px;
  cursor: pointer;

  /* @media (max-width: 1030px) {
    display: block;
  } */
`;

const Title = styled.h1`
  min-width: 150px;
  ${(props) => props.theme.fonts.title};
  color: ${(props) => props.theme.colors.pink3};
  font-size: 30px;
  margin-right: 50px;
  cursor: pointer;
`;

const Menu = styled.div`
  width: 100vw;
  display: flex;
  ${(props) => props.theme.fonts.Context};
  gap: 6vw;
  text-align: center;

  /* @media (max-width: 1030px) {
    flex-direction: column;
    gap: 5px;
    width: 100%;
    display: ${(props) => (props.open ? 'flex' : 'none')};
  } */
`;

const MenuItem = styled.div`
  width: 100px;
  cursor: pointer;
  margin-top: 10px;
  padding: 7px 15px;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  border-bottom: ${(props) =>
    props.active ? `5px solid ${props.theme.colors.pink3}` : 'none'};
  color: ${(props) =>
    props.active ? props.theme.colors.black : props.theme.colors.gray};

  /* @media (max-width: 1030px) {
    padding: 5px 0;
    border-bottom: ${(props) =>
    props.active ? `3px solid ${props.theme.colors.pink3}` : 'none'};
  } */

  &.logout {
    display: none;

    /* @media (max-width: 1030px) {
      display: block;
    } */
  }
`;

const LogoutButton = styled.button`
  background-color: ${(props) => props.theme.colors.pink1};
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  margin-left: auto;

  /* @media (max-width: 1030px) {
    display: none; */
  }
`;

const MenuBars = styled(FaTimes)`
  color: ${(props) => props.theme.colors.pink3};
`;
const Close = styled(FaBars)`
  color: ${(props) => props.theme.colors.pink3};
`;
export default Header;
