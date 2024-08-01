import React, { useState } from 'react';
import styled from 'styled-components';
import AlertModal from '../../components/AlertModal';
import { schemaPlanner } from '../../hooks/ValidationYup';
import CheckButtonOff from '../../img/CheckButtonOff.png';
import CheckButtonOn from '../../img/CheckButtonOn.png';
import DeleteIcon from '../../img/deleteIcon.png';

const ToDoItem = ({
  item,
  onCheck,
  onUpdate,
  onDelete,
  editable,
  showDeleteIcon,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState(item.content);
  const [error, setError] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleContainerClick = () => {
    if (editable) {
      setEditMode(true);
      if (text === '할 일을 입력하세요') {
        setText('');
      }
    }
  };

  const handleTextChange = (e) => {
    const value = e.target.value;
    if (value.length <= 29) {
      setText(value);
      setError('');
    } else {
      setError('할 일은 최대 29자까지 입력할 수 있습니다.');
    }
  };

  const handleBlur = async () => {
    if (text.trim() === '') {
      setError('할 일 입력은 필수입니다.');
      return;
    }

    try {
      await schemaPlanner.validate({ text });
      setError('');
      if (text === '') {
        setText('할 일을 입력하세요');
      }
      setEditMode(false);
      onUpdate(item.plannerId, text);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  const handleCheckClick = () => {
    if (text === '할 일을 입력하세요' || text.trim() === '') {
      setIsAlertOpen(true);
      return;
    }
    onCheck(item.plannerId);
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  return (
    <Item onClick={handleContainerClick}>
      <CheckButton
        src={item.completed ? CheckButtonOn : CheckButtonOff}
        alt='Check Button'
        onClick={(e) => {
          e.stopPropagation();
          !item.completed && handleCheckClick();
        }}
        completed={item.completed.toString()}
      />
      <Content>
        {editMode ? (
          <EditTextarea
            value={text}
            placeholder='할 일을 입력하세요'
            onChange={handleTextChange}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            autoFocus
            rows={1}
          />
        ) : (
          <Text>{text}</Text>
        )}
      </Content>
      {showDeleteIcon && (
        <DeleteButton
          src={DeleteIcon}
          alt='Delete Button'
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.plannerId);
          }}
        />
      )}
      {error && <Error>{error}</Error>}
      <AlertModal
        isOpen={isAlertOpen}
        close={closeAlert}
        message='할 일을 입력해야 Complete 할 수 있습니다!'
        handleConfirm={closeAlert}
      />
    </Item>
  );
};

export default ToDoItem;

const Item = styled.div`
  width: 100%;
  max-width: 887px;
  min-height: 41px;
  display: flex;
  align-items: center;
  margin: 20px auto;
  padding: 10px;
  border-bottom: 3px solid ${({ theme }) => theme.colors.pink3};
  position: relative;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 90%;
    margin: 10px auto;
    padding: 8px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin: 8px auto;
    padding: 6px;
  }
`;

const CheckButton = styled.img`
  width: 20px;
  height: 20px;
  opacity: ${({ completed }) => (completed === 'true' ? 0.5 : 1)};
  margin-right: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 18px;
    height: 18px;
    margin-right: 8px;
  }
`;

const Content = styled.div`
  width: 100%;
`;

const Text = styled.span`
  ${({ theme }) => theme.fonts.default};
  color: ${({ theme }) => theme.colors.black};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 14px;
  }
`;

const EditTextarea = styled.textarea`
  ${({ theme }) => theme.fonts.default};
  border: none;
  outline: none;
  width: 100%;
  resize: none;
  overflow: hidden;
  line-height: 1.5;
  padding: 0;
  margin: 0;
  background: none;

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 14px;
  }
`;

const DeleteButton = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 10px;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 18px;
    height: 18px;
    margin-left: 8px;
  }
`;

const Error = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
  position: absolute;
  bottom: -20px;
  left: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    bottom: -25px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 10px;
    bottom: -20px;
  }
`;
