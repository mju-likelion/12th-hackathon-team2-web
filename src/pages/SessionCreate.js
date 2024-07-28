import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createRoom } from '../api/Rooms/RoomsPostApi';
import Header from '../components/Header';
import TinyButton from '../components/TinyButton';
import { schemaSessionDetail } from '../hooks/ValidationYup';
import { Theme } from '../styles/Theme';

const TITLE_MAX_LENGTH = 40;
const LINK_MAX_LENGTH = 40;

const SessionCreate = () => {
  const navigate = useNavigate();
  const [titleError, setTitleError] = useState('');
  const [linkError, setLinkError] = useState('');

  const handleCreate = async (values) => {
    const { title, link, content } = values;
    try {
      await createRoom({ title, link, content });
      navigate('/rooms');
    } catch (error) {
      console.error('방 생성 실패', error);
    }
  };

  const handleTitleChange = (e, setFieldValue) => {
    const { value } = e.target;
    if (value.length <= TITLE_MAX_LENGTH) {
      setFieldValue('title', value);
      setTitleError('');
    } else {
      setTitleError(
        `타이틀은 최대 ${TITLE_MAX_LENGTH}자까지 입력할 수 있습니다.`
      );
    }
  };

  const handleLinkChange = (e, setFieldValue) => {
    const { value } = e.target;
    if (value.length <= LINK_MAX_LENGTH) {
      setFieldValue('link', value);
      setLinkError('');
    } else {
      setLinkError(`링크는 최대 ${LINK_MAX_LENGTH}자까지 입력할 수 있습니다.`);
    }
  };

  return (
    <Div>
      <Header />
      <Container>
        <Title>실시간 집중 세션</Title>
        <Formik
          initialValues={{ title: '', link: '', content: '' }}
          validationSchema={schemaSessionDetail}
          onSubmit={handleCreate}
        >
          {({ errors, touched, setFieldValue }) => (
            <StyledForm>
              <Field
                name='title'
                placeholder='title'
                as={Input}
                maxLength={TITLE_MAX_LENGTH}
                onChange={(e) => handleTitleChange(e, setFieldValue)}
              />
              {titleError ? <Error>{titleError}</Error> : null}
              {errors.title && touched.title ? (
                <Error>{errors.title}</Error>
              ) : null}
              <Field
                name='link'
                placeholder='Link'
                as={Input}
                maxLength={LINK_MAX_LENGTH}
                onChange={(e) => handleLinkChange(e, setFieldValue)}
              />
              {linkError ? <Error>{linkError}</Error> : null}
              {errors.link && touched.link ? (
                <Error>{errors.link}</Error>
              ) : null}
              <Field name='content' placeholder='content' as={TextArea} />
              {errors.content && touched.content ? (
                <Error>{errors.content}</Error>
              ) : null}
              <ButtonContainer>
                <TinyButton type='submit'>생성하기</TinyButton>
                <TinyButton onClick={() => navigate('/rooms')}>
                  목록으로
                </TinyButton>
              </ButtonContainer>
            </StyledForm>
          )}
        </Formik>
      </Container>
    </Div>
  );
};

export default SessionCreate;

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
  margin-top: 3vh;
  margin-bottom: 3vh;
  ${Theme.fonts.subTitle};
  color: ${Theme.colors.black};
`;

const StyledForm = styled(Form)`
  width: 60vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 10px;
`;

const Input = styled.input`
  ${Theme.fonts.inputLabel};
  padding: 10px;
  margin-bottom: 12px;
  border: 3px solid ${Theme.colors.pink2};
  border-radius: 10px;
  outline: none;
  box-sizing: border-box;
  width: 100%;
  height: 72px;
  background: ${Theme.colors.white};

  &::placeholder {
    color: ${Theme.colors.gray};
  }
`;

const TextArea = styled.textarea`
  ${Theme.fonts.inputLabel};
  padding: 10px;
  border: 3px solid ${Theme.colors.pink2};
  border-radius: 10px;
  outline: none;
  height: 150px;
  resize: none;
  box-sizing: border-box;
  width: 60vw;
  height: 368px;
  background: ${Theme.colors.white};
  margin-bottom: 10px;
  &::placeholder {
    color: ${Theme.colors.gray};
  }
`;

const Error = styled.div`
  color: red;
  margin-left: 20px;
  width: 100%;
  text-align: left;
`;
