import React, { useEffect, useState } from 'react';
import { FaClock } from 'react-icons/fa';
import styled from 'styled-components';
import Sound from '../assets/alarm.mp3';
import Header from '../components/Header';
import TinyButton from '../components/TinyButton';

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

  return (
    <Div>
      <Header />
      <Container>
        <History>
          <HistoryTitle>
            <FaClock style={{ width: '30%' }} /> <br />
            최근 이용
          </HistoryTitle>
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
        </History>
        <Right>
          <Title>뽀모도로</Title>
          <Info>
            {isRunning && `${cycleCount}번째 타임`}{' '}
            <span>{isBreak ? '<휴식 시간>' : '<집중시간>'}</span>
          </Info>

          <TimerDisplay>
            <FaClock style={{ marginRight: '10px', width: '20%' }} />
            {timeLeft !== null ? formatTime(timeLeft) : '00:00'}
          </TimerDisplay>
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
          <Settings>
            <SettingBox>
              <h3>집중시간</h3>
              <Input
                type='number'
                value={workMinutes}
                onChange={(e) => setWorkMinutes(e.target.value)}
                placeholder='분을 입력해주세요'
                min='1'
                max='60'
                disabled={isRunning}
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
                disabled={isRunning}
              />
            </SettingBox>
          </Settings>
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

const History = styled.div`
  width: 16vw;
  min-width: 170px;
  background-color: ${(props) => props.theme.colors.pink1};
  padding: 10px;
  border-radius: 30px;
  height: 550px;
  overflow-y: auto;
  margin-left: 7vw;
`;

const HistoryTitle = styled.h3`
  margin-top: 40px;
  text-align: center;
  ${(props) => props.theme.fonts.PageNumber};
  margin-bottom: 80px;
`;

const HistoryItem = styled.div`
  ${(props) => props.theme.fonts.PageNumber};
  margin-bottom: 15px;
  cursor: pointer;
  text-align: center;
  &:hover {
    color: ${(props) => props.theme.colors.pink3};
  }
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
  font-size: 100px;
  padding: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  margin-bottom: 80px;
`;

const Settings = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 30px;
  h3 {
    text-align: center;
    ${(props) => props.theme.fonts.PageNumber};
  }
`;

const SettingBox = styled.div`
  background-color: ${(props) => props.theme.colors.pink1};
  width: 27vw;
  height: 11vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
`;

const Input = styled.input`
  width: 70%;
  height: 30px;
  margin: 10px;
  padding: 10px;
  outline: none;
  border: none;
  border-radius: 5px;
`;

export default Pomodoro;
