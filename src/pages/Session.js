import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BigButton from '../components/BigButton';
import Header from '../components/Header';
import Pagination from '../components/Pagination';
import { RoomsProvider, useRooms } from '../components/Session/RoomsContext';
import RoomsList from '../components/Session/RoomsList';

const SessionPageContent = () => {
  const { rooms, totalPages, currentPage, setCurrentPage } = useRooms();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page'), 10);
    if (!isNaN(page) && page !== currentPage) {
      setCurrentPage(page);
    }
  }, [location.search, currentPage, setCurrentPage]);

  const handleAddRoom = () => {
    navigate(`/rooms/new`);
  };

  const handleRoomClick = (id) => {
    navigate(`/rooms/${id}`);
  };

  const handlePageChange = async (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    navigate(`/rooms?page=${pageNumber}`);
  };

  return (
    <Div>
      <Header />
      <Container>
        <Title>
          <SubTitle>실시간 집중 세션</SubTitle>
          <ButtonWrapper>
            <BigButton onClick={handleAddRoom}>+ 방만들기</BigButton>
          </ButtonWrapper>
        </Title>
        <RoomsList rooms={rooms} onRoomClick={handleRoomClick} />
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

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 90%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 95%;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 52px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 20px;
  }
`;

const SubTitle = styled.h2`
  ${({ theme }) => theme.fonts.subTitle};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 10px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 150px;

  @media (max-width: 1024px) {
    width: 130px;
  }

  @media (max-width: 768px) {
    width: 110px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100px;
    justify-content: center;
  }
`;
