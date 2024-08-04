import React from 'react';
import styled from 'styled-components';
import RoomOn from '../../img/RoomOn.svg';

const RoomItem = ({ room, onClick }) => {
  const roomIcon = room.imageLink || RoomOn;

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

export default RoomItem;

const Room = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  height: 140px;
  border: 2px solid ${({ theme }) => theme.colors.pink3};
  border-radius: 12px;
  padding: 10px;
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 120px;
    padding: 8px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 100px;
    padding: 6px;
  }
`;

const RoomContent = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  margin-left: 14px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: 12px;
    margin-left: 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 8px;
    margin-left: 12px;
  }
`;

const RoomIcon = styled.img`
  width: 40px;
  height: 40px;
  border: 2px solid ${({ theme }) => theme.colors.pink2};
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 40px;
    height: 40px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 35px;
    height: 35px;
  }
`;

const RoomName = styled.span`
  border: 2px solid ${({ theme }) => theme.colors.pink2};
  border-radius: 10px;
  ${({ theme }) => theme.fonts.semiText};
  margin-left: 20px;
  background-color: ${({ theme }) => theme.colors.pink1};
  border-radius: 5px;
  width: 28vw;
  min-width: 230px;
  margin-right: 20px;
  padding: 4px 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-left: 16px;
    margin-right: 16px;
    width: 35vw;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-left: 12px;
    margin-right: 12px;
    width: 45vw;
  }
`;

const RoomButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: 6px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 4px;
  }
`;

const RoomButton = styled.button`
  background-color: ${({ theme }) => theme.colors.pink3};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 13px;
  margin-top: 8px;
  margin-right: 20px;
  border: 2px solid ${({ theme }) => theme.colors.pink2};
  transition:
    background-color 0.3s,
    transform 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.pink2};
    transform: translateY(-2px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 6px 14px;
    font-size: 12px;
    margin-top: 6px;
    margin-right: 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 4px 12px;
    font-size: 11px;
    margin-top: 4px;
    margin-right: 12px;
  }
`;
