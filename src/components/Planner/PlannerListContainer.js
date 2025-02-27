import React from 'react';
import styled from 'styled-components';
import CompletedTab from './CompletedTab';
import ToDoItem from './ToDoItem.js';

const PlannerListContainer = ({
  activeTab,
  toDoList,
  completedList,
  handleCheck,
  handleUpdate,
  handleDelete,
  handleSaveItem,
}) => (
  <Container>
    {activeTab === 'to-do' ? (
      <InnerContainer>
        <ItemList>
          {toDoList.map((item) => (
            <ToDoItem
              key={item.plannerId}
              item={item}
              onCheck={handleCheck}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              editable={!item.completed}
              showDeleteIcon={true}
              handleSaveItem={handleSaveItem}
            />
          ))}
        </ItemList>
      </InnerContainer>
    ) : (
      <InnerContainer>
        <ItemList>
          <CompletedTab
            completedList={completedList}
            onCheck={handleCheck}
            onUpdate={handleUpdate}
          />
        </ItemList>
      </InnerContainer>
    )}
  </Container>
);

export default PlannerListContainer;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 12px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 8px;
  }
`;

const ItemList = styled.div`
  overflow-y: auto;
  height: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;

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

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 6px;
    gap: 12px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 4px;
    gap: 8px;
  }
`;
