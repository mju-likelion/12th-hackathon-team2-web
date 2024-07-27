import React, { useEffect, useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import styled from 'styled-components';
import Sound from '../assets/alarm.mp3';
import Header from '../components/Header';
import Settings from '../components/Pomodoro/Settings';
import TimerDisplay from '../components/Pomodoro/TimerDisplay';
import TinyButton from '../components/TinyButton';
import pomodoroLogo from '../img/pomodoroLogo.svg';

const Pomodoro = () => {
  const [workMinutes, setWorkMinutes] = useState('');
  const [breakMinutes, setBreakMinutes] = useState('');
  const [workTimeLeft, setWorkTimeLeft] = useState(null);
  const [breakTimeLeft, setBreakTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const [workTimerInterval, setWorkTimerInterval] = useState(null);
  const [breakTimerInterval, setBreakTimerInterval] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (isRunning && workTimeLeft !== null) {
      const endTime = new Date().getTime() + workTimeLeft;

      const interval = setInterval(() => {
        const now = new Date().getTime();
        const remainingTime = endTime - now;

        if (remainingTime <= 0) {
          clearInterval(interval);
          setIsRunning(false);
          setWorkTimeLeft(0);
          document.getElementById('notificationSound').play();
          handleWorkCompletion();
        } else {
          setWorkTimeLeft(remainingTime);
        }
      }, 1000);

      setWorkTimerInterval(interval);

      return () => clearInterval(interval);
    }
  }, [isRunning, workTimeLeft]);

  useEffect(() => {
    if (isRunning && breakTimeLeft !== null) {
      const endTime = new Date().getTime() + breakTimeLeft;

      const interval = setInterval(() => {
        const now = new Date().getTime();
        const remainingTime = endTime - now;

        if (remainingTime <= 0) {
          clearInterval(interval);
          setIsRunning(false);
          setBreakTimeLeft(0);
          document.getElementById('notificationSound').play();
          handleBreakCompletion();
        } else {
          setBreakTimeLeft(remainingTime);
        }
      }, 1000);

      setBreakTimerInterval(interval);

      return () => clearInterval(interval);
    }
  }, [isRunning, breakTimeLeft]);

  const handleWorkCompletion = () => {
    setIsBreak(true);

    const nextCycleTime = parseInt(breakMinutes) * 60 * 1000;
    setBreakTimeLeft(nextCycleTime);

    setIsRunning(true);
  };

  const handleBreakCompletion = () => {
    setCycleCount((prevCount) => prevCount + 1);
    setIsBreak(false);

    const nextCycleTime = parseInt(workMinutes) * 60 * 1000;
    setWorkTimeLeft(nextCycleTime);

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

    if (workTimeLeft === null && breakTimeLeft === null) {
      setCycleCount(1);
      setIsBreak(false);
      setWorkTimeLeft(workMin * 60 * 1000);
    }

    setIsRunning(true);
  };

  const handlePause = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(workTimerInterval);
      clearInterval(breakTimerInterval);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(workTimerInterval);
    clearInterval(breakTimerInterval);
    setWorkTimeLeft(null);
    setBreakTimeLeft(null);
    setCycleCount(0);
    setIsBreak(false);
    setWorkMinutes('');
    setBreakMinutes('');
  };

  const handleHistoryClick = (workMin, breakMin) => {
    setWorkMinutes(workMin.toString());
    setBreakMinutes(breakMin.toString());
    setWorkTimeLeft(workMin * 60 * 1000);
    setBreakTimeLeft(null);
    setIsBreak(false);
    setCycleCount(1);
    setIsRunning(true);
  };

  const formatTime = (time) => {
    const totalMinutes = Math.floor(time / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours > 0
      ? `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      : `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const getWorkPercentage = (time) => {
    const total = parseInt(workMinutes) * 60 * 1000;
    return ((total - time) / total) * 100;
  };

  const getBreakPercentage = (time) => {
    const total = parseInt(breakMinutes) * 60 * 1000;
    return ((total - time) / total) * 100;
  };

  return (
    <Div>
      <Header />
      <Container>
        <Settings
          workMinutes={workMinutes}
          setWorkMinutes={setWorkMinutes}
          breakMinutes={breakMinutes}
          setBreakMinutes={setBreakMinutes}
          history={history}
          handleHistoryClick={handleHistoryClick}
        />
        <Right>
          <Title>
            <Logo src={pomodoroLogo} alt='Pomodoro Logo' />
          </Title>
          <Info>{isRunning && `${cycleCount}번째 타임`} </Info>
          <TimerContainer>
            <TimerDisplay
              label={'집중시간'}
              timeLeft={workTimeLeft}
              isBreak={false}
              workMinutes={workMinutes}
              breakMinutes={breakMinutes}
              formatTime={formatTime}
              getPercentage={getWorkPercentage}
            />
            <TimerDisplay
              label={'휴식시간'}
              timeLeft={breakTimeLeft}
              isBreak={true}
              workMinutes={workMinutes}
              breakMinutes={breakMinutes}
              formatTime={formatTime}
              getPercentage={getBreakPercentage}
            />
          </TimerContainer>
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
  display: flex;
  height: 80vh;
  width: 100%;
  margin-top: 20px;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.pink1};
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 100%;
`;

const Title = styled.div`
  font-size: 1.5em;
  margin-bottom: 0.5em;
  ${(props) => props.theme.fonts.Context};
`;

const Info = styled.div`
  font-size: 1em;
  ${(props) => props.theme.fonts.defalut};
  color: ${(props) => props.theme.colors.pink5};
  span {
    ${(props) => props.theme.fonts.PageNumber};
    color: ${(props) => props.theme.colors.pink3};
  }
`;

const TimerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 80vh;
  margin: 20px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5vh;
  margin-bottom: 20px;
  max-width: 900px;
`;

const Logo = styled.img`
  width: 309px;
  height: 61px;
`;

export default Pomodoro;
