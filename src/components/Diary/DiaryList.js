import React from 'react';
import styled from 'styled-components';

const DiaryList = ({ entries, onEntryClick }) => (
  <ListContainer>
    {entries.map((entry) => (
      <ItemContainer key={entry.id} onClick={() => onEntryClick(entry.id)}>
        <DiaryTitle>{entry.title}</DiaryTitle>
        <DiaryDate>{entry.date}</DiaryDate>
      </ItemContainer>
    ))}
  </ListContainer>
);

export default DiaryList;

const ListContainer = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 20px;
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  margin-bottom: 26px;
  cursor: pointer;
`;

const DiaryTitle = styled.div`
  ${({ theme }) => theme.fonts.inputLabel};
  color: ${({ theme }) => theme.colors.black};
  margin-left: 20px;
  width: 100%;
  height: 42px;
`;

const DiaryDate = styled.div`
  ${({ theme }) => theme.fonts.PageNumber};
  color: ${({ theme }) => theme.colors.pink3};
`;
