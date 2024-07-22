import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import { useRooms } from '../components/Session/RoomsContext';
import TinyButton from '../components/TinyButton';
import { schemaSessionDetail } from '../hooks/ValidationYup';
import { Theme } from '../styles/Theme';

const TITLE_MAX_LENGTH = 40;
const LINK_MAX_LENGTH = 40;

const SessionDetail = () => {
  const { rooms, setRooms } = useRooms();
  const navigate = useNavigate();
  const { id } = useParams();
  const roomId = parseInt(id);

  const room = rooms.find((room) => room.id === roomId);

  const [titleError, setTitleError] = useState('');
  const [linkError, setLinkError] = useState('');

  const handleDelete = () => {
    const updatedRooms = rooms.filter((room) => room.id !== roomId);
    setRooms(updatedRooms);
    navigate('/rooms');
  };

  const handleCreateOrUpdate = (values) => {
    const { title, link, content } = values;
    const isActive =
      title.trim() !== '' && link.trim() !== '' && content.trim() !== '';

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
    navigate('/rooms');
  };

  const handleBackToList = () => {
    navigate('/rooms');
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
          initialValues={{
            title: room ? room.title : '',
            link: room ? room.link : '',
            content: room ? room.content : '',
          }}
          validationSchema={schemaSessionDetail}
          onSubmit={handleCreateOrUpdate}
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
                {room && room.active ? (
                  <TinyButton onClick={handleDelete}>삭제하기</TinyButton>
                ) : (
                  <TinyButton type='submit'>생성하기</TinyButton>
                )}
                <TinyButton onClick={handleBackToList}>목록으로</TinyButton>
              </ButtonContainer>
            </StyledForm>
          )}
        </Formik>
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
  margin-bottom: 50px;
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
