import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/Header';
import Rating from '../../components/Rating';
import TinyButton from '../../components/TinyButton';
import AvocadoImage from '../../img/Avocado.svg';
import BananaImage from '../../img/Banana.svg';
import TomatoImage from '../../img/Tomato.svg';

const gradeMapping = {
  AVOCADO: {
    image: AvocadoImage,
    name: '아보카도',
    message: '성인 ADHD일 가능성이 낮지만',
  },
  TOMATO: {
    image: TomatoImage,
    name: '토마토',
    message: '성인 ADHD일 가능성이 높으며 ',
  },
  BANANA: {
    image: BananaImage,
    name: '바나나',
    message: '성인 ADHD일 가능성이 낮지만',
  },
};

const SurveyResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resultData } = location.state || {};

  if (!resultData) {
    return <div>결과 데이터를 불러오는 중입니다...</div>;
  }

  console.log('Result Data:', resultData);

  const gradeInfo = gradeMapping[resultData.data.userGrade] || {};
  const message = gradeInfo.message;

  return (
    <Div>
      <Header />
      <Container>
        <Rating circleImage={gradeInfo.image} grade={gradeInfo.name} />
        <Info>
          {message}
          <br />
          정확한 검사를 위해서는 추가적인 검사가 필요해요.
        </Info>
        <TinyButton onClick={() => navigate('/')}>확인</TinyButton>
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
  margin-bottom: 30px;
  ${(props) => props.theme.fonts.tinyButton};
  color: ${(props) => props.theme.colors.gray};
  line-height: 1.7em;
`;

export default SurveyResult;
