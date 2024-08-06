import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LogoutApi } from '../api/Auth/LogoutApi';
import AlertModal from '../components/AlertModal';
import { ReactComponent as LogoutIcon } from '../img/Logout.svg';
import { ReactComponent as SettingsIcon } from '../img/SettingIcon.svg';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activePath = location.pathname.toLowerCase();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        // Cookies.remove('loginToken');
        window.location.replace('/auth/login');
        setMenuOpen(false);
      },
      navigateError: (error) => {
        console.error('Logout failed', error);
        error.response && navigate('/*');
      },
    });
  };

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    handleModalClose();
    handleLogout();
  };

  return (
    <HeaderContainer>
      <Sidebar>
        <Title onClick={() => handleNavigation('/main')}>MUTSIDE OUT</Title>

        <SideMenu onClick={() => setMenuOpen(!menuOpen)}>
          <SideIconContainer>
            <LogoutIconStyled className='desktop' onClick={handleLogoutClick} />
            <SettingIconStyled
              className='desktop'
              onClick={() => handleNavigation('/mypage')}
            />
            {menuOpen ? <Close /> : <MenuBars />}
          </SideIconContainer>
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
      </Menu>
      <IconContainer>
        <LogoutIconStyled className='desktop' onClick={handleLogoutClick} />
        <SettingIconStyled
          className='desktop'
          onClick={() => handleNavigation('/mypage')}
        />
      </IconContainer>
      <AlertModal
        isOpen={isModalOpen}
        close={handleModalClose}
        message='로그아웃되었습니다. 다시 로그인화면으로 돌아갑니다.'
        handleConfirm={handleModalConfirm}
      />
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

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 10px 20px;
    padding-bottom: 0px;
  }

  @media (max-width: 550px) {
    flex-direction: column;
    height: auto;
    margin: 0px;
    padding-bottom: 10px;
    padding: 10px 10px;
  }
`;

const Sidebar = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 550px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const SideMenu = styled.div`
  display: none;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 550px) {
    display: block;
    margin-left: 10px;
  }
`;

const SideIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 550px) {
    display: none;
  }
`;

const Title = styled.h1`
  ${(props) => props.theme.fonts.title};
  color: ${(props) => props.theme.colors.pink3};
  font-size: 35px;
  cursor: pointer;
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: 30px;
    padding-bottom: 0px;
  }

  @media (max-width: 850px) {
    font-size: 26px;
  }

  @media (max-width: 700px) {
    font-size: 20px;
  }
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4vw;
  ${(props) => props.theme.fonts.Context};
  flex-grow: 1;
  flex-wrap: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 4vw;
  }

  @media (max-width: 550px) {
    flex-direction: column;
    gap: 5px;
    width: 100%;
    display: ${(props) => (props.open ? 'flex' : 'none')};
  }

  @media (max-width: 700px) {
    gap: 2vw;
  }
  @media (max-width: 700px) {
    gap: 1vw;
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

  @media (max-width: 850px) {
    font-size: 16px;
  }
  @media (max-width: 700px) {
    font-size: 13px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 5px 10px;
    border-bottom: ${(props) =>
      props.$active ? `3px solid ${props.theme.colors.pink3}` : 'none'};
  }

  @media (max-width: 550px) {
    padding: 5px 0;
    border-bottom: ${(props) =>
      props.$active ? `3px solid ${props.theme.colors.pink3}` : 'none'};
  }

  &.desktop {
    display: none;

    @media (min-width: 550px) {
      display: flex;
      align-items: center;
    }
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 550px) {
    display: none;
  }
`;

const LogoutIconStyled = styled(LogoutIcon)`
  width: 28px;
  height: 28px;
  cursor: pointer;
  fill: ${(props) => props.theme.colors.pink3};
  @media (max-width: 850px) {
    width: 23px;
    height: 23px;
  }
  @media (max-width: 550px) {
    margin-right: 12px;
    width: 20px;
    height: 20px;
  }
`;

const SettingIconStyled = styled(SettingsIcon)`
  margin-left: 5px;
  width: 28px;
  height: 28px;
  cursor: pointer;
  fill: ${(props) => props.theme.colors.pink3};
  @media (max-width: 850px) {
    width: 23px;
    margin-left: 0px;
  }
  @media (max-width: 550px) {
    margin-right: 12px;
    width: 20px;
    height: 20px;
  }
`;

const MenuBars = styled(FaBars)`
  color: ${(props) => props.theme.colors.pink3};
`;

const Close = styled(FaTimes)`
  color: ${(props) => props.theme.colors.pink3};
`;

export default Header;
