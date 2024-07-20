import React from 'react';
import styled from 'styled-components';
import SmallButton from './SmallButton';

const DiaryHeader = ({ onAddEntry }) => (
  <HeaderContainer>
    <Header>감정 일기</Header>
    <ButtonWrapper>
      <SmallButton onClick={onAddEntry}>일기 작성</SmallButton>
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
`;
