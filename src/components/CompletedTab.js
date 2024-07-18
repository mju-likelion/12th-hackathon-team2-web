import React from 'react';
import styled from 'styled-components';
import ToDoItem from './ToDoItem';

const CompletedTab = ({ completedList }) => {
    const groupedItems = completedList.reduce((acc, item) => {
        const date = item.completedDate || 'Unknown Date';
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
                        <ToDoItem key={item.id} item={item} />
                    ))}
                </DateGroup>
            ))}
        </ListContainer>
    );
};

export default CompletedTab;

const ListContainer = styled.div`
    width: 100%;
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


color: #B1B1B1;


`;
