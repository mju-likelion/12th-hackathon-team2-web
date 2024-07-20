import React from 'react';
import styled from 'styled-components';
import CompletedTab from './CompletedTab';
import TinyButton from './TinyButton';
import ToDoItem from './ToDoItem';

const PlannerListContainer = ({ activeTab, toDoList, completedList, handleCheck, handleUpdate, handleAddItem }) => (
    <Container>
        {activeTab === 'to-do' ? (
            <InnerContainer>
                <ItemList>
                    {toDoList.map((item) => (
                        <ToDoItem 
                            key={item.id} 
                            item={item} 
                            onCheck={handleCheck} 
                            onUpdate={handleUpdate} 
                            editable={!item.completed}
                            disabled={item.completed}
                        />
                    ))}
                </ItemList>
                <AddButtonContainer>
                    <TinyButton onClick={handleAddItem}>추가하기</TinyButton>
                </AddButtonContainer>
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
    height: 100%;
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
    height: 100%;
    &::-webkit-scrollbar {
        width: 12px;
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

const AddButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;
