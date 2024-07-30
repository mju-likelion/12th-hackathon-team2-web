import React from 'react';
import styled from 'styled-components';
import PinIcon from '../../img/PinIcon.svg';

const DiaryList = ({ entries, onEntryClick }) => (
  <ListContainer>
    {entries.map((entry, index) => (
      <PostItItem key={index} onClick={() => onEntryClick(entry.id)}>
        <PinDecoration />
        <DiaryTitle>{entry.title}</DiaryTitle>
        <DiaryDate>{entry.date}</DiaryDate>
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
  background-color: ${({ theme }) => theme.colors.pink1};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 300px;
  height: 300px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  margin: 10px;

  transition:
    transform 0.3s,
    box-shadow 0.3s;

  &:hover {
    transform: scale(1.05) rotate(2deg);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 300px;
    height: 300px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 220px;
    height: 220px;
    padding: 15px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 180px;
    height: 180px;
    padding: 10px;
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
  margin-top: 10px;
  text-align: center;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1em;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.8em;
  }
`;

const DiaryDate = styled.div`
  ${({ theme }) => theme.fonts.default};
  color: ${({ theme }) => theme.colors.pink3};
  font-size: 14px;
  transition: color 0.3s;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 12px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 10px;
  }
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

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    top: -20px;
    width: 30px;
    height: 30px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: -15px;
    width: 20px;
    height: 20px;
  }
`;
