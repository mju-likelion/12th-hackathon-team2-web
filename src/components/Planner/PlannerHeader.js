import React from 'react';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme';
const PlannerHeader = () => (
  <HeaderContainer>
    <Title>플래너</Title>
  </HeaderContainer>
);

export default PlannerHeader;

const HeaderContainer = styled.div`
  margin-top: 3vh;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: 2vh;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 1vh;
  }
`;

const Title = styled.h1`
  ${({ theme }) => theme.fonts.subTitle};
  display: flex;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.5em;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.2em;
    ${Theme.fonts.tinyButton};
  }
`;
