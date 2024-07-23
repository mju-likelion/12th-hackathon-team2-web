import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { schemaDiaryDetail } from '../hooks/ValidationYup';
import postDiary from '../api/Diaries/DiariesPostApi';
import Header from '../components/Header';
import DiaryDetailForm from '../components/Diary/DiaryDetailForm';

const TITLE_MAX_LENGTH = 40;

const DiaryWrite = () => {
  const navigate = useNavigate();
  const [titleError, setTitleError] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schemaDiaryDetail),
    mode: 'onChange',
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const handleSaveEntry = async (data) => {
    if (data.title.length > TITLE_MAX_LENGTH) {
      setTitleError(
        `타이틀은 최대 ${TITLE_MAX_LENGTH}자까지 입력할 수 있습니다.`
      );
      return;
    }
    const newEntry = { title: data.title, content: data.content };

    try {
      await postDiary(newEntry);
    } catch (error) {
      console.error('일기등록실패:', error);
      return;
    }

    navigate('/diaries');
  };

  const handleBackToList = () => {
    navigate('/diaries');
  };

  const handleTitleChange = (e) => {
    const { value } = e.target;
    if (value.length <= TITLE_MAX_LENGTH) {
      setValue('title', value);
      setTitleError('');
    } else {
      setTitleError(
        `타이틀은 최대 ${TITLE_MAX_LENGTH}자까지 입력할 수 있습니다.`
      );
    }
  };

  return (
    <Div>
      <Header />
      <Container>
        <Title>
          <TinyButton onClick={handleBackToList}>목록으로</TinyButton>
        </Title>
        <DiaryDetailForm
          control={control}
          handleSave={handleSubmit(handleSaveEntry)}
          isNew={true}
          errors={errors}
          titleError={titleError}
          onTitleChange={handleTitleChange}
        />
      </Container>
    </Div>
  );
};

export default DiaryWrite;

const Div = styled.div`
  width: 100%;
  padding: 20px;
`;

const Container = styled.div`
  width: 80%;
  margin: auto;
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

const TinyButton = styled.button``;
