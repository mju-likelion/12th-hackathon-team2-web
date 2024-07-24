// TimerDisplay.jsx
import React from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styled from 'styled-components';

const TimerDisplay = ({ label, timeLeft, isBreak, formatTime, getPercentage }) => {
  return (
    <Timer>
      <StyledTitle>{label}</StyledTitle>
      <TimerSection>
        <TimerDisplayContainer>
          <CircularProgressbar
            value={getPercentage(timeLeft)}
            text={timeLeft !== null && (isBreak ? formatTime(timeLeft) : formatTime(timeLeft))}
            styles={buildStyles({
              pathColor: `#2DBA00`,
              textColor: '#E93C3C',
              trailColor: '#E93C3C',
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
  width: 45%;
`;

const TimerDisplayContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 100px;
  padding: 10px;
`;

const TimerSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
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
  height: 40px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  &:hover {
    background-color: ${({ theme }) => theme.colors.pink3};
  }
`;

export default TimerDisplay;
