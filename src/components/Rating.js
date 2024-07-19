import React from "react";
import styled from "styled-components";
import AvocadoImage from "../img/Avocado.svg";
import TomatoImage from "../img/Tomato.svg";
import BananaImage from "../img/Banana.svg";

const Rating = ({ circleImage, grade }) => {
  return (
    <>
      <Images>
        <Image src={AvocadoImage} />
        <Image src={TomatoImage} />
        <Circle>
          <CImage src={circleImage} />
        </Circle>
        <Image src={BananaImage} />
        <Image src={TomatoImage} />
      </Images>
      <RatingText>
        <span>{grade}</span> 등급이에요!
      </RatingText>
    </>
  );
};

const Images = styled.div`
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const Image = styled.img`
  width: 100px;
  height: auto;
  margin: 0 60px;
  opacity: 30%;
`;

const Circle = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.pink1};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 30px;
`;

const CImage = styled.img`
  width: 70%;
`;

const RatingText = styled.h2`
  margin-top: 40px;
  ${(props) => props.theme.fonts.Context};
  font-weight: 400;
  span {
    ${(props) => props.theme.fonts.Context};
    font-weight: 1000;
  }
`;

export default Rating;
