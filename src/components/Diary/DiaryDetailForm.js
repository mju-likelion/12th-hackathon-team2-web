import React from 'react';
import { Controller } from 'react-hook-form';
import styled from 'styled-components';
import TinyButton from '../TinyButton';

const TITLE_MAX_LENGTH = 30;

const DiaryDetailForm = ({
  control,
  handleSave,
  handleDelete,
  isNew,
  errors,
  imageUrls,
}) => {
  return (
    <Form onSubmit={handleSave}>
      <Controller
        name='title'
        control={control}
        render={({ field }) => (
          <>
            <Input placeholder='제목' {...field} maxLength={TITLE_MAX_LENGTH} />
            {errors.title && (
              <ErrorMessage>{errors.title.message}</ErrorMessage>
            )}
          </>
        )}
      />
      {imageUrls && imageUrls.length > 0 && (
        <ImageWrapper>
          {imageUrls.map((url, index) => (
            <ImagePreview key={index} src={url} />
          ))}
        </ImageWrapper>
      )}
      <Controller
        name='content'
        control={control}
        render={({ field }) => (
          <>
            <TextArea placeholder='내용' {...field} />
            {errors.content && (
              <ErrorMessage>{errors.content.message}</ErrorMessage>
            )}
          </>
        )}
      />
      <InputWrapper>
        <input type='file' />
      </InputWrapper>
      <ButtonContainer>
        {isNew ? (
          <TinyButton type='submit'>작성완료</TinyButton>
        ) : (
          <>
            <TinyButton type='submit'>수정하기</TinyButton>
            <TinyButton type='button' onClick={handleDelete}>
              삭제하기
            </TinyButton>
          </>
        )}
      </ButtonContainer>
    </Form>
  );
};

export default DiaryDetailForm;

const Form = styled.form`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1117px;
  position: relative;
`;

const Input = styled.input`
  ${({ theme }) => theme.fonts.heading};
  padding: 20px;
  margin-bottom: 12px;
  border: 3px solid ${({ theme }) => theme.colors.pink2};
  border-radius: 10px;
  outline: none;
  box-sizing: border-box;
  width: 100%;
  height: 79px;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
  }
`;

const TextArea = styled.textarea`
  ${({ theme }) => theme.fonts.heading};
  padding: 20px;
  margin-bottom: 10px;
  border: 3px solid ${({ theme }) => theme.colors.pink2};
  border-radius: 10px;
  outline: none;
  box-sizing: border-box;
  width: 100%;
  height: 437px;
  background: ${({ theme }) => theme.colors.white};
  resize: none;
  color: ${({ theme }) => theme.colors.black};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-left: 10px;
`;

const ImageWrapper = styled.div`
  margin-bottom: 12px;
  border: 3px solid ${({ theme }) => theme.colors.pink2};
  border-radius: 10px;
  height: auto;
  display: flex;
  overflow: hidden;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  height: auto;
`;

const InputWrapper = styled.div`
  margin-bottom: 15px;
`;
