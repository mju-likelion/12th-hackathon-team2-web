import React from 'react';
import styled from 'styled-components';
import ToDoItem from './ToDoItem';

const CompletedTab = ({ completedList, onCheck, onUpdate }) => {
  const groupedItems = completedList.reduce((acc, item) => {
    const date = item.modifiedDate || 'Unknown Date';
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  return (
    <ListContainer>
      {Object.keys(groupedItems).map((date) => (
        <DateGroup key={date}>
          <DateHeader>{date}</DateHeader>
          {groupedItems[date].map((item) => (
            <ToDoItem
              key={item.plannerId}
              item={item}
              onCheck={onCheck}
              onUpdate={onUpdate}
            />
          ))}
        </DateGroup>
      ))}
    </ListContainer>
  );
};

export default CompletedTab;

const ListContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const DateGroup = styled.div`
  margin-bottom: 20px;
`;

const DateHeader = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #b1b1b1;
`;
