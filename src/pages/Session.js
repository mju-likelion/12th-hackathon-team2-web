import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Pagination from "../components/Pagination";
import { useRooms } from "../components/RoomsContext";
import RoomsList from "../components/RoomsList";
import SmallButton from "../components/SmallButton";
import GlobalStyle from "../styles/GlobalStyle";
import { Theme } from "../styles/Theme";

const SessionPage = () => {
    const { rooms } = useRooms();
    const [currentPage, setCurrentPage] = useState(1);
    const roomsPerPage = 8;
    const navigate = useNavigate();

    const handleAddRoom = () => {
        const newRoomId = rooms.length + 1;
        navigate(`/room/${newRoomId}`);
    };

    const handleRoomClick = (id) => {
        navigate(`/room/${id}`);
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > Math.ceil(rooms.length / roomsPerPage)) return;
        setCurrentPage(pageNumber);
    };

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

    const totalPages = Math.ceil(rooms.length / roomsPerPage);

    return (
        <ThemeProvider theme={Theme}>
            <GlobalStyle />
            <Container>
                <Header>
                    <SubTitle>실시간 집중 세션</SubTitle>
                    <ButtonWrapper>
                        <SmallButton onClick={handleAddRoom}>+ 방만들기</SmallButton>
                    </ButtonWrapper>
                </Header>
                <RoomsList rooms={currentRooms} onRoomClick={handleRoomClick} />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </Container>
        </ThemeProvider>
    );
};

export default SessionPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    margin-top: 50px;
`;

const SubTitle = styled.h2`
    ${({ theme }) => theme.fonts.subTitle};
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    width: auto;
`;
