import React from "react";
import Header from "../components/Header";
import styled from "styled-components";
import TinyButton from "../components/TinyButton";
import { useNavigate } from "react-router-dom";
import AvocadoImage from "../img/Avocado.svg";
import TomatoImage from "../img/Tomato.svg";
import BananaImage from "../img/Banana.svg";
import Rating from "../components/Rating";

const SurveyResult = () => {
  const navigate = useNavigate();

  return (
    <Div>
      <Header />
      <Container>
        <Rating circleImage={AvocadoImage} grade={"아보카도"} />
        <Info>
          정확한 ADHD 검사를 위해서는
          <br /> 추가적인 검사가 필요해요.
        </Info>
        <TinyButton onClick={() => navigate("/main")}>확인</TinyButton>
      </Container>
    </Div>
  );
};

const Div = styled.div`
  width: 100%;
  padding: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Info = styled.p`
  margin-top: 20px;
  margin-bottom: 50px;
  ${(props) => props.theme.fonts.tinyButton};
  color: ${(props) => props.theme.colors.gray};
  line-height: 1.5em;
`;

export default SurveyResult;
