import React from 'react';
import styled from 'styled-components';
import PinIcon from '../../img/PinIcon.svg';

const DiaryList = ({ entries, onEntryClick }) => (
  <ListContainer>
    {entries.map((entry, index) => (
      <PostItItem key={index} onClick={() => onEntryClick(entry.id)}>
        <DiaryTitle>{entry.title}</DiaryTitle>
        <DiaryDate>{entry.date}</DiaryDate>
        <PinDecoration />
      </PostItItem>
    ))}
  </ListContainer>
);

export default DiaryList;

const ListContainer = styled.div`
  margin-top: 60px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3vh;
  margin-left: 20px;
  margin-right: 20px;
`;

const PostItItem = styled.div`
  background-color: ${({ theme }) => theme.colors.yellow};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 200px;
  height: 200px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  margin: 10px;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 220px;
    height: 220px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 200px;
    height: 200px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 180px;
    height: 180px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 160px;
    height: 160px;
  }
`;

const DiaryTitle = styled.div`
  ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 10px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DiaryDate = styled.div`
  ${({ theme }) => theme.fonts.default};
  color: ${({ theme }) => theme.colors.pink3};
  font-size: 14px;
`;

const PinDecoration = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background: url(${PinIcon}) no-repeat center center;
  background-size: contain;
`;
