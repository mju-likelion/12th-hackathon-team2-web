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
      <SideTitle>주기 설정</SideTitle>
      <SettingBox>
        <Label>집중 시간</Label>
        <Input
          type='number'
          value={workMinutes}
          onChange={handleWorkMinutesChange}
          placeholder='분을 입력해주세요'
          min='1'
        />
      </SettingBox>
      <SettingBox>
        <Label>휴식 시간</Label>
        <Input
          type='number'
          value={breakMinutes}
          onChange={handleBreakMinutesChange}
          placeholder='분을 입력해주세요'
          min='0'
        />
      </SettingBox>
      <SideTitle className='recent-title'>최근 이용</SideTitle>
      <Report className='recent-report'>
        {history.map((item, index) => (
          <HistoryItem
            key={index}
            onClick={() =>
              handleHistoryClick(item.workMinutes, item.breakMinutes)
            }
          >
            <Time>{item.workMinutes}분</Time> /{' '}
            <Time>{item.breakMinutes}분</Time>
          </HistoryItem>
        ))}
      </Report>
    </Left>
  );
};

const Left = styled.div`
  width: 25vw;
  background-color: ${(props) => props.theme.colors.pink1};
  padding: 20px;
  border-radius: 20px;
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 95%;
    margin: 10px auto;
    padding: 15px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    padding: 10px;
    margin: 5px;
  }
`;

const SideTitle = styled.h3`
  ${({ theme }) => theme.fonts.tinyButton};
  text-align: left;
  border-bottom: solid 2px ${(props) => props.theme.colors.pink3};
  padding-left: 5px;
  margin-top: 20px;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-left: 10px;
    margin-right: 10px;
  }

  &.recent-title {
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      display: none;
    }
  }
`;

const Report = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  overflow-y: auto;
  padding: 20px;
  height: 350px;
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 2px solid ${(props) => props.theme.colors.pink2};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 15px;
    height: 250px;
  }

  &.recent-report {
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      display: none;
    }
  }
`;

const HistoryItem = styled.div`
  ${({ theme }) => theme.fonts.PageNumber};
  margin-bottom: 15px;
  cursor: pointer;
  font-weight: 400;
  font-size: 17px;
  padding: 10px;
  border-radius: 5px;

  &:hover {
    background-color: ${(props) => props.theme.colors.pink1};
    color: ${(props) => props.theme.colors.white};
  }
`;

const Time = styled.span`
  font-weight: bold;
  color: ${(props) => props.theme.colors.pink4};
`;

const SettingBox = styled.div`
  background-color: ${(props) => props.theme.colors.pink1};
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 30px;
  padding: 15px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 10px;
  }
`;

const Input = styled.input`
  margin-top: 10px;
  width: 95%;
  height: 15px;
  padding: 10px;
  outline: none;
  border: 2px solid ${(props) => props.theme.colors.pink3};
  border-radius: 5px;

  transition: border-color 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:focus {
    border-color: ${(props) => props.theme.colors.pink3};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 95%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 90%;
    padding: 5px;
  }
`;

const Label = styled.h3`
  margin: 0;
  color: ${(props) => props.theme.colors.pink4};
  font-weight: bold;
  font-size: 16px;
`;

export default Settings;
