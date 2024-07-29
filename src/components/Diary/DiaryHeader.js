import React from 'react';
import styled from 'styled-components';
import BigButton from '../BigButton';

const DiaryHeader = ({ onAddEntry }) => (
  <HeaderContainer>
    <Title>감정 일기</Title>
    <ButtonWrapper>
      <StyledBigButton onClick={onAddEntry}>일기 작성</StyledBigButton>
    </ButtonWrapper>
  </HeaderContainer>
);

export default DiaryHeader;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  margin-top: 52px;
`;

const Title = styled.h1`
  min-width: 150px;
  ${({ theme }) => theme.fonts.subTitle};
  color: ${({ theme }) => theme.colors.black};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.5em;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1em;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 150px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 130px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-width: 110px;
  }
`;

const StyledBigButton = styled(BigButton)`
  width: 100%;
  padding: 10px;
  font-size: 1em;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 8px;
    font-size: 0.9em;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 6px;
    font-size: 0.8em;
  }
`;
