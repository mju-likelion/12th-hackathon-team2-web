import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderContainer>
      <Title>MUTSIDE OUT</Title>
      <Menu>
        <MenuItem>감정일기</MenuItem>
        <MenuItem>집중세션</MenuItem>
        <MenuItem>플래너</MenuItem>
        <MenuItem>뽀모도로</MenuItem>
      </Menu>
      <LogoutButton>로그아웃</LogoutButton>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  height: 65px;
  display: flex;
  align-items: center;
  align-items: center;
  border-bottom: 2px solid ${(props) => props.theme.colors.pink3};
  padding: 10px 40px;
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
  gap: 80px;
`;

const MenuItem = styled.div`
  cursor: pointer;
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
