import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { deleteRoom } from '../../api/Rooms/RoomsDeleteApi';
import { getRoom } from '../../api/Rooms/RoomsGetApi';
import { updateRoom } from '../../api/Rooms/RoomsPatchApi';
import AlertModal from '../../components/AlertModal';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import TinyButton from '../../components/TinyButton';
import { schemaSessionDetail } from '../../hooks/ValidationYup';
import { Theme } from '../../styles/Theme';

const TITLE_MAX_LENGTH = 40;
const LINK_MAX_LENGTH = 100;

const SessionDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const roomId = id;
  const [room, setRoom] = useState(null);
  const [titleError, setTitleError] = useState('');
  const [linkError, setLinkError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const timeoutId = setTimeout(() => {
          setLoading(false);
          setModalMessage(
            '링크를 찾을 수 없습니다. \n실시간 집중세션 페이지로 돌아갑니다.'
          );
          setIsModalOpen(true);
        }, 2000);

        const data = await getRoom(roomId);
        clearTimeout(timeoutId);
        setRoom(data.data);
        setLoading(false);
      } catch (error) {
        console.error('방 조회 실패', error);
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  const handleUpdate = async (values) => {
    const { title, link, content } = values;
    try {
      await updateRoom(roomId, { title, link, content });
      navigate('/rooms');
    } catch (error) {
      console.error('방 수정 실패', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteRoom(roomId);
      navigate('/rooms');
    } catch (error) {
      console.error('방 삭제 실패', error);
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

  const handleLinkButtonClick = (link) => {
    setLoading(true);
    window.open(link, '_blank');
    setLoading(false);
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    navigate('/rooms');
  };

  if (loading) return <Loading />;

  if (!room)
    return (
      <div>
        <Loading />
        <AlertModal
          isOpen={isModalOpen}
          close={() => setIsModalOpen(false)}
          message={modalMessage}
          handleConfirm={handleModalConfirm}
        />
      </div>
    );

  return (
    <Div>
      <Header />
      <Container>
        <Title>실시간 집중 세션</Title>
        <Formik
          initialValues={{
            title: room.title,
            link: room.link,
            content: room.content,
          }}
          validationSchema={schemaSessionDetail}
          onSubmit={handleUpdate}
        >
          {({ errors, touched, setFieldValue }) => (
            <FormWrapper>
              <StyledForm>
                <ButtonContainer>
                  <TinyButton onClick={() => handleLinkButtonClick(room.link)}>
                    링크 이동
                  </TinyButton>
                  <TinyButton onClick={() => navigate('/rooms')}>
                    목록으로
                  </TinyButton>
                </ButtonContainer>
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
                  placeholder='link'
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
                <ActionButtonContainer>
                  <TinyButton onClick={handleDelete}>삭제하기</TinyButton>
                  <TinyButton type='submit'>수정하기</TinyButton>
                </ActionButtonContainer>
              </StyledForm>
            </FormWrapper>
          )}
        </Formik>
      </Container>
      <AlertModal
        isOpen={isModalOpen}
        close={() => setIsModalOpen(false)}
        message={modalMessage}
        handleConfirm={handleModalConfirm}
      />
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
  margin-top: 3vh;
  margin-bottom: 3vh;
  ${Theme.fonts.subTitle};
  color: ${Theme.colors.black};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-bottom: 30px;
    font-size: 3rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: 20px;
    font-size: 2rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 15px;
    font-size: 1.5rem;
  }
`;

const FormWrapper = styled.div`
  width: 60vw;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 80vw;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 90vw;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  align-self: flex-end;
  margin-bottom: 20px;
`;

const ActionButtonContainer = styled.div`
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

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 8px;
    height: 60px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 6px;
    height: 50px;
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
  width: 100%;
  height: 368px;
  background: ${Theme.colors.white};
  margin-bottom: 10px;

  &::placeholder {
    color: ${Theme.colors.gray};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 8px;
    height: 300px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 6px;
    height: 250px;
  }
`;

const Error = styled.div`
  color: red;
  margin-left: 20px;
  width: 100%;
  text-align: left;
`;
