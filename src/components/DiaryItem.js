import React from 'react';
import styled from 'styled-components';

const DiaryItem = ({ title, date, onClick }) => (
    <ItemContainer onClick={onClick}>
        <DiaryTitle>{title}</DiaryTitle>
        <DiaryDate>{date}</DiaryDate>
    </ItemContainer>
);

export default DiaryItem;

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
    width: 388px;
    height: 42px;
`;

const DiaryDate = styled.div`
    ${({ theme }) => theme.fonts.PageNumber};
    color: ${({ theme }) => theme.colors.pink3};
`;
