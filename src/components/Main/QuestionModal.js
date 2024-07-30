import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import diary from '../../img/diary.png';
import session from '../../img/session.png';
import planner from '../../img/planner.png';
import pomodoro from '../../img/pomodoro.png';

const QuestionModal = ({ isOpen, onRequestClose }) => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  const pages = [
    {
      title: '앱 소개',
      content: (
        <>
          <ModalText>
            이 앱은 여러분의 감정을 기록하고, 집중 세션을 통해 목표를 달성하는데
            도움을 주기 위해 만들어졌습니다.
          </ModalText>
        </>
      ),
    },
    {
      title: '감정일기',
      content: (
        <>
          <Image src={diary} />
          <ModalText>
            부정적인 생각, 감정과 충동을 관리하기 위한 일일 감정 기록 기능
          </ModalText>
        </>
      ),
    },
    {
      title: '집중 세션',
      content: (
        <>
          <Image src={session} />
          <ModalText>
            특정 시간에 사용자들이 함께 집중 세션에 참여하여 실시간으로 진행
            상황을 공유하고 서로 응원할 수 있는 기능
          </ModalText>
        </>
      ),
    },
    {
      title: '플래너',
      content: (
        <>
          <Image src={planner} />
          <ModalText>
            <li>To-Do: 하루에 달성할 작은 목표를 설정</li>
            <li>Completed: 날짜별 완료된 계획 확인</li>
            <li>Calender: 월별 달성치 확인 가능</li>
          </ModalText>
        </>
      ),
    },
    {
      title: '뽀모도로',
      content: (
        <>
          <Image src={pomodoro} />
          <ModalText>
            <li>
              25분간 집중해서 일을 한 다음 5분간 휴식하는 시간방법론 뽀모도로
              타이머 기능
            </li>
            <li>사용자가 직접 주기 설정 가능</li>
          </ModalText>
        </>
      ),
    },
  ];

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % pages.length);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + pages.length) % pages.length);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel='앱 소개'
    >
      <ModalContent>
        <ModalHeader>{pages[currentPage].title}</ModalHeader>
        {pages[currentPage].content}
        <ButtonContainer>
          {currentPage > 0 && <NavButton onClick={handlePrev}>이전</NavButton>}
          <NavButton onClick={handleNext} style={{ marginLeft: 'auto' }}>
            {currentPage < pages.length - 1 ? '다음' : '처음'}
          </NavButton>
        </ButtonContainer>
        <CloseButton onClick={onRequestClose}>닫기</CloseButton>
      </ModalContent>
    </Modal>
  );
};

export default QuestionModal;

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '500px',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
  },
};

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalHeader = styled.h2`
  ${(props) => props.theme.fonts.menuItem};
  color: ${(props) => props.theme.colors.pink3};
  margin-bottom: 20px;
`;

const ModalText = styled.p`
  ${(props) => props.theme.fonts.body};
  color: ${(props) => props.theme.colors.black};
  margin-bottom: 20px;
  text-align: center;
  line-height: 1.5em;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const NavButton = styled.button`
  ${(props) => props.theme.fonts.button};
  background-color: ${(props) => props.theme.colors.pink3};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.pink2};
  }
`;

const CloseButton = styled.button`
  ${(props) => props.theme.fonts.button};
  background-color: ${(props) => props.theme.colors.pink3};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: ${(props) => props.theme.colors.pink2};
  }
`;
