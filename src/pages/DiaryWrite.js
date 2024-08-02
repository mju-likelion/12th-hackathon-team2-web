import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import postDiary from '../api/Diaries/DiariesPostApi';
import DiaryDetailForm from '../components/Diary/DiaryDetailForm';
import Header from '../components/Header';
import { schemaDiaryDetail } from '../hooks/ValidationYup';

const TITLE_MAX_LENGTH = 40;

const DiaryWrite = () => {
  const navigate = useNavigate();
  const [titleError, setTitleError] = useState('');
  const [imageFiles, setImageFiles] = useState([]);

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
      await postDiary(newEntry, imageFiles);
      navigate('/diaries');
    } catch (error) {
      console.error('일기 등록 실패:', error);
      return;
    }
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

  const handleImageChange = (files) => {
    setImageFiles(files);
  };

  const formattedDate = format(new Date(), 'yyyy.MM.dd');

  return (
    <Div>
      <Header />
      <Container>
        <Title>
          <DateHeader>{formattedDate}</DateHeader>
        </Title>
        <DiaryDetailForm
          control={control}
          handleSave={handleSubmit(handleSaveEntry)}
          isNew={true}
          errors={errors}
          titleError={titleError}
          onTitleChange={handleTitleChange}
          onImageChange={handleImageChange}
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

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 90%;
    padding: 15px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 95%;
    padding: 10px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1117px;
`;

const DateHeader = styled.div`
  margin-top: 20px;
  ${({ theme }) => theme.fonts.subTitle};
  color: ${({ theme }) => theme.colors.pink3};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1em;
    margin-top: 10px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.8em;
    margin-top: 5px;
  }
`;
