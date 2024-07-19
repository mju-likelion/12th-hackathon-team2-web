import { yupResolver } from "@hookform/resolvers/yup";
import { format } from 'date-fns';
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useDiary } from "../components/DiaryContext";
import DiaryDetailForm from "../components/DiaryDetailForm";
import Header from "../components/Header";
import TinyButton from "../components/TinyButton";
import { schemaDiaryDetail } from '../hooks/ValidationYup';

const TITLE_MAX_LENGTH = 40;

const DiaryDetail = () => {
  const { entries, editEntry, deleteEntry } = useDiary();
  const { id } = useParams();
  const navigate = useNavigate();

  const [entry, setEntry] = useState({ title: '', content: '', date: '' });
  const [titleError, setTitleError] = useState("");

  useEffect(() => {
    const fetchedEntry = entries[parseInt(id)] || { title: '', content: '', date: '' };
    setEntry(fetchedEntry);
  }, [entries, id]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(schemaDiaryDetail),
    mode: 'onChange',
    defaultValues: {
      title: entry.title,
      content: entry.content
    }
  });

  useEffect(() => {
    setValue("title", entry.title);
    setValue("content", entry.content);
  }, [entry, setValue]);

  const handleSaveEntry = (data) => {
    if (data.title.length > TITLE_MAX_LENGTH) {
      setTitleError(`타이틀은 최대 ${TITLE_MAX_LENGTH}자까지 입력할 수 있습니다.`);
      return;
    }
    const updatedEntry = { ...entry, title: data.title, content: data.content };
    editEntry(parseInt(id), updatedEntry);
    navigate("/diaries");
  };

  const handleDeleteEntry = () => {
    deleteEntry(parseInt(id));
    navigate("/diaries");
  };

  const handleBackToList = () => {
    navigate("/diaries");
  };

  const handleTitleChange = (e) => {
    const { value } = e.target;
    if (value.length <= TITLE_MAX_LENGTH) {
      setValue('title', value);
      setTitleError("");
    } else {
      setTitleError(`타이틀은 최대 ${TITLE_MAX_LENGTH}자까지 입력할 수 있습니다.`);
    }
  };

  const formattedDate = entry.date ? format(new Date(entry.date), 'yyyy.MM.dd') : '';

  return (
    <Div>
      <Header />
      <Container>
        <Title>
          <DateHeader>{formattedDate}</DateHeader>
          <TinyButton onClick={handleBackToList}>목록으로</TinyButton>
        </Title>
        <DiaryDetailForm
          control={control}
          handleSave={handleSubmit(handleSaveEntry)}
          handleDelete={handleDeleteEntry}
          isNew={entry.title === "" && entry.content === ""}
          errors={errors}
          titleError={titleError}
          onTitleChange={handleTitleChange}
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
