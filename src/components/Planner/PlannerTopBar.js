import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const PlannerTopBar = ({ toDoCount, totalDone }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return date.toLocaleDateString('ko-KR', options);
  };

  return (
    <TopBarContainer>
      <CurrentTime>{formatDate(currentTime)}</CurrentTime>
      <Counter>
        {toDoCount !== undefined && <div>Today To-Do: {toDoCount}</div>}
        {totalDone !== undefined && <div>Total Done: {totalDone}</div>}
      </Counter>
    </TopBarContainer>
  );
};

export default PlannerTopBar;

const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    padding: 0 20px;
  }
`;

const CurrentTime = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  flex: 1;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.gray};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1em;
    text-align: center;
    margin-bottom: 10px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.6em;
  }
`;

const Counter = styled.div`
  margin-bottom: 20px;
  font-size: 1.2em;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.pink5};
  text-align: right;
  flex: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1em;
    margin-bottom: 10px;
    width: 100%;
    text-align: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.8em;
  }
`;
