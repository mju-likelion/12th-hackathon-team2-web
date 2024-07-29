import React from 'react';
import styled from 'styled-components';

const Settings = ({
  workMinutes,
  setWorkMinutes,
  breakMinutes,
  setBreakMinutes,
  history,
  handleHistoryClick,
}) => {
  const handleWorkMinutesChange = (e) => {
    const value = e.target.value;
    if (value.length <= 4) {
      setWorkMinutes(value);
    }
  };

  const handleBreakMinutesChange = (e) => {
    const value = e.target.value;
    if (value.length <= 4) {
      setBreakMinutes(value);
    }
  };

  return (
    <Left>
      <SideTitle>주기설정</SideTitle>
      <SettingBox>
        <h3>집중시간</h3>
        <Input
          type='number'
          value={workMinutes}
          onChange={handleWorkMinutesChange}
          placeholder='분을 입력해주세요'
          min='1'
        />
      </SettingBox>
      <SettingBox>
        <h3>휴식시간</h3>
        <Input
          type='number'
          value={breakMinutes}
          onChange={handleBreakMinutesChange}
          placeholder='분을 입력해주세요'
          min='0'
        />
      </SettingBox>
      <SideTitle className='recent-title'>최근이용</SideTitle>
      <Report className='recent-report'>
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
  );
};

const Left = styled.div`
  width: 25vw;
  height: auto;
  background-color: ${(props) => props.theme.colors.pink1};
  padding: 20px;
  border-radius: 20px;
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    width: 95%;
    justify-content: center;
  }
`;

const SideTitle = styled.h3`
  margin-top: 20px;
  ${({ theme }) => theme.fonts.tinyButton};
  text-align: left;
  border-bottom: solid 2px ${(props) => props.theme.colors.pink3};
  padding-bottom: 7px;
  margin-bottom: 30px;
  padding-left: 5px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-left: 10px;
    margin-right: 50px;
  }

  &.recent-title {
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      display: none;
    }
  }
`;

const Report = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  height: auto;
  width: 95%;
  border-radius: 5px;
  overflow-y: auto;
  padding: 20px;

  height: 35%;

  &.recent-report {
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      display: none;
    }
  }
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

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 50%;
  }
`;

export default Settings;
