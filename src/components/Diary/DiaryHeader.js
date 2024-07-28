import React from 'react';
import styled from 'styled-components';
import BigButton from '../BigButton';

const DiaryHeader = ({ onAddEntry }) => (
  <HeaderContainer>
    <Header>감정 일기</Header>
    <ButtonWrapper>
      <BigButton onClick={onAddEntry}>일기 작성</BigButton>
    </ButtonWrapper>
  </HeaderContainer>
);

export default DiaryHeader;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 52px;
`;

const Header = styled.h1`
  ${({ theme }) => theme.fonts.subTitle};
  color: ${({ theme }) => theme.colors.black};
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 150px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 150px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 130px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 110px;
  }
`;
