import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useDiary } from "../components/DiaryContext";
import DiaryDetailForm from "../components/DiaryDetailForm";
import TinyButton from "../components/TinyButton";
import Header from "../components/Header";

const DiaryDetail = () => {
  const { entries, editEntry, deleteEntry } = useDiary();
  const { id } = useParams();
  const navigate = useNavigate();
  const entry = entries[parseInt(id)];

  const [title, setTitle] = useState(entry.title);
  const [content, setContent] = useState(entry.content);

  const handleSave = () => {
    const updatedEntry = { ...entry, title, content };
    editEntry(parseInt(id), updatedEntry);
    navigate("/diaries");
  };

  const handleDelete = () => {
    deleteEntry(parseInt(id));
    navigate("/diaries");
  };

  const handleBackToList = () => {
    navigate("/diaries");
  };

  return (
    <Div>
      <Header />
      <Container>
        <Title>
          <DateHeader>{entry.date}</DateHeader>
          <TinyButton onClick={handleBackToList}>목록으로</TinyButton>
        </Title>
        <DiaryDetailForm
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          handleSave={handleSave}
          handleDelete={handleDelete}
          isNew={entry.title === "" && entry.content === ""}
        />
      </Container>
    </Div>
  );
};

export default DiaryDetail;
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

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1117px;
  margin-top: 52px;
`;

const DateHeader = styled.div`
  margin-top: 20px;
  ${({ theme }) => theme.fonts.DateHeader};
  color: ${({ theme }) => theme.colors.pink3};
`;
