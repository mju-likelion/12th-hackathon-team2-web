import React from 'react';
import styled from 'styled-components';
import CompletedTab from './CompletedTab';
import ToDoItem from './ToDoItem.js';

const PlannerListContainer = ({ activeTab, toDoList, completedList, handleCheck, handleUpdate }) => (
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
                            editable={!item.completed}
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
                        isCompletedTab={true} 
                    />
                </ItemList>
            </InnerContainer>
        )}
    </Container>
);

export default PlannerListContainer;

const Container = styled.div`
    width: 100%;
    height: 559px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const InnerContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const ItemList = styled.div`
    margin-bottom: 20px;
    overflow-y: scroll;
    height: calc(100% - 40px);
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

    @media (max-width: 859px) {
        height: calc(100% - 50px);
    }
`;
