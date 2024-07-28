import React from 'react';
import styled from 'styled-components';

const PlannerHeader = () => (
  <HeaderContainer>
    <Title>플래너</Title>
  </HeaderContainer>
);

export default PlannerHeader;

const HeaderContainer = styled.div`
  margin-top: 4vh;
`;

const Title = styled.h1`
  ${({ theme }) => theme.fonts.subTitle};
  display: flex;
  align-items: center;
`;
