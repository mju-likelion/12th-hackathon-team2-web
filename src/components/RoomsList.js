import React from 'react';
import styled from 'styled-components';
import RoomItem from './RoomItem';

const RoomsList = ({ rooms, onRoomClick }) => {
  return (
    <RoomContainer>
      {rooms.map((room) => (
        <RoomItem
          key={room.id}
          room={room}
          onClick={() => onRoomClick(room.id)}
        />
      ))}
    </RoomContainer>
  );
};

export default RoomsList;

const RoomContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 25px;
  width: 80%;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
`;
