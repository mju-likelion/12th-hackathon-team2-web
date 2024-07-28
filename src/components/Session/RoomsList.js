import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RoomItem from './RoomItem';
import { getRoom } from '../../api/Rooms/RoomsGetApi';

const RoomsList = ({ rooms, onRoomClick }) => {
  const [detailedRooms, setDetailedRooms] = useState([]);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      const detailedRoomsData = await Promise.all(
        rooms.map(async (room) => {
          const response = await getRoom(room.id);
          return { ...room, link: response.data.link };
        })
      );
      setDetailedRooms(detailedRoomsData);
    };

    fetchRoomDetails();
  }, [rooms]);

  return (
    <RoomContainer>
      {detailedRooms.map((room) => (
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
  gap: 25px;
  margin-top: 25px;
  width: 100%;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
`;
