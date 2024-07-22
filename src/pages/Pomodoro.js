import React, { useEffect, useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styled from 'styled-components';
import Sound from '../assets/alarm.mp3';
import Header from '../components/Header';
import TinyButton from '../components/TinyButton';
import pomodoroLogo from '../img/pomodoroLogo.svg';
import { Theme } from "../styles/Theme";

const Pomodoro = () => {
  const [workMinutes, setWorkMinutes] = useState('');
  const [breakMinutes, setBreakMinutes] = useState('');
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (isRunning && timeLeft !== null) {
      const endTime = new Date().getTime() + timeLeft;

      const interval = setInterval(() => {
        const now = new Date().getTime();
        const remainingTime = endTime - now;

        if (remainingTime <= 0) {
          clearInterval(interval);
          setIsRunning(false);
          setTimeLeft(0);
          document.getElementById('notificationSound').play();
          handleCycleCompletion();
        } else {
          setTimeLeft(remainingTime);
        }
      }, 1000);

      setTimerInterval(interval);

      return () => clearInterval(interval);
    }
  }, [isRunning, timeLeft]);

  const handleCycleCompletion = () => {
    if (isBreak) {
      setCycleCount((prevCount) => prevCount + 1);
      setIsBreak(false);

      const nextCycleTime = parseInt(workMinutes) * 60 * 1000;
      setTimeLeft(nextCycleTime);
    } else {
      setIsBreak(true);

      const nextCycleTime = parseInt(breakMinutes) * 60 * 1000;
      setTimeLeft(nextCycleTime);
    }

    setIsRunning(true);
  };

  const handleStart = () => {
    const workMin = parseInt(workMinutes);
    const breakMin = parseInt(breakMinutes);

    if (isNaN(workMin) || workMin <= 0 || isNaN(breakMin) || breakMin < 0) {
      alert('작업 및 휴식 시간을 올바르게 입력해 주세요.');
      return;
    }

    setHistory((prevHistory) => [
      ...prevHistory,
      { workMinutes: workMin, breakMinutes: breakMin },
    ]);

    if (timeLeft === null) {
      setCycleCount(1);
      setIsBreak(false);
      setTimeLeft(workMin * 60 * 1000);
    }

    setIsRunning(true);
  };

  const handlePause = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(timerInterval);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(timerInterval);
    setTimeLeft(null);
    setCycleCount(0);
    setIsBreak(false);
    setWorkMinutes('');
    setBreakMinutes('');
  };

  const handleHistoryClick = (workMin, breakMin) => {
    setWorkMinutes(workMin.toString());
    setBreakMinutes(breakMin.toString());
    setTimeLeft(workMin * 60 * 1000);
    setIsBreak(false);
    setCycleCount(1);
    setIsRunning(true);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const getPercentage = (time) => {
    const total = isBreak ? parseInt(breakMinutes) * 60 * 1000 : parseInt(workMinutes) * 60 * 1000;
    return ((total - time) / total) * 100;
  };

  return (
    <Div>
      <Header />
      <Container>
        <Left>
          <SideTitle>주기설정</SideTitle>
          <SettingBox>
            <h3>집중시간</h3>
            <Input
              type='number'
              value={workMinutes}
              onChange={(e) => setWorkMinutes(e.target.value)}
              placeholder='분을 입력해주세요'
              min='1'
              max='60'
            />
          </SettingBox>
          <SettingBox>
            <h3>휴식시간</h3>
            <Input
              type='number'
              value={breakMinutes}
              onChange={(e) => setBreakMinutes(e.target.value)}
              placeholder='분을 입력해주세요'
              min='0'
              max='60'
            />
          </SettingBox>
          <SideTitle>최근이용</SideTitle>
          <Report>
            {history.map((item, index) => (
              <HistoryItem
                key={index}
                onClick={() =>
                  handleHistoryClick(item.workMinutes, item.breakMinutes)
                }
              >
                {item.workMinutes}분 / {item.breakMinutes}분
              </HistoryItem>
            ))}
          </Report>
        </Left>
        <Right>
          <Title><Logo src={pomodoroLogo} alt="Pomodoro Logo" /></Title>
          <Info>
            {isRunning && `${cycleCount}번째 타임`}{' '}
          </Info>
          <StyledTitle>{'집중시간'}</StyledTitle>
          <TimerSection>
            <TimerDisplay>
              <CircularProgressbar
                value={getPercentage(timeLeft)}
                text={timeLeft !== null && !isBreak ? formatTime(timeLeft) : '00:00'}
                styles={buildStyles({
                  pathColor: `#FFFFFF`,
                  textColor: '#E93C3C',
                  trailColor: '#E93C3C',
                  backgroundColor: '#FFFFFF',
                })}
              />
            </TimerDisplay>
          </TimerSection>
          <StyledTitle>{'휴식시간'}</StyledTitle>
          <TimerSection>
            <TimerDisplay>
              <CircularProgressbar
                value={getPercentage(timeLeft)}
                text={timeLeft !== null && isBreak ? formatTime(timeLeft) : '00:00'}
                styles={buildStyles({
                  pathColor: `#FFFFFF`,
                  textColor: '#E93C3C',
                  trailColor: '#E93C3C',
                  backgroundColor: '#FFFFFF',
                })}
              />
            </TimerDisplay>
          </TimerSection>
          <audio id='notificationSound' src={Sound}></audio>
          <ButtonGroup>
            <TinyButton onClick={handleStart} disabled={isRunning}>
              시작
            </TinyButton>
            <TinyButton onClick={handlePause} disabled={!isRunning}>
              일시정지
            </TinyButton>
            <TinyButton onClick={handleReset}>리셋</TinyButton>
          </ButtonGroup>
        </Right>
      </Container>
    </Div>
  );
};

