import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Theme } from '../styles/Theme';

const AlertModal = ({ isOpen, close, message, handleConfirm }) => {
  if (!isOpen) return null;

  return (
    <ThemeProvider theme={Theme}>
      <ModalBackdrop onClick={close}>
        <ModalView onClick={(e) => e.stopPropagation()}>
          <ModalMessage>
            {message.split('\n').map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </ModalMessage>
          <ModalButton onClick={handleConfirm}>확인</ModalButton>
        </ModalView>
      </ModalBackdrop>
    </ThemeProvider>
  );
};

export default AlertModal;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalView = styled.div`
  width: 500px;
  max-width: 90%;
  background: linear-gradient(135deg, ${props => props.theme.colors.white}, ${props => props.theme.colors.pink1});
  padding: 20px;
  border-radius: 15px;
  box-shadow: 4px 8px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid ${props => props.theme.colors.pink2};
`;

const ModalButton = styled.button`
  padding: 12px 24px;
  margin-top: 20px;
  border: none;
  background-color: ${props => props.theme.colors.pink3};
  color: ${props => props.theme.colors.white};
  border-radius: 8px;
  cursor: pointer;
  font: ${props => props.theme.fonts.default};
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${props => props.theme.colors.pink4};
  }
`;

const ModalMessage = styled.p`
  color: ${props => props.theme.colors.black};
  font: ${props => props.theme.fonts.default};
  text-align: center;
  margin: 0;
  padding: 0;
  line-height: 1.5;
`;
