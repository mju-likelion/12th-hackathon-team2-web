import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useRooms } from "../components/RoomsContext";
import SessionDetailForm from "../components/SessionDetailForm";
import TinyButton from "../components/TinyButton";
import { Theme } from "../styles/Theme";
import Header from "../components/Header";

const SessionDetail = () => {
  const { rooms, setRooms } = useRooms();
  const navigate = useNavigate();
  const { id } = useParams();
  const roomId = parseInt(id);

  const room = rooms.find((room) => room.id === roomId);

  const [title, setTitle] = useState(room ? room.title : "");
  const [link, setLink] = useState(room ? room.link : "");
  const [content, setContent] = useState(room ? room.content : "");

  const handleDelete = () => {
    const updatedRooms = rooms.filter((room) => room.id !== roomId);
    setRooms(updatedRooms);
    navigate("/rooms");
  };

  const handleCreate = () => {
    const isActive =
      title.trim() !== "" && link.trim() !== "" && content.trim() !== "";

    if (!room) {
      const newRoom = { id: roomId, title, link, content, active: isActive };
      setRooms([...rooms, newRoom]);
    } else {
      const updatedRooms = rooms.map((room) => {
        if (room.id === roomId) {
          return { ...room, title, link, content, active: isActive };
        }
        return room;
      });
      setRooms(updatedRooms);
    }
    navigate("/rooms");
  };

  const handleBackToList = () => {
    navigate("/rooms");
  };

  return (
    <Div>
      <Header />
      <Container>
        <Title>실시간 집중 세션</Title>
        <SessionDetailForm
          title={title}
          setTitle={setTitle}
          link={link}
          setLink={setLink}
          content={content}
          setContent={setContent}
        >
          <ButtonContainer>
            {room && room.active ? (
              <TinyButton onClick={handleDelete}>삭제하기</TinyButton>
            ) : (
              <TinyButton onClick={handleCreate}>생성하기</TinyButton>
            )}
            <TinyButton onClick={handleBackToList}>목록으로</TinyButton>
          </ButtonContainer>
        </SessionDetailForm>
      </Container>
    </Div>
  );
};

export default SessionDetail;

const Div = styled.div`
  width: 100%;
  padding: 20px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
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
