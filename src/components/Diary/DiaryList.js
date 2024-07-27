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
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    margin-left: 20px;
    margin-right: 20px;

    @media (min-width: 1200px) {
        grid-template-columns: repeat(5, 1fr);
    }

    @media (min-width: 900px) and (max-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 600px) and (max-width: 900px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 599px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

const PostItItem = styled.div`
    background-color: ${({ theme }) => theme.colors.yellow};
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    aspect-ratio: 1;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;

    max-width: 1200px;
    width: 100%;
`;

const DiaryTitle = styled.div`
    ${({ theme }) => theme.fonts.heading};
    color: ${({ theme }) => theme.colors.black};
    margin-bottom: 10px;
`;

const DiaryDate = styled.div`
    ${({ theme }) => theme.fonts.PageNumber};
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
