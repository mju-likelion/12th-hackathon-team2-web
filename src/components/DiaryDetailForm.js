import React from 'react';
import styled from 'styled-components';
import TinyButton from './TinyButton';

const DiaryDetailForm = ({ title, setTitle, content, setContent, handleSave, handleDelete, isNew }) => {
    return (
        <Form>
            <Input
                placeholder="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <TextArea
                placeholder="내용"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <ButtonContainer>
                {isNew ? (
                    <TinyButton onClick={handleSave}>작성완료</TinyButton>
                ) : (
                    <>
                        <TinyButton onClick={handleSave}>수정하기</TinyButton>
                        <TinyButton onClick={handleDelete}>삭제하기</TinyButton>
                    </>
                )}
            </ButtonContainer>
        </Form>
    );
};

export default DiaryDetailForm;

const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1117px;
    position: relative;
`;

const Input = styled.input`
    ${({ theme }) => theme.fonts.Context};
    padding: 20px;
    margin-bottom: 12px;
    border: 3px solid ${({ theme }) => theme.colors.pink2};
    border-radius: 10px;
    outline: none;
    box-sizing: border-box;
    width: 100%;
    height: 79px;
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.gray};

    &::placeholder {
        color: ${({ theme }) => theme.colors.gray};
    }
`;

const TextArea = styled.textarea`
    ${({ theme }) => theme.fonts.Context};
    padding: 20px;
    margin-bottom: 32px;
    border: 3px solid ${({ theme }) => theme.colors.pink2};
    border-radius: 10px;
    outline: none;
    box-sizing: border-box;
    width: 100%;
    height: 437px;
    background: ${({ theme }) => theme.colors.white};
    resize: none;
    color: ${({ theme }) => theme.colors.gray};

    &::placeholder {
        color: ${({ theme }) => theme.colors.gray};
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`;
