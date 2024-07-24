import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Pagination from '../components/Pagination';
import { RoomsProvider, useRooms } from '../components/Session/RoomsContext';
import RoomsList from '../components/Session/RoomsList';
import SmallButton from '../components/SmallButton';

const SessionPageContent = () => {
  const { rooms, totalPages, currentPage, setCurrentPage } = useRooms();
  const roomsPerPage = 8;
  const navigate = useNavigate();

  const handleAddRoom = () => {
    navigate(`/rooms/new`);
  };

  const handleRoomClick = (id) => {
    navigate(`/rooms/${id}`);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

  return (
    <Div>
      <Header />
      <Container>
        <Title>
          <SubTitle>실시간 집중 세션</SubTitle>
          <ButtonWrapper>
            <SmallButton onClick={handleAddRoom}>+ 방만들기</SmallButton>
          </ButtonWrapper>
        </Title>
        <RoomsList rooms={currentRooms} onRoomClick={handleRoomClick} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Container>
    </Div>
  );
};

const SessionPage = () => (
  <RoomsProvider>
    <SessionPageContent />
  </RoomsProvider>
);

export default SessionPage;

const Div = styled.div`
  width: 100%;
  padding: 20px;
`;
const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 52px;
`;

const SubTitle = styled.h2`
  ${({ theme }) => theme.fonts.subTitle};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: auto;
`;
