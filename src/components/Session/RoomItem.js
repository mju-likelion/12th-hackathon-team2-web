import React from 'react';
import styled from 'styled-components';
import RoomOn from '../../img/RoomOn.svg';
import NaverIcon from '../../img/naver.svg';
import ZoomIcon from '../../img/zoom.svg';
import MeetIcon from '../../img/googleMeet.svg';
import Teams from '../../img/teams.svg';

const RoomItem = ({ room, onClick }) => {
  const roomIcon = getIconByLink(room.link);

  const handleJoinRoom = () => {
    onClick();
  };

  return (
    <Room>
      <RoomContent>
        <RoomIcon src={roomIcon} alt={`room${room.id}`} />
        <RoomName>{room.title || `room${room.id}`}</RoomName>
      </RoomContent>
      <RoomButtonWrapper>
        <RoomButton onClick={handleJoinRoom}>방 들어가기</RoomButton>
      </RoomButtonWrapper>
    </Room>
  );
};

const getIconByLink = (link) => {
  if (!link) return RoomOn;

  if (link.includes('naver.com')) {
    return NaverIcon;
  }
  if (link.includes('zoom.us')) {
    return ZoomIcon;
  }
  if (link.includes('meet.google')) {
    return MeetIcon;
  }
  if (link.includes('microsoft-teams')) {
    return Teams;
  }

  return RoomOn;
};

export default RoomItem;

const Room = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  height: 160px;
  border: 1px solid ${({ theme }) => theme.colors.pink3};
  border-radius: 10px;
  padding: 10px;
`;

const RoomContent = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 28px;
`;

const RoomIcon = styled.img`
  width: 35px;
  height: 35px;
`;

const RoomName = styled.span`
  ${({ theme }) => theme.fonts.semiText};
  margin-left: 26px;
  background-color: ${({ theme }) => theme.colors.pink1};
  border-radius: 5px;
  width: 30vw;
  margin-right: 24px;
  padding: 4px 10px;
`;

const RoomButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 10px;
`;

const RoomButton = styled.button`
  background-color: ${({ theme }) => theme.colors.pink3};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
  margin-right: 24px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.pink2};
  }
`;
