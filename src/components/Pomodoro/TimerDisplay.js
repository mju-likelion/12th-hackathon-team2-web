import React, { useEffect, useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styled from 'styled-components';

const TimerDisplay = ({
  label,
  timeLeft,
  isBreak,
  formatTime,
  getPercentage,
}) => {
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    }
  }, [initialRender]);

  const formattedTime = initialRender
    ? '00:00'
    : timeLeft !== null && timeLeft !== undefined
      ? formatTime(timeLeft)
      : '00:00';

  return (
    <Timer>
      <StyledTitle>{label}</StyledTitle>
      <TimerSection>
        <TimerDisplayContainer>
          <CircularProgressbar
            value={getPercentage(timeLeft || 0)}
            text={formattedTime}
            styles={buildStyles({
              pathColor: isBreak ? '#E93C3C' : '#2DBA00',
              textColor: isBreak ? '#2DBA00' : '#E93C3C',
              trailColor: isBreak ? '#2DBA00' : '#E93C3C',
              backgroundColor: '#FFFFFF',
            })}
          />
        </TimerDisplayContainer>
      </TimerSection>
    </Timer>
  );
};

const Timer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.pink1};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 90%;
    padding: 10px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    padding: 5px;
  }
`;

const TimerDisplayContainer = styled.div`
  border: 6px solid ${(props) => props.theme.colors.pink3};
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 60px;
  padding: 20px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.white};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 10px;
    font-size: 50px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 5px;
    font-size: 40px;
    border: 3px solid ${(props) => props.theme.colors.pink3};
  }
`;

const TimerSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StyledTitle = styled.div`
  ${({ theme }) => theme.fonts.tinyButton};
  color: ${({ theme }) => theme.colors.white};
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.pink2};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 20px;
  width: 120px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  &:hover {
    background-color: ${({ theme }) => theme.colors.pink3};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100px;
    padding: 8px;
    font-size: 0.9rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 90px;
    padding: 6px;
    font-size: 0.8rem;
  }
`;

export default TimerDisplay;
