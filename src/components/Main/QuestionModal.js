import React, { useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme';

const QuestionModal = ({ isOpen, onRequestClose }) => {
  useEffect(() => {
    Modal.setAppElement('#root'); // 여기에서 최상위 DOM 요소를 설정합니다.
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel='앱 소개'
    >
      <ModalContent>
        <ModalHeader>앱 소개</ModalHeader>
        <ModalText>
          이 앱은 여러분의 감정을 기록하고, 집중 세션을 통해 목표를 달성하는데
          도움을 주기 위해 만들어졌습니다.
        </ModalText>
        <ModalList>
          <ModalListItem color={Theme.colors.pink1}>
            <strong>감정일기:</strong> 부정적인 생각, 감정과 충동을 관리하기
            위한 일일 감정 기록 기능
          </ModalListItem>
          <ModalListItem color={Theme.colors.pink2}>
            <strong>집중 세션:</strong> 특정 시간에 사용자들이 함께 집중 세션에
            참여하여 실시간으로 진행 상황을 공유하고 서로 응원할 수 있는 기능
          </ModalListItem>
          <ModalListItem color={Theme.colors.pink3}>
            <strong>플래너:</strong> 사용자가 하루에 달성할 작은 목표를 설정하고
            진행 상황을 추적
          </ModalListItem>
          <ModalListItem color={Theme.colors.pink4}>
            <strong>뽀모도로:</strong> 25분간 집중해서 일을 한 다음 5분간
            휴식하는 뽀모도로 타이머 제공
          </ModalListItem>
        </ModalList>
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
  ${(props) => props.theme.fonts.default};
  color: ${(props) => props.theme.colors.pink3};
  margin-bottom: 20px;
`;

const ModalText = styled.p`
  ${(props) => props.theme.fonts.body};
  color: ${(props) => props.theme.colors.black};
  margin-bottom: 20px;
  text-align: center;
`;

const ModalList = styled.ol`
  ${(props) => props.theme.fonts.body};
  color: ${(props) => props.theme.colors.black};
  margin-bottom: 20px;
  text-align: left;
`;

const ModalListItem = styled.li.attrs((props) => ({
  style: { backgroundColor: props.color },
}))`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
`;

const CloseButton = styled.button`
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
