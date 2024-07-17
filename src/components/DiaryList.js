import React from 'react';
import styled from 'styled-components';
import DiaryItem from './DiaryItem';

const DiaryList = ({ entries, onEntryClick }) => (
    <ListContainer>
        {entries.map((entry, index) => (
            <DiaryItem
                key={index}
                title={entry.title}
                date={entry.date}
                onClick={() => onEntryClick(index)}
            />
        ))}
    </ListContainer>
);

export default DiaryList;

const ListContainer = styled.div`
    margin-top: 60px;
    margin-left: 136px;
    margin-right: 81px;
    display: flex;
    flex-direction: column;
`;
