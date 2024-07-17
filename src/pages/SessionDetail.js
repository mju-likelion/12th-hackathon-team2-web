import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import SessionDetailForm from "../components/SessionDetailForm";
import TinyButton from "../components/TinyButton";
import GlobalStyle from "../styles/GlobalStyle";
import { Theme } from "../styles/Theme";

const SessionDetail = ({ rooms, setRooms }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const roomId = parseInt(id);

    const handleDelete = () => {
        const updatedRooms = rooms.filter(room => room.id !== roomId);
        setRooms(updatedRooms);
        navigate("/session");
    };

    const handleBackToList = () => {
        navigate("/session");
    };

    return (
        <ThemeProvider theme={Theme}>
            <GlobalStyle />
            <Container>
                <Header>실시간 집중 세션</Header>
                <SessionDetailForm>
                    <ButtonContainer>
                        <TinyButton onClick={handleDelete}>삭제하기</TinyButton>
                        <TinyButton onClick={handleBackToList}>목록으로</TinyButton>
                    </ButtonContainer>
                </SessionDetailForm>
            </Container>
        </ThemeProvider>
    );
};

export default SessionDetail;

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
