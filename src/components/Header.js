import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activePath = location.pathname.toLowerCase();

  const isActive = (path) => {
    return activePath.startsWith(path.toLowerCase());
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <HeaderContainer>
      <Title onClick={() => handleNavigation("/main")}>MUTSIDE OUT</Title>
      <Menu>
        <MenuItem
          active={isActive("/diaries")}
          onClick={() => handleNavigation("/diaries")}
        >
          감정일기
        </MenuItem>
        <MenuItem
          active={isActive("/rooms")}
          onClick={() => handleNavigation("/rooms")}
        >
          집중세션
        </MenuItem>
        <MenuItem
          active={isActive("/planners")}
          onClick={() => handleNavigation("/planners")}
        >
          플래너
        </MenuItem>
        <MenuItem
          active={isActive("/pomodoro")}
          onClick={() => handleNavigation("/pomodoro")}
        >
          뽀모도로
        </MenuItem>
      </Menu>
      <LogoutButton>로그아웃</LogoutButton>
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
`;

const Title = styled.h1`
  ${(props) => props.theme.fonts.title};
  color: ${(props) => props.theme.colors.pink3};
  font-size: 30px;
  margin-right: 50px;
  cursor: pointer;
`;

const Menu = styled.div`
  display: flex;
  ${(props) => props.theme.fonts.Context};
  gap: 65px;
`;

const MenuItem = styled.div`
  cursor: pointer;
  margin-top: 10px;
  padding: 7px 15px;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  border-bottom: ${(props) => (props.active ? "5px solid #F77770" : "none")};
  color: ${(props) => (props.active ? "black" : "gray")};
`;

const LogoutButton = styled.button`
  background-color: ${(props) => props.theme.colors.pink1};
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  margin-left: auto;
`;

export default Header;
