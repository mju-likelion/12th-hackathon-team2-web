import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Container from "../components/Container";
import AvocadoImage from "../img/Avocado.svg";
import GlobalStyle from "../styles/GlobalStyle";
import { Theme } from "../styles/Theme";

const Main = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <Container>
        <Logo src={AvocadoImage} alt="Avocado Logo" />
        <Header>Mutside Out</Header>
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
