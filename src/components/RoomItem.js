import React from 'react';
import styled from 'styled-components';
import RoomOff from '../img/RoomOff.svg';
import RoomOn from '../img/RoomOn.svg';

const RoomItem = ({ room, onClick }) => {
  return (
    <Room onClick={onClick}>
      <RoomContent>
        <RoomIcon src={room.active ? RoomOn : RoomOff} alt={`room${room.id}`} />
        <RoomName>{room.title || `room${room.id}`}</RoomName>
      </RoomContent>
    </Room>
  );
};

export default RoomItem;

const Room = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  width: 40vw;
  height: 155px;
  border: 1px solid ${({ theme }) => theme.colors.pink3};
  border-radius: 10px;
  cursor: pointer;
`;

const RoomContent = styled.div`
  display: flex;
  align-items: center;
  margin-top: 28px;
  margin-left: 24px;
`;

const RoomIcon = styled.img`
  width: 28px;
  height: 35px;
`;

const RoomName = styled.span`
  ${({ theme }) => theme.fonts.semiText};
  margin-left: 26px;
`;
