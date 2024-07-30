import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getRoom } from '../../api/Rooms/RoomsGetApi';
import RoomItem from './RoomItem';

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
  gap: 20px;
  margin-top: 20px;
  width: 100%;
  min-width: 300px;
  max-width: 1200px;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  justify-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(1, 1fr);
    gap: 12px;
  }
`;
