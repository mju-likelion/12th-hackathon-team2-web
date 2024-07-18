import React from 'react';
import styled from 'styled-components';
import PlannerIcon from '../img/PlannerIcon.svg';

const PlannerTopBar = ({ toDoCount }) => (
    <TopBarContainer>
        <PlannerIconImg src={PlannerIcon} alt="Planner Icon" />
        <Counter>Today's To-Do: {toDoCount}</Counter>
    </TopBarContainer>
);

export default PlannerTopBar;

const TopBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 859px;
    margin-left: 40px;
`;

const PlannerIconImg = styled.img`
    width: 125.13px;
    height: 54.85px;
`;

const Counter = styled.div`
    ${({ theme }) => theme.fonts.inputLabel};
    color: ${({ theme }) => theme.colors.pink3};
    margin-top: 10px;
`;
