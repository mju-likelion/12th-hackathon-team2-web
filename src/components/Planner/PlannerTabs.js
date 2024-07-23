import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PlannerTabs = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'to-do') {
      navigate('/planners');
    } else if (tab === 'completed') {
      navigate('/planners/completed');
    }
  };

  return (
    <TabsContainer>
      <TabItem
        $isActive={activeTab === 'to-do'}
        onClick={() => handleTabClick('to-do')}
      >
        <TabText $isActive={activeTab === 'to-do'}>To-Do</TabText>
      </TabItem>
      <TabItem
        $isActive={activeTab === 'completed'}
        onClick={() => handleTabClick('completed')}
      >
        <TabText $isActive={activeTab === 'completed'}>Completed</TabText>
      </TabItem>
    </TabsContainer>
  );
};

export default PlannerTabs;

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 26px;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: center;
    margin-top: 10px;
  }
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

  @media (max-width: 768px) {
    width: 90px;
    height: 45px;
    border-radius: 14px 14px 0 0;
    margin: 0 5px;
  }
`;

const TabText = styled.div`
  ${({ theme }) => theme.fonts.tinyButton};
  transform: rotate(-90deg);
  white-space: nowrap;
  color: ${({ $isActive, theme }) => ($isActive ? theme.colors.pink3 : theme.colors.white)};

  @media (max-width: 768px) {
    transform: none;
  }
`;
