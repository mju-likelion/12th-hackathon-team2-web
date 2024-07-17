import React from 'react';
import styled from 'styled-components';

const PlannerTabs = ({ activeTab, setActiveTab }) => (
    <TabsContainer>
        <TabItem active={activeTab === 'to-do'} onClick={() => setActiveTab('to-do')}>
            <TabText active={activeTab === 'to-do'}>To-Do</TabText>
        </TabItem>
        <TabItem active={activeTab === 'completed'} onClick={() => setActiveTab('completed')}>
            <TabText active={activeTab === 'completed'}>Completed</TabText>
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
    background: ${({ active, theme }) => (active ? theme.colors.white : theme.colors.pink3)};
    border-radius: 14px 0 0 14px;
    cursor: pointer;
    color: ${({ active, theme }) => (active ? theme.colors.pink3 : theme.colors.white)};
`;

const TabText = styled.div`
    ${({ theme }) => theme.fonts.tinyButton};
    transform: rotate(-90deg);
    white-space: nowrap;
    color: ${({ active, theme }) => (active ? theme.colors.pink3 : theme.colors.white)};
`;
