import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activePage = location.pathname;

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <HeaderContainer>
      <Title>MUTSIDE OUT</Title>
      <Menu>
        <MenuItem
          active={activePage === "/diary"}
          onClick={() => handleNavigation("/diary")}
        >
          감정일기
        </MenuItem>
        <MenuItem
          active={activePage === "/session"}
          onClick={() => handleNavigation("/session")}
        >
          집중세션
        </MenuItem>
        <MenuItem
          active={activePage === "/planner"}
          onClick={() => handleNavigation("/planner")}
        >
          플래너
        </MenuItem>
        <MenuItem
          active={activePage === "/pomodoro"}
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
