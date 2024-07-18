import React from 'react';
import styled from 'styled-components';

const PlannerTabs = ({ activeTab, setActiveTab }) => (
    <TabsContainer>
        <TabItem
            $isActive={activeTab === 'to-do'}
            onClick={() => setActiveTab('to-do')}
        >
            <TabText $isActive={activeTab === 'to-do'}>To-Do</TabText>
        </TabItem>
        <TabItem
            $isActive={activeTab === 'completed'}
            onClick={() => setActiveTab('completed')}
        >
            <TabText $isActive={activeTab === 'completed'}>Completed</TabText>
        </TabItem>
    </TabsContainer>
);

export default PlannerTabs;

const TabsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 26px;
`;

const TabItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 139px;
    background: ${({ $isActive, theme }) => ($isActive ? theme.colors.white : theme.colors.pink3)};
    border-radius: 14px 0 0 14px;
    cursor: pointer;
    color: ${({ $isActive, theme }) => ($isActive ? theme.colors.pink3 : theme.colors.white)};
`;

const TabText = styled.div`
    ${({ theme }) => theme.fonts.tinyButton};
    transform: rotate(-90deg);
    white-space: nowrap;
    color: ${({ $isActive, theme }) => ($isActive ? theme.colors.pink3 : theme.colors.white)};
`;
