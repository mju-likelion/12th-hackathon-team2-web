import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import SessionDetailForm from "../components/SessionDetailForm";
import TinyButton from "../components/TinyButton";
import GlobalStyle from "../styles/GlobalStyle";
import { Theme } from "../styles/Theme";

const CreateRoom = ({ rooms, setRooms }) => {
    const navigate = useNavigate();

    const handleCreate = () => {
        const newRoomId = rooms.length + 1;
        const newRoom = { id: newRoomId, active: false };
        setRooms([...rooms, newRoom]);
        navigate(`/room/${newRoomId}`);
    };

    const handleBackToList = () => {
        navigate("/session");
    };

    return (
        <ThemeProvider theme={Theme}>
            <GlobalStyle />
            <Container>
                <Header>방 만들기</Header>
                <SessionDetailForm>
                    <ButtonContainer>
                        <TinyButton onClick={handleCreate}>생성하기</TinyButton>
                        <TinyButton onClick={handleBackToList}>목록으로</TinyButton>
                    </ButtonContainer>
                </SessionDetailForm>
            </Container>
        </ThemeProvider>
    );
};

export default CreateRoom;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const Header = styled.h1`
    margin-top: 87px;
    ${Theme.fonts.subTitle};
    color: ${Theme.colors.black};
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 997px;
    gap: 10px;
`;
