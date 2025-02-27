import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PlannerTabs = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    if (typeof setActiveTab === 'function') {
      setActiveTab(tab);
      if (tab === 'to-do') {
        navigate('/planners');
      } else if (tab === 'completed') {
        navigate('/planners/completed');
      } else if (tab === 'calendar') {
        const currentDate = new Date();
        const month = currentDate.toISOString().split('T')[0].slice(0, 7);
        navigate(`/planners/calendar/${month}`);
      }
    } else {
      console.error('setActiveTab is not defined');
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
      <TabItem
        $isActive={activeTab === 'calendar'}
        onClick={() => handleTabClick('calendar')}
      >
        <TabText $isActive={activeTab === 'calendar'}>Calendar</TabText>
      </TabItem>
    </TabsContainer>
  );
};

export default PlannerTabs;

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 26px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    justify-content: center;
    margin-top: 10px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
  }
`;

const TabItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 130px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.white : theme.colors.pink3};
  border-radius: 14px 0 0 14px;
  cursor: pointer;
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.pink3 : theme.colors.white};
  transition:
    background-color 0.3s ease,
    transform 0.3s ease,
    box-shadow 0.3s ease;
  transform: ${({ $isActive }) => ($isActive ? 'scale(1.05)' : 'scale(1)')};

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.pink3};
    transform: scale(1.05);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);

    & > div {
      color: ${({ theme }) => theme.colors.pink3};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100px;
    height: 50px;
    border-radius: 14px 14px 0 0;
    margin: 0 5px;
    box-shadow: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 80px;
    height: 45px;
    margin: 0 5px;
    border-radius: 14px 14px 0 0;
    box-shadow: none;
  }
`;

const TabText = styled.div`
  ${({ theme }) => theme.fonts.tinyButton};
  transform: rotate(-90deg);
  white-space: nowrap;
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.pink3 : theme.colors.white};
  transition: color 0.3s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    transform: none;
    font-size: ${({ theme }) => theme.fonts.small};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    transform: none;
    font-size: ${({ theme }) => theme.fonts.helperText};
  }
`;
