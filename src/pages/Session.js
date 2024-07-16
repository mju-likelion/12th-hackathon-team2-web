import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import SmallButton from "../components/SmallButton";
import RoomOff from "../img/RoomOff.svg";
import RoomOn from "../img/RoomOn.svg";
import GlobalStyle from "../styles/GlobalStyle";
import { Theme } from "../styles/Theme";

const SessionPage = () => {
    const initialRooms = [
        { id: 1, active: true },
        { id: 2, active: true },
        { id: 3, active: false },
        { id: 4, active: false },
        { id: 5, active: false },
        { id: 6, active: false },
        { id: 7, active: false },
        { id: 8, active: false },
    ];

    const [rooms] = useState(initialRooms);
    const navigate = useNavigate();

    const handleAddRoom = () => {
        navigate("/create-room");
    };

    const handleRoomClick = (id) => {
        navigate(`/room/${id}`);
    };

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
                <RoomContainer>
                    {rooms.map((room) => (
                        <Room key={room.id} onClick={() => handleRoomClick(room.id)}>
                            <RoomContent>
                                <RoomIcon src={room.active ? RoomOn : RoomOff} alt={`room${room.id}`} />
                                <RoomName>room{room.id}</RoomName>
                            </RoomContent>
                        </Room>
                    ))}
                </RoomContainer>
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

const RoomContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 25px;
  width: 100%;
  max-width: 1200px;
`;

const Room = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  width: 586px;
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: auto;
`;