const Div = styled.div`
  width: 100%;
  padding: 20px;
`;

const Container = styled.div`
  padding-top: 80px;
  display: flex;
`;

const Left = styled.div`
  width: 25vw;
  min-width: 170px;
  height: 80%;
  background-color: ${(props) => props.theme.colors.pink1};
  padding: 30px;
  border-radius: 30px;
  margin-left: 7vw;
`;

const SideTitle = styled.h3`
  margin-top: 20px;
  ${(props) => props.theme.fonts.PageNumber};
  border-bottom: solid 2px ${(props) => props.theme.colors.pink3};
  padding-bottom: 7px;
  margin-bottom: 30px;
`;
const Report = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  min-height: 17vw;
  max-height: 20vw;
  height: 50%;
  width: 95%;
  border-radius: 5px;
  overflow-y: scroll;
  padding: 20px;
`;
const HistoryItem = styled.div`
  ${(props) => props.theme.fonts.PageNumber};
  margin-bottom: 15px;
  cursor: pointer;

  font-weight: 400;
  font-size: 17px;
  &:hover {
    color: ${(props) => props.theme.colors.pink3};
  }
`;
const SettingBox = styled.div`
  background-color: ${(props) => props.theme.colors.pink1};
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 30px;
  h3 {
    font-weight: 400;
    font-size: 17px;
  }
`;

const Input = styled.input`
  margin-top: 10px;
  width: 90%;
  height: 20px;
  padding: 10px;
  outline: none;
  border: none;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 700px;
  margin: auto;
`;

const Title = styled.div`
  font-size: 1.5em;
  margin-bottom: 0.5em;
  ${(props) => props.theme.fonts.Context};
`;

const Info = styled.div`
  font-size: 1em;
  margin: 10px 0;
  span {
    ${(props) => props.theme.fonts.PageNumber};
    color: ${(props) => props.theme.colors.pink3};
  }
`;

const TimerDisplay = styled.div`
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

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2.7vw;
  margin-bottom: 80px;
`;

const Logo = styled.img`
  width: 309px;
  height: 61px;
`;

const StyledTitle = styled.div`
    ${Theme.fonts.tinyButton};
    color: ${Theme.colors.white};
    padding: 10px;
    background-color: ${Theme.colors.pink2};
    border: none;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 10px;
    width: 120px;
    height: 40px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

    &:hover {
        background-color: ${Theme.colors.pink3};
    }
`;

export default Pomodoro;
