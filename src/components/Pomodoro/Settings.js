// Settings.jsx
import React from 'react';
import styled from 'styled-components';

const Settings = ({ workMinutes, setWorkMinutes, breakMinutes, setBreakMinutes, history, handleHistoryClick }) => {
  return (
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
            onClick={() => handleHistoryClick(item.workMinutes, item.breakMinutes)}
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

export default Settings;
