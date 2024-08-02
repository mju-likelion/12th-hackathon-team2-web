import React, { useState, useEffect } from 'react';
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
  titleError,
  onImageChange,
  imageUrls,
  imageIds,
  onImageDelete,
}) => {
  const [selectedImages, setSelectedImages] = useState(imageUrls || []);
  const [selectedImageIds, setSelectedImageIds] = useState(imageIds || []);

  useEffect(() => {
    setSelectedImages(imageUrls || []);
    setSelectedImageIds(imageIds || []);
  }, [imageUrls, imageIds]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prev) => [...prev, ...newImageUrls]);
    onImageChange(files);
  };

  const handleImageDelete = (index) => {
    const newImageUrls = selectedImages.filter((_, i) => i !== index);
    const newImageIds = selectedImageIds.filter((_, i) => i !== index);
    setSelectedImages(newImageUrls);
    setSelectedImageIds(newImageIds);
    onImageDelete(selectedImageIds[index]);
  };

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
            {titleError && <ErrorMessage>{titleError}</ErrorMessage>}
          </>
        )}
      />
      {selectedImages.length > 0 && (
        <ImageWrapper>
          {selectedImages.map((url, index) => (
            <ImagePreviewContainer key={index}>
              <ImagePreview src={url} />
              <DeleteButton onClick={() => handleImageDelete(index)}>
                삭제
              </DeleteButton>
            </ImagePreviewContainer>
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
      <ButtonContainer>
        <InputWrapper>
          <input
            type='file'
            id='fileInput'
            multiple
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          <CustomFileButton
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('fileInput').click();
            }}
          >
            이미지 업로드
          </CustomFileButton>
        </InputWrapper>
        <RightBtn>
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
        </RightBtn>
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 10px;
  }
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
  flex-direction: column;
  width: 100%;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const RightBtn = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 0;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-left: 10px;
`;

const ImageWrapper = styled.div`
  margin-bottom: 12px;
  border: 3px solid ${({ theme }) => theme.colors.pink2};
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  overflow: hidden;
`;

const ImagePreviewContainer = styled.div`
  position: relative;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 5px;
  font-size: 12px;

  &:hover {
    background: darkred;
  }
`;

const InputWrapper = styled.div`
  margin-top: 10px;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 0;
  }
`;

const CustomFileButton = styled.button`
  padding: 10px 20px;
  border: 3px solid ${({ theme }) => theme.colors.pink2};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.pink2};
    color: ${({ theme }) => theme.colors.white};
  }
`;
