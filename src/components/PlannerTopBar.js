import React from 'react';
import styled from 'styled-components';
import PlannerIcon from '../img/PlannerIcon.svg';

const PlannerTopBar = ({ toDoCount }) => (
    <TopBarContainer>
        <PlannerIconImg src={PlannerIcon} alt="Planner Icon" />
        <Counter>Today&apos;s To-Do: {toDoCount}</Counter>
    </TopBarContainer>
);

export default PlannerTopBar;

const TopBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 959px;
    margin-left: 40px;
    padding: 0 20px;

    @media (max-width: 768px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 0;
        padding: 0 20px;
    }
`;

const PlannerIconImg = styled.img`
    width: 125.13px;
    height: 54.85px;

    @media (max-width: 768px) {
        width: 100px;
        height: auto;
    }
`;

const Counter = styled.div`
    ${({ theme }) => theme.fonts.inputLabel};
    color: ${({ theme }) => theme.colors.pink3};
    margin-top: 10px;

    @media (max-width: 768px) {
        margin-bottom: 10px;
        width: 200px;
        text-align: center;
    }
`;

